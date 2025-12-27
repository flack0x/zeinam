import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import TelegramHero from "@/components/telegram-hero";

export const revalidate = 60;

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  const sections = [
    {
      title: "Books",
      href: "/books",
      icon: "📚",
      description: "Explore my published works and literary contributions"
    },
    {
      title: "Conferences & Papers",
      href: "/papers",
      icon: "📄",
      description: "Academic research, publications, and conference presentations"
    },
    {
      title: "Courses I Teach",
      href: "/courses",
      icon: "🎓",
      description: "Educational offerings and teaching portfolio"
    },
    {
      title: "Home Economics & Hobbies",
      href: "/hobbies",
      icon: "🌿",
      description: "Personal interests, lifestyle, and creative pursuits"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Welcome Section */}
      <section className="text-center py-8 px-4 rounded-lg" style={{
        background: 'linear-gradient(135deg, var(--color-vintage-teal-50) 0%, var(--color-cream-100) 100%)',
        border: '2px solid var(--color-vintage-teal-200)'
      }}>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3" style={{ color: 'var(--color-vintage-teal-800)' }}>
          Welcome to Zeina's Corner
        </h1>
        <p className="text-lg md:text-xl italic font-light" style={{ color: 'var(--color-cream-700)' }}>
          Professor, Artist, Mother, Entrepreneur
        </p>
        <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: 'var(--color-vintage-teal-700)' }}>
          A cozy space where academia meets creativity, and professional pursuits blend with personal passions.
        </p>
      </section>

      {/* Four Featured Sections */}
      <section>
        <h2 className="text-3xl font-serif font-bold mb-8 text-center" style={{ color: 'var(--color-vintage-teal-800)' }}>
          Explore My World
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group p-6 rounded-lg transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: 'var(--color-cream-100)',
                border: '2px solid var(--color-vintage-teal-200)'
              }}
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{section.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:opacity-80 transition-opacity" style={{ color: 'var(--color-vintage-teal-700)' }}>
                    {section.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-cream-800)' }}>
                    {section.description}
                  </p>
                </div>
                <span className="text-xl group-hover:translate-x-1 transition-transform" style={{ color: 'var(--color-vintage-teal-500)' }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Telegram Section */}
      <TelegramHero />

      {/* Blog Section */}
      <section>
        <div className="flex items-center space-x-4 mb-8">
          <h3 className="text-2xl font-serif font-bold" style={{ color: 'var(--color-vintage-teal-800)' }}>Latest Stories</h3>
          <div className="h-px flex-grow" style={{ backgroundColor: 'var(--color-cream-300)' }}></div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="italic text-lg" style={{ color: 'var(--color-cream-600)' }}>No stories yet. Come back soon!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <article key={post.id} className="pb-12 last:border-0" style={{ borderBottom: '1px solid var(--color-cream-300)' }}>
                {post.imageUrl && (
                  <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--color-cream-200)' }}>
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <h2 className="text-3xl font-serif font-bold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:opacity-80 transition-opacity" style={{ color: 'var(--color-vintage-teal-800)' }}>
                    {post.title}
                  </Link>
                </h2>
                <div className="text-sm mb-4 uppercase tracking-wider font-semibold" style={{ color: 'var(--color-cream-600)' }}>
                  {format(post.createdAt, "MMMM d, yyyy")}
                </div>
                <p className="leading-relaxed line-clamp-3" style={{ color: 'var(--color-vintage-teal-700)' }}>
                  {post.content.replace(/<[^>]+>/g, '').substring(0, 200)}...
                </p>
                <div className="mt-4">
                  <Link href={`/blog/${post.slug}`} className="font-semibold hover:underline inline-flex items-center" style={{ color: 'var(--color-vintage-teal-600)' }}>
                    Read more <span className="ml-1">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
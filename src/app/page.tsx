import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import TelegramHero from "@/components/telegram-hero";
import { BookOpen, FileText, GraduationCap, Sprout } from "lucide-react";

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
      Icon: BookOpen,
      description: "Explore my published works and literary contributions"
    },
    {
      title: "Conferences & Papers",
      href: "/papers",
      Icon: FileText,
      description: "Academic research, publications, and conference presentations"
    },
    {
      title: "Courses I Teach",
      href: "/courses",
      Icon: GraduationCap,
      description: "Educational offerings and teaching portfolio"
    },
    {
      title: "Home Economics & Hobbies",
      href: "/hobbies",
      Icon: Sprout,
      description: "Personal interests, lifestyle, and creative pursuits"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Welcome Section */}
      <section className="relative text-center py-12 px-8 rounded-2xl overflow-hidden" style={{
        background: 'linear-gradient(135deg, var(--color-vintage-teal-100) 0%, var(--color-cream-200) 100%)',
        border: '4px double var(--color-vintage-teal-500)',
        boxShadow: '0 8px 24px rgba(95, 158, 160, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.5)'
      }}>
        {/* Ornate Corner Flourishes */}
        <div className="absolute top-2 left-2 w-12 h-12" style={{
          background: 'radial-gradient(circle at top left, var(--color-vintage-teal-400) 0%, transparent 70%)',
          borderTop: '3px solid var(--color-vintage-teal-500)',
          borderLeft: '3px solid var(--color-vintage-teal-500)',
          borderRadius: '2px 0 0 0'
        }}></div>
        <div className="absolute top-2 right-2 w-12 h-12" style={{
          background: 'radial-gradient(circle at top right, var(--color-vintage-teal-400) 0%, transparent 70%)',
          borderTop: '3px solid var(--color-vintage-teal-500)',
          borderRight: '3px solid var(--color-vintage-teal-500)',
          borderRadius: '0 2px 0 0'
        }}></div>
        <div className="absolute bottom-2 left-2 w-12 h-12" style={{
          background: 'radial-gradient(circle at bottom left, var(--color-vintage-teal-400) 0%, transparent 70%)',
          borderBottom: '3px solid var(--color-vintage-teal-500)',
          borderLeft: '3px solid var(--color-vintage-teal-500)',
          borderRadius: '0 0 0 2px'
        }}></div>
        <div className="absolute bottom-2 right-2 w-12 h-12" style={{
          background: 'radial-gradient(circle at bottom right, var(--color-vintage-teal-400) 0%, transparent 70%)',
          borderBottom: '3px solid var(--color-vintage-teal-500)',
          borderRight: '3px solid var(--color-vintage-teal-500)',
          borderRadius: '0 0 2px 0'
        }}></div>

        {/* Decorative Top Border */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1" style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--color-vintage-teal-600) 50%, transparent 100%)'
        }}></div>

        <div className="relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{
            color: 'var(--color-vintage-teal-700)',
            textShadow: '2px 2px 0 rgba(255, 255, 255, 0.5), -1px -1px 0 rgba(95, 158, 160, 0.1)'
          }}>
            Welcome to Zeina's Corner
          </h1>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-vintage-teal-500))' }}></div>
            <div className="w-2 h-2 rotate-45" style={{ backgroundColor: 'var(--color-vintage-teal-500)' }}></div>
            <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, var(--color-vintage-teal-500), transparent)' }}></div>
          </div>

          <p className="text-lg md:text-xl italic font-light mb-4" style={{
            color: 'var(--color-cream-800)',
            textShadow: '1px 1px 0 rgba(255, 255, 255, 0.3)'
          }}>
            Professor, Artist, Mother, Entrepreneur
          </p>
          <p className="mt-6 text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-vintage-teal-800)' }}>
            A cozy space where academia meets creativity, and professional pursuits blend with personal passions.
          </p>
        </div>
      </section>

      {/* Four Featured Sections */}
      <section>
        <div className="text-center mb-12">
          {/* Decorative Top Line */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-vintage-teal-400))' }}></div>
            <div className="flex gap-2">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-vintage-teal-400)' }}></div>
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-vintage-teal-500)' }}></div>
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-vintage-teal-400)' }}></div>
            </div>
            <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, var(--color-vintage-teal-400), transparent)' }}></div>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold inline-block px-6 py-2 relative" style={{
            color: 'var(--color-vintage-teal-700)',
            textShadow: '2px 2px 0 rgba(255, 255, 255, 0.4)'
          }}>
            <span className="relative z-10">Explore My World</span>
            {/* Decorative underline */}
            <div className="absolute bottom-0 left-0 right-0 h-1 -mb-1" style={{
              background: 'linear-gradient(90deg, transparent 0%, var(--color-vintage-teal-400) 20%, var(--color-vintage-teal-500) 50%, var(--color-vintage-teal-400) 80%, transparent 100%)'
            }}></div>
          </h2>

          {/* Decorative Bottom Line */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-vintage-teal-400))' }}></div>
            <div className="w-3 h-3 rotate-45 border-2" style={{ borderColor: 'var(--color-vintage-teal-500)' }}></div>
            <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, var(--color-vintage-teal-400), transparent)' }}></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => {
            const IconComponent = section.Icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--color-cream-50)',
                  border: '3px solid var(--color-vintage-teal-500)',
                  boxShadow: '0 4px 12px rgba(95, 158, 160, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                }}
              >
                {/* Striped Awning Effect */}
                <div
                  className="absolute top-0 left-0 right-0 h-8"
                  style={{
                    background: 'repeating-linear-gradient(90deg, var(--color-vintage-teal-500) 0px, var(--color-vintage-teal-500) 20px, var(--color-cream-50) 20px, var(--color-cream-50) 40px)',
                    borderBottom: '2px solid var(--color-vintage-teal-600)'
                  }}
                />

                {/* Ornate Corner Decorations */}
                <div className="absolute top-8 left-0 w-3 h-3 border-l-2 border-t-2" style={{ borderColor: 'var(--color-vintage-teal-400)' }}></div>
                <div className="absolute top-8 right-0 w-3 h-3 border-r-2 border-t-2" style={{ borderColor: 'var(--color-vintage-teal-400)' }}></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2" style={{ borderColor: 'var(--color-vintage-teal-400)' }}></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2" style={{ borderColor: 'var(--color-vintage-teal-400)' }}></div>

                <div className="p-6 pt-12 flex items-start space-x-4">
                  {/* Vintage Icon Circle */}
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: 'var(--color-vintage-teal-500)',
                      border: '3px solid var(--color-vintage-teal-600)',
                      boxShadow: '0 2px 8px rgba(95, 158, 160, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <IconComponent size={32} style={{ color: 'var(--color-cream-50)', strokeWidth: 2.5 }} />
                  </div>

                  <div className="flex-1">
                    <h3
                      className="text-xl font-serif font-bold mb-2 group-hover:opacity-80 transition-opacity"
                      style={{
                        color: 'var(--color-vintage-teal-700)',
                        textShadow: '1px 1px 0 rgba(255, 255, 255, 0.5)'
                      }}
                    >
                      {section.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-cream-800)' }}>
                      {section.description}
                    </p>
                  </div>

                  <span
                    className="text-2xl group-hover:translate-x-1 transition-transform flex-shrink-0"
                    style={{ color: 'var(--color-vintage-teal-500)' }}
                  >
                    →
                  </span>
                </div>

                {/* Bottom Decorative Border */}
                <div
                  className="h-2"
                  style={{
                    background: 'linear-gradient(90deg, var(--color-vintage-teal-400) 0%, var(--color-vintage-teal-500) 50%, var(--color-vintage-teal-400) 100%)'
                  }}
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Telegram Section */}
      <TelegramHero />

      {/* Blog Section */}
      <section>
        <div className="flex items-center space-x-4 mb-8">
          <h3 className="text-2xl font-serif font-bold" style={{ color: 'var(--color-vintage-teal-700)' }}>Latest Stories</h3>
          <div className="h-px flex-grow" style={{ backgroundColor: 'var(--color-vintage-teal-300)' }}></div>
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
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import InteractiveStorefront from "@/components/interactive-storefront";

export const revalidate = 30; // Revalidate every 30 seconds for faster updates

export default async function Home() {
  let posts: any[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    // Database not available, continue with empty posts
    console.log("Database connection failed, showing page without posts");
  }

  // Get latest 5 posts for sidebar
  const latestPosts = posts.slice(0, 5);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* Latest Stories Sidebar - Mobile: top, Desktop: left */}
      {latestPosts.length > 0 && (
        <aside className="w-full lg:w-80 flex-shrink-0 order-1 lg:order-1">
          <div className="sticky top-24 rounded-xl p-6 shadow-lg" style={{
            backgroundColor: 'var(--color-cream-50)',
            border: '3px solid var(--color-vintage-teal-500)',
            boxShadow: '0 4px 12px rgba(95, 158, 160, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
          }}>
            {/* Decorative top border */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-vintage-teal-400))' }}></div>
              <div className="flex gap-1.5">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-vintage-teal-500)' }}></div>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-vintage-teal-400)' }}></div>
              </div>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, var(--color-vintage-teal-400), transparent)' }}></div>
            </div>

            <h3 className="font-serif text-xl font-bold mb-6 text-center" style={{
              color: 'var(--color-vintage-teal-700)',
              textShadow: '1px 1px 0 rgba(255, 255, 255, 0.5)'
            }}>
              Latest Stories
            </h3>

            <div className="space-y-4">
              {latestPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block pb-4 transition-all duration-300"
                  style={{
                    borderBottom: index < latestPosts.length - 1 ? '1px solid var(--color-cream-300)' : 'none'
                  }}
                >
                  {post.imageUrl && (
                    <div className="relative h-32 w-full mb-3 rounded-lg overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--color-cream-200)' }}>
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <h4 className="font-serif text-sm font-bold mb-1 line-clamp-2 leading-tight group-hover:opacity-80 transition-opacity" style={{ color: 'var(--color-vintage-teal-800)' }}>
                    {post.title}
                  </h4>
                  <div className="text-xs mb-2 uppercase tracking-wider font-semibold" style={{ color: 'var(--color-cream-600)' }}>
                    {format(post.createdAt, "MMM d, yyyy")}
                  </div>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--color-vintage-teal-700)' }}>
                    {post.content.replace(/<[^>]+>/g, '').substring(0, 80)}...
                  </p>
                </Link>
              ))}
            </div>

            {/* Decorative bottom border */}
            <div className="flex items-center gap-3 mt-6">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-vintage-teal-400))' }}></div>
              <div className="w-2 h-2 rotate-45 border" style={{ borderColor: 'var(--color-vintage-teal-500)' }}></div>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, var(--color-vintage-teal-400), transparent)' }}></div>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 order-2 lg:order-2 space-y-16">
      {/* Hero Welcome Section */}
      <section className="relative text-center py-12 px-8 rounded-2xl overflow-hidden" style={{
        background: 'linear-gradient(135deg, var(--color-vintage-teal-100) 0%, var(--color-cream-200) 100%)',
        border: '4px double var(--color-vintage-teal-500)',
        boxShadow: '0 8px 24px rgba(95, 158, 160, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.5)'
      }}>
        {/* Pristine Shine Effect */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.4) 45%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.4) 55%, transparent 100%)',
          opacity: 0.5,
          mixBlendMode: 'overlay'
        }}></div>
        {/* Subtle edge highlights for premium feel */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)'
        }}></div>
        <div className="absolute top-0 bottom-0 left-0 w-px" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)'
        }}></div>

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
            Mother, Artist, Professor, Entrepreneur
          </p>
          <p className="mt-6 text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-vintage-teal-800)' }}>
            A cozy space where academia meets creativity, and professional pursuits blend with personal passions.
          </p>
        </div>
      </section>

      {/* Explore My World - Interactive Storefront */}
      <section>
        <div className="text-center mb-8">
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

        {/* Interactive Storefront Image */}
        <InteractiveStorefront />
      </section>

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
      {/* End Main Content */}
    </div>
  );
}
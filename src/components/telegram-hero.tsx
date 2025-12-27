import { Send, ExternalLink, Calendar, Sparkles } from 'lucide-react';
import { getCachedTelegramPosts } from '@/lib/telegram-cached';

export default async function TelegramHero() {
  const CHANNEL_NAME = "observer_5";
  const posts = await getCachedTelegramPosts(3);

  if (!posts || posts.length === 0) {
      return (
        <section className="mb-20 rounded-2xl p-12 text-center" style={{
          background: 'linear-gradient(135deg, var(--color-vintage-teal-50) 0%, var(--color-cream-100) 100%)',
          border: '3px solid var(--color-vintage-teal-300)'
        }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{
              backgroundColor: 'var(--color-cream-50)',
              boxShadow: '0 2px 8px rgba(95, 158, 160, 0.2)'
            }}>
              <Send size={24} style={{ color: 'var(--color-vintage-teal-500)' }} />
            </div>
            <h3 className="font-serif text-xl mb-2" style={{ color: 'var(--color-vintage-teal-700)' }}>Connecting to Telegram...</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-vintage-teal-600)' }}>Fetching the latest updates</p>
            <a
              href={`https://t.me/${CHANNEL_NAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm transition-colors font-medium hover:opacity-80"
              style={{ color: 'var(--color-vintage-teal-700)' }}
            >
              View Channel <ExternalLink size={14} className="ml-1.5" />
            </a>
        </section>
      );
  }

  // First post is the "Hero"
  const heroPost = posts[0];
  // Next two are the "Secondary Posts"
  const secondaryPosts = posts.slice(1, 3);

  return (
    <section className="mb-20 space-y-6 animate-in fade-in duration-700">

      {/* Vintage Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full" style={{
            background: 'linear-gradient(135deg, var(--color-vintage-teal-400) 0%, var(--color-vintage-teal-500) 100%)',
            boxShadow: '0 2px 8px rgba(95, 158, 160, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            border: '2px solid var(--color-vintage-teal-600)'
          }}>
            <Send size={18} style={{ color: 'var(--color-cream-50)' }} />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold" style={{ color: 'var(--color-vintage-teal-700)' }}>
              Latest Updates
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-cream-700)' }}>From The Observer Channel</p>
          </div>
        </div>
        <a
            href={`https://t.me/${CHANNEL_NAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--color-cream-100)',
              color: 'var(--color-vintage-teal-700)',
              border: '2px solid var(--color-cream-300)',
              boxShadow: '0 2px 6px rgba(95, 158, 160, 0.15)'
            }}
        >
            <ExternalLink size={14} />
            <span>View Channel</span>
        </a>
      </div>

      {/* HERO POST - Vintage design */}
      <a
        href={heroPost.link}
        target="_blank"
        rel="noreferrer"
        className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        style={{
          backgroundColor: 'var(--color-cream-50)',
          border: '3px solid var(--color-vintage-teal-500)',
          boxShadow: '0 4px 12px rgba(95, 158, 160, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
        }}
      >
        {heroPost.image && (
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden" style={{ backgroundColor: 'var(--color-cream-200)' }}>
            <img
              src={heroPost.image}
              alt={heroPost.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Stronger gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Vintage Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm" style={{
              backgroundColor: 'var(--color-cream-50)',
              border: '2px solid var(--color-vintage-teal-400)'
            }}>
              <Sparkles size={12} style={{ color: 'var(--color-vintage-teal-600)' }} />
              <span className="text-xs font-bold" style={{ color: 'var(--color-vintage-teal-700)' }}>Latest</span>
            </div>

            {/* Title Overlay on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center gap-2 text-white/80 text-xs mb-3">
                <Calendar size={12} />
                <span>{heroPost.date}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg line-clamp-2">
                {heroPost.title.substring(0, 100)}
              </h3>
            </div>
          </div>
        )}

        {/* Content Section - Always show */}
        <div className="p-6 md:p-8">
          {!heroPost.image && (
            <>
              <div className="flex items-center gap-2 text-xs mb-3" style={{ color: 'var(--color-cream-600)' }}>
                <Calendar size={12} />
                <span>{heroPost.date}</span>
                <span style={{ color: 'var(--color-cream-400)' }}>•</span>
                <div className="flex items-center gap-1.5">
                  <Send size={10} />
                  <span>Text Update</span>
                </div>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 leading-tight" style={{ color: 'var(--color-vintage-teal-800)' }}>
                {heroPost.title.substring(0, 100)}
              </h3>
            </>
          )}

          {heroPost.content.length > 0 && (
            <div className="leading-relaxed mb-6 line-clamp-4" style={{ color: 'var(--color-vintage-teal-700)' }}>
              <p>
                {(() => {
                  const fullText = heroPost.content.join(' ');
                  const titleText = heroPost.title.substring(0, 100);
                  const contentWithoutTitle = fullText.startsWith(titleText)
                    ? fullText.substring(titleText.length).trim()
                    : fullText;
                  return contentWithoutTitle.substring(0, 300) + '...';
                })()}
              </p>
            </div>
          )}

          <div className="inline-flex items-center gap-2 font-semibold group-hover:opacity-80 transition-opacity" style={{ color: 'var(--color-vintage-teal-700)' }}>
            <span>Read more</span>
            <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </a>

      {/* SECONDARY POSTS - Vintage Cards */}
      {secondaryPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {secondaryPosts.map((post) => (
                <a
                    key={post.id}
                    href={post.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{
                      backgroundColor: 'var(--color-cream-50)',
                      border: '2px solid var(--color-vintage-teal-400)',
                      boxShadow: '0 2px 8px rgba(95, 158, 160, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                    }}
                >
                    {/* Image if available */}
                    {post.image && (
                      <div className="relative w-full aspect-[16/10] overflow-hidden" style={{ backgroundColor: 'var(--color-cream-200)' }}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                        {/* Title overlay for better visual hierarchy */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-serif text-base md:text-lg font-bold text-white leading-snug line-clamp-2 drop-shadow-md">
                            {post.title.substring(0, 80)}
                          </h4>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-4 md:p-5">
                      <div className="flex items-center gap-2 text-xs mb-2" style={{ color: 'var(--color-cream-600)' }}>
                        <Calendar size={10} />
                        <span>{post.date}</span>
                        {!post.image && (
                          <>
                            <span style={{ color: 'var(--color-cream-400)' }}>•</span>
                            <Send size={8} />
                            <span>Text</span>
                          </>
                        )}
                      </div>

                      {!post.image && (
                        <h4 className="font-serif text-lg font-bold mb-3 line-clamp-2 leading-snug group-hover:opacity-80 transition-opacity" style={{ color: 'var(--color-vintage-teal-800)' }}>
                          {post.title.substring(0, 80)}
                        </h4>
                      )}

                      <p className="text-sm leading-relaxed line-clamp-3 mb-3" style={{ color: 'var(--color-vintage-teal-700)' }}>
                          {(() => {
                            const fullText = post.content.join(' ');
                            const titleText = post.title.substring(0, 80);
                            const contentWithoutTitle = fullText.startsWith(titleText)
                              ? fullText.substring(titleText.length).trim()
                              : fullText;
                            return contentWithoutTitle.substring(0, 150) + '...';
                          })()}
                      </p>

                      <div className="inline-flex items-center gap-1.5 text-xs font-medium group-hover:opacity-80 transition-opacity" style={{ color: 'var(--color-vintage-teal-600)' }}>
                        <span>Read more</span>
                        <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                </a>
            ))}
          </div>
      )}

    </section>
  );
}
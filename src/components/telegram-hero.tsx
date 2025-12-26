import { Send, ExternalLink, Calendar, Sparkles } from 'lucide-react';
import { getCachedTelegramPosts } from '@/lib/telegram-cached';

export default async function TelegramHero() {
  const CHANNEL_NAME = "observer_5";
  const posts = await getCachedTelegramPosts(3);

  if (!posts || posts.length === 0) {
      return (
        <section className="mb-20 bg-gradient-to-br from-stone-50 to-stone-100/50 rounded-3xl p-12 border border-stone-200/50 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4">
              <Send size={24} className="text-stone-400" />
            </div>
            <h3 className="text-stone-600 font-serif text-xl mb-2">Connecting to Telegram...</h3>
            <p className="text-stone-500 text-sm mb-4">Fetching the latest updates</p>
            <a
              href={`https://t.me/${CHANNEL_NAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-stone-600 text-sm hover:text-stone-900 transition-colors font-medium"
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

      {/* Minimal Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-stone-100 to-stone-200 shadow-sm">
            <Send size={16} className="text-stone-600" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Latest Updates
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">From The Observer Channel</p>
          </div>
        </div>
        <a
            href={`https://t.me/${CHANNEL_NAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium transition-colors"
        >
            <ExternalLink size={14} />
            <span>View Channel</span>
        </a>
      </div>

      {/* HERO POST - Clean design */}
      <a
        href={heroPost.link}
        target="_blank"
        rel="noreferrer"
        className="group block bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 hover:shadow-xl transition-all duration-300"
      >
        {heroPost.image && (
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-stone-100 overflow-hidden">
            <img
              src={heroPost.image}
              alt={heroPost.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Stronger gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
              <Sparkles size={12} className="text-amber-500" />
              <span className="text-xs font-bold text-stone-900">Latest</span>
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
              <div className="flex items-center gap-2 text-stone-400 text-xs mb-3">
                <Calendar size={12} />
                <span>{heroPost.date}</span>
                <span className="text-stone-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Send size={10} />
                  <span>Text Update</span>
                </div>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-4 leading-tight">
                {heroPost.title.substring(0, 100)}
              </h3>
            </>
          )}

          {heroPost.content.length > 0 && (
            <div className="text-stone-600 leading-relaxed mb-6 line-clamp-4">
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

          <div className="inline-flex items-center gap-2 text-stone-900 font-semibold group-hover:text-stone-600 transition-colors">
            <span>Read more</span>
            <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </a>

      {/* SECONDARY POSTS - Improved Cards */}
      {secondaryPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {secondaryPosts.map((post) => (
                <a
                    key={post.id}
                    href={post.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group block bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-stone-300 hover:shadow-lg transition-all duration-300"
                >
                    {/* Image if available */}
                    {post.image && (
                      <div className="relative w-full aspect-[16/10] bg-stone-100 overflow-hidden">
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
                      <div className="flex items-center gap-2 text-stone-400 text-xs mb-2">
                        <Calendar size={10} />
                        <span>{post.date}</span>
                        {!post.image && (
                          <>
                            <span className="text-stone-300">•</span>
                            <Send size={8} />
                            <span>Text</span>
                          </>
                        )}
                      </div>

                      {!post.image && (
                        <h4 className="font-serif text-lg font-bold text-stone-900 mb-3 line-clamp-2 leading-snug group-hover:text-stone-700 transition-colors">
                          {post.title.substring(0, 80)}
                        </h4>
                      )}

                      <p className="text-stone-600 text-sm leading-relaxed line-clamp-3 mb-3">
                          {(() => {
                            const fullText = post.content.join(' ');
                            const titleText = post.title.substring(0, 80);
                            const contentWithoutTitle = fullText.startsWith(titleText)
                              ? fullText.substring(titleText.length).trim()
                              : fullText;
                            return contentWithoutTitle.substring(0, 150) + '...';
                          })()}
                      </p>

                      <div className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 group-hover:text-stone-900 transition-colors">
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
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

  return (
    <div className="space-y-12">
      {/* Telegram Section */}
      <TelegramHero />

      {/* Blog Section Heading */}
      <div className="flex items-center space-x-4">
        <h3 className="text-2xl font-serif font-bold text-stone-900">Latest Stories</h3>
        <div className="h-px bg-stone-200 flex-grow"></div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
           <p className="text-stone-500 italic text-lg">No stories yet. Come back soon!</p>
        </div>
      ) : (
        posts.map((post) => (
          <article key={post.id} className="border-b border-stone-200 pb-12 last:border-0">
            {post.imageUrl && (
              <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden bg-stone-200 shadow-sm">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-stone-600 transition-colors">
                {post.title}
              </Link>
            </h2>
            <div className="text-stone-500 text-sm mb-4 uppercase tracking-wider font-semibold">
              {format(post.createdAt, "MMMM d, yyyy")}
            </div>
            <p className="text-stone-700 leading-relaxed line-clamp-3">
              {post.content.replace(/<[^>]+>/g, '').substring(0, 200)}...
            </p>
            <div className="mt-4">
              <Link href={`/blog/${post.slug}`} className="text-stone-900 font-semibold hover:underline inline-flex items-center">
                Read more <span className="ml-1">→</span>
              </Link>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
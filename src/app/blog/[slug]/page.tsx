import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Mom's Corner`,
    description: post.content.replace(/<[^>]+>/g, '').substring(0, 160), // First 160 chars of text
    openGraph: {
      title: post.title,
      description: post.content.replace(/<[^>]+>/g, '').substring(0, 160),
      url: `https://your-mama-website.com/blog/${slug}`,
      siteName: "Mom's Corner",
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  // 2. JSON-LD Structured Data (Google Rich Snippets)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: 'Mom', // Can be customized
    },
    image: post.imageUrl || 'https://your-mama-website.com/default-og.jpg',
    description: post.content.replace(/<[^>]+>/g, '').substring(0, 160),
  };

  return (
    <article className="max-w-2xl mx-auto">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

        <Link href="/" className="no-underline text-stone-500 hover:text-stone-900 mb-8 inline-block font-medium">
            ← Back to Home
        </Link>
      <header className="mb-8 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="text-stone-500 text-sm uppercase tracking-wider font-semibold">
          {format(post.createdAt, "MMMM d, yyyy")}
        </div>
      </header>
      
      {post.imageUrl && (
        <div className="relative h-64 md:h-96 w-full mb-10 rounded-xl overflow-hidden shadow-md">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Basic prose styling since we don't have typography plugin fully setup yet */}
      <div 
        className="prose prose-stone prose-lg max-w-none font-serif text-stone-800 leading-loose text-lg [&>p]:mb-6 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-4"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}

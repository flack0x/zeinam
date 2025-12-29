import { cookies } from 'next/headers'
import LoginForm from './login-form'
import CreatePostForm from './create-post-form'
import { logout } from './actions'
import { prisma } from '@/lib/prisma'
import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { FileText, Send, Clock, PenSquare, LogOut, RefreshCw, Eye, EyeOff } from 'lucide-react'

interface TelegramCache {
  updated: string
  channel: string
  posts: { id: string; title: string; date: string }[]
}

async function getDashboardData() {
  // Get blog posts stats
  const [totalPosts, publishedPosts, draftPosts, recentPosts] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
    prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, title: true, slug: true, published: true, createdAt: true }
    })
  ])

  // Get telegram cache info
  let telegramData: TelegramCache | null = null
  try {
    const cacheFile = path.join(process.cwd(), 'public', 'telegram-posts.json')
    const content = await fs.readFile(cacheFile, 'utf-8')
    telegramData = JSON.parse(content)
  } catch {
    telegramData = null
  }

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    recentPosts,
    telegramData
  }
}

export default async function AdminPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get('auth')?.value === 'true'

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-12 border p-8 rounded-lg shadow-sm bg-white">
        <h1 className="text-2xl font-serif font-bold mb-6 text-center">Zeina's Login</h1>
        <LoginForm />
      </div>
    )
  }

  const { totalPosts, publishedPosts, draftPosts, recentPosts, telegramData } = await getDashboardData()

  const cacheAge = telegramData
    ? Math.floor((Date.now() - new Date(telegramData.updated).getTime()) / (1000 * 60 * 60))
    : null

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold" style={{ color: 'var(--color-vintage-teal-800)' }}>
            Dashboard
          </h1>
          <p className="text-stone-500 mt-1">Welcome back, Admin</p>
        </div>
        <form action={logout}>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-red-50 text-stone-600 hover:text-red-600 border border-stone-200 hover:border-red-200">
            <LogOut size={16} />
            Logout
          </button>
        </form>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Posts */}
        <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500 font-medium">Total Blog Posts</p>
              <p className="text-3xl font-bold mt-1" style={{ color: 'var(--color-vintage-teal-700)' }}>{totalPosts}</p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-vintage-teal-100)' }}>
              <FileText size={24} style={{ color: 'var(--color-vintage-teal-600)' }} />
            </div>
          </div>
        </div>

        {/* Published Posts */}
        <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500 font-medium">Published</p>
              <p className="text-3xl font-bold mt-1 text-green-600">{publishedPosts}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <Eye size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Draft Posts */}
        <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500 font-medium">Drafts</p>
              <p className="text-3xl font-bold mt-1 text-amber-600">{draftPosts}</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-100">
              <EyeOff size={24} className="text-amber-600" />
            </div>
          </div>
        </div>

        {/* Telegram Posts */}
        <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500 font-medium">Telegram Posts</p>
              <p className="text-3xl font-bold mt-1 text-blue-600">{telegramData?.posts.length ?? 0}</p>
              {cacheAge !== null && (
                <p className="text-xs text-stone-400 mt-1">
                  Updated {cacheAge}h ago
                </p>
              )}
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <Send size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create New Post - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100" style={{ backgroundColor: 'var(--color-vintage-teal-50)' }}>
            <h2 className="font-serif font-bold text-lg flex items-center gap-2" style={{ color: 'var(--color-vintage-teal-800)' }}>
              <PenSquare size={20} />
              Write a New Story
            </h2>
          </div>
          <div className="p-6">
            <CreatePostForm />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Posts */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100" style={{ backgroundColor: 'var(--color-vintage-teal-50)' }}>
              <h2 className="font-serif font-bold text-lg flex items-center gap-2" style={{ color: 'var(--color-vintage-teal-800)' }}>
                <Clock size={20} />
                Recent Posts
              </h2>
            </div>
            <div className="p-4">
              {recentPosts.length === 0 ? (
                <p className="text-stone-400 text-sm text-center py-4">No posts yet</p>
              ) : (
                <ul className="space-y-3">
                  {recentPosts.map((post) => (
                    <li key={post.id} className="flex items-start gap-3 pb-3 border-b border-stone-100 last:border-0 last:pb-0">
                      <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${post.published ? 'bg-green-500' : 'bg-amber-500'}`} />
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm font-medium hover:underline line-clamp-1"
                          style={{ color: 'var(--color-vintage-teal-700)' }}
                        >
                          {post.title}
                        </Link>
                        <p className="text-xs text-stone-400 mt-0.5">
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100" style={{ backgroundColor: 'var(--color-vintage-teal-50)' }}>
              <h2 className="font-serif font-bold text-lg" style={{ color: 'var(--color-vintage-teal-800)' }}>
                Quick Actions
              </h2>
            </div>
            <div className="p-4 space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all hover:bg-stone-50 text-stone-600 w-full"
              >
                <Eye size={18} />
                View Site
              </Link>
              <a
                href={`https://t.me/${telegramData?.channel ?? 'observer_5'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all hover:bg-stone-50 text-stone-600 w-full"
              >
                <Send size={18} />
                Telegram Channel
              </a>
            </div>
          </div>

          {/* Telegram Status */}
          {telegramData && (
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <Send size={16} />
                <span className="font-medium text-sm">Telegram Sync</span>
              </div>
              <p className="text-xs text-blue-600">
                Last synced: {new Date(telegramData.updated).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Channel: @{telegramData.channel}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

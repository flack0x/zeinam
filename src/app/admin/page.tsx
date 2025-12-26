import { cookies } from 'next/headers'
import LoginForm from './login-form'
import CreatePostForm from './create-post-form'
import { logout } from './actions'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get('auth')?.value === 'true'

  if (!isAuthenticated) {
    return (
        <div className="max-w-md mx-auto mt-12 border p-8 rounded-lg shadow-sm bg-white">
            <h1 className="text-2xl font-serif font-bold mb-6 text-center">Mom's Login</h1>
            <LoginForm />
        </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold">Write a New Story</h1>
        <form action={logout}>
            <button className="text-sm text-stone-500 hover:text-red-600 underline">Logout</button>
        </form>
      </div>
      <CreatePostForm />
    </div>
  )
}

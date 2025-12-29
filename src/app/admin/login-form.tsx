'use client'

import { useActionState } from 'react'
import { login } from './actions'

export default function LoginForm() {
  const [state, action, isPending] = useActionState(login, { success: false, error: '' })

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-stone-700">Password</label>
        <input
          type="password"
          name="password"
          required
          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 p-2 border"
        />
      </div>
      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-stone-800 hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 disabled:opacity-50"
      >
        {isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}

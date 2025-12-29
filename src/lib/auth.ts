'use server'

import { cookies } from 'next/headers'

export async function getAuthStatus() {
  const cookieStore = await cookies()
  return cookieStore.get('auth')?.value === 'true'
}

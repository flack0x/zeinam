'use server'

import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
  const password = formData.get('password') as string
  // Default password if env not set is 'zeina'
  const validPassword = process.env.ADMIN_PASSWORD || 'zeina'

  if (password === validPassword) {
    const cookieStore = await cookies()
    cookieStore.set('auth', 'true', { httpOnly: true, path: '/' })
    revalidatePath('/admin')
    redirect('/admin')
  }
  return { success: false, error: 'Incorrect password' }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('auth')
  redirect('/')
}

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const rawContent = formData.get('content') as string
  const imageUrl = formData.get('imageUrl') as string
  
  // Simple text-to-HTML conversion
  const content = rawContent
    .split(/\n\s*\n/)
    .map(para => `<p>${para.trim()}</p>`)
    .join('')

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  await prisma.post.create({
    data: {
      title,
      slug: `${slug}-${Date.now()}`,
      content,
      imageUrl: imageUrl || null,
      published: true,
    },
  })
  
  revalidatePath('/')
  redirect('/')
}

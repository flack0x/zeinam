'use client'

import { createPost } from './actions'

export default function CreatePostForm() {
  return (
    <form action={createPost} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border border-stone-200">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          required
          className="block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 p-3 border font-serif text-xl"
          placeholder="My Lovely Day"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Cover Image URL (Optional)</label>
        <input
          type="url"
          name="imageUrl"
          className="block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 p-2 border"
          placeholder="https://..."
        />
        <p className="mt-1 text-xs text-stone-500">Paste a link to an image (ends in .jpg, .png, etc)</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Story</label>
        <textarea
          name="content"
          required
          rows={12}
          className="block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 p-4 border font-serif text-lg leading-relaxed"
          placeholder="Write your story here... (Paragraphs will be automatically formatted)"
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-stone-800 hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 transition-colors"
        >
          Publish Story
        </button>
      </div>
    </form>
  )
}

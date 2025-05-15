import { useState } from 'react'

export default function CommentForm({ onSubmit }: { onSubmit: (content: string) => void }) {
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    onSubmit(content)
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your comment..."
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        Post Comment
      </button>
    </form>
  )
}

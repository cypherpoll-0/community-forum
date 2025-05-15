import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Comment from '../../components/comment/Comment'
import CommentForm from '../../components/comment/CommentForm'

export default function ForumDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const { data: session } = useSession()

  const [forum, setForum] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  useEffect(() => {
    if (!id) return

    let cancelled = false

    fetch(`/api/forums/${id}`)
      .then(res => {
        if (!res.ok) {
          // Forum was likely deleted
          router.replace('/') // or setForum(null) to show "Not Found"
          return
        }
        return res.json()
      })
      .then(data => {
        if (!cancelled && data) {
          setForum(data.forum)
        }
      })

    fetch(`/api/comments?forumId=${id}`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) setComments(data)
      })

    return () => {
      cancelled = true
    }
  }, [id])


  const handleAddComment = async (content: string) => {
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forumId: id, content }),
    })
    const newComment = await res.json()
    setComments(prev => [...prev, newComment])
  }

  const handleDeleteComment = async (commentId: string) => {
    await fetch(`/api/comments/${commentId}`, { method: 'DELETE' })
    setComments(prev => prev.filter(c => c.id !== commentId))
  }

  if (!forum) return <div>Loading...</div>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">{forum.title}</h1>
        <button
          onClick={() => router.push('/')}
          className="text-gray-500 text-3xl leading-none hover:text-gray-700 transition p-2 cursor-pointer"
          aria-label="Close"
          title="Back to Dashboard"
        >
          &times;
        </button>
      </div>
      <p className="text-gray-700 mt-2">{forum.description}</p>
      <p className="text-sm text-gray-400 mt-1">
        Posted by {forum.user.name} on {new Date(forum.createdAt).toLocaleString()}
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">Comments</h2>

      {session?.user && (
        <CommentForm onSubmit={handleAddComment} />
      )}

      <div className="mt-4 space-y-3">
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            canEdit={comment.userId === session?.user?.id}
            onDelete={() => handleDeleteComment(comment.id)}
          />
        ))}
      </div>
    </div>
  )
}

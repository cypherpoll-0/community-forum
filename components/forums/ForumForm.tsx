// components/forums/ForumForm.tsx
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { createForumThunk, updateForumThunk } from '@/redux/thunks/forumThunks'
import { Forum } from '@/types/forum.types'

interface Props {
  existingForum?: Forum
  onSuccess?: () => void
}

const ForumForm = ({ existingForum, onSuccess }: Props) => {
  const [title, setTitle] = useState(existingForum?.title || '')
  const [description, setDescription] = useState(existingForum?.description || '')
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.forum)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description) return

    if (existingForum) {
      await dispatch(updateForumThunk({ id: existingForum.id, title, description }))
    } else {
      await dispatch(createForumThunk({ title, description }))
    }

    setTitle('')
    setDescription('')
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow">
      <input
        className="w-full border p-2 rounded"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Forum Title"
        required
      />
      <textarea
        className="w-full border p-2 rounded"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Submitting...' : existingForum ? 'Update Forum' : 'Create Forum'}
      </button>
    </form>
  )
}

export default ForumForm

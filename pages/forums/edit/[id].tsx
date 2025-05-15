import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchForumByIdThunk, updateForumThunk } from '@/redux/thunks/forumThunks'

const EditForumPage = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const forum = useAppSelector(state =>
    state.forum.forums.find(f => f.id === id)
  )

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (!forum && id) dispatch(fetchForumByIdThunk(id as string))
  }, [id])

  useEffect(() => {
    if (forum) {
      setTitle(forum.title)
      setDescription(forum.description)
    }
  }, [forum])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(updateForumThunk({ id: id as string, title, description }))
    router.push('/')
  }

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Edit Forum</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          className="border w-full p-2"
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          className="border w-full p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  )
}

export default EditForumPage

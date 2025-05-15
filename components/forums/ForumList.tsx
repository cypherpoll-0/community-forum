// components/forums/ForumList.tsx
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchAllForumsThunk, fetchUserForumsThunk } from '@/redux/thunks/forumThunks'
import ForumCard from './ForumCard'

const ForumList = ( props: {mine: boolean} ) => {
  const dispatch = useAppDispatch()
  const { forums, loading, error } = useAppSelector(state => state.forum)

  useEffect(() => {
    if(props.mine) {
      dispatch(fetchUserForumsThunk())
    } else {
      dispatch(fetchAllForumsThunk())
    }
  }, [dispatch])

  if (loading) return <p>Loading forums...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (!forums.length) return <p>No forums found.</p>

  return (
    <div className="space-y-4">
      {forums.map(forum => (
        <ForumCard key={forum.id} forum={forum} />
      ))}
    </div>
  )
}

export default ForumList

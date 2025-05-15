import { Forum } from '@/types/forum.types'
import { useAppDispatch } from '@/redux/hooks'
import { deleteForumThunk } from '@/redux/thunks/forumThunks'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface Props {
  forum: Forum
}

const ForumCard = ({ forum }: Props) => {
  const dispatch = useAppDispatch()
  const { data: session } = useSession()
  const [formatted, setFormatted] = useState('')

  useEffect(() => {
    setFormatted(new Date(forum.createdAt).toLocaleString())
  }, [forum.createdAt])

  const isOwner = session?.user?.id === forum.userId
  const router = useRouter()

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const confirmed = confirm("Are you sure you want to delete this forum?")
    if (!confirmed) return

    const result = await dispatch(deleteForumThunk(forum.id))

    if (deleteForumThunk.fulfilled.match(result)) {
      router.push("/") // ✅ Will work now
    } else {
      alert("Failed to delete forum")
    }
  }

  return (
    <Link
      href={`/forums/${forum.id}`}
      className="block border p-4 rounded shadow space-y-2 hover:bg-gray-50 transition"
    >
      <div>
        <h2 className="text-xl font-bold">{forum.title}</h2>
        <p>{forum.description}</p>
      </div>

      {isOwner && (
        <div className="flex gap-4 mt-2">
          <button
            onClick={handleDelete}
            onMouseDown={(e) => e.preventDefault()} // prevent focus bug
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
          <Link
            href={`/forums/edit/${forum.id}`}
            onClick={(e) => e.stopPropagation()}
            className="text-blue-500 hover:underline"
          >
            Edit
          </Link>
        </div>
      )}

      <p className="text-sm text-gray-500">Created: {formatted}</p>
    </Link>
  )
}

export default ForumCard

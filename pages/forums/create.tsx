// pages/forums/create.tsx
import { useRouter } from 'next/router'
import ForumForm from '@/components/forums/ForumForm'

export default function CreateForumPage() {
  const router = useRouter()

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a New Forum</h1>
      <ForumForm onSuccess={() => router.push('/forums')} />
    </div>
  )
}

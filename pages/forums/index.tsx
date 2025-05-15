// pages/forums/index.tsx
import Link from 'next/link'
import ForumList from '@/components/forums/ForumList'

export default function ForumsPage() {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Community Forums</h1>
        <div className="flex gap-4">
          <Link href="/" className="text-blue-500 underline">
            Home
          </Link>
          <Link href="/forums/create" className="text-blue-500 underline">
            + New Forum
          </Link>
        </div>
      </div>
      <ForumList mine={true} />
    </div>
  )
}

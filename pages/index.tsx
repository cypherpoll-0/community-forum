import { useSession, signIn, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ForumList from '@/components/forums/ForumList'

export default function Home() {
  const { data: session } = useSession()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Community Forums</h1>
        {session ? (
          <div className="flex items-center gap-4">
            <Link href="/forums" className="text-blue-500 underline">
              My Forums
            </Link>
            <p className="text-gray-600 text-sm">Signed in as {session.user?.name}</p>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign in with Google
          </button>
        )}
      </div>

      {session && (
        <div className="mb-6">
          <Link
            href="/forums/create"
            className="bg-green-600 text-white px-4 py-2 rounded inline-block"
          >
            + Create New Forum
          </Link>
        </div>
      )}

      <ForumList mine={false} />
    </div>
  )
}

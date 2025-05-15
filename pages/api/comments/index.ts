import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import {db} from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (req.method === 'GET') {
    const { forumId } = req.query
    const comments = await db.comment.findMany({
      where: { forumId: forumId as string },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    })
    return res.json(comments)
  }

  if (req.method === 'POST') {
    if (!session) return res.status(401).json({ message: 'Not authenticated' })

    const { forumId, content } = req.body

    const comment = await db.comment.create({
      data: {
        forumId,
        content,
        userId: session.user.id,
      },
      include: { user: true },
    })

    return res.status(201).json(comment)
  }
}

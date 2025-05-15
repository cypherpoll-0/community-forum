import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import {db} from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  const { id } = req.query

  if (req.method === 'DELETE') {
    if (!session) return res.status(401).json({ message: 'Not authenticated' })

    const comment = await db.comment.findUnique({ where: { id: id as string } })
    if (!comment || comment.userId !== session.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    await db.comment.delete({ where: { id: id as string } })
    return res.status(204).end()
  }
}

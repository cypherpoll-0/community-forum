import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  const forumId = req.query.id as string

  // Always fetch the forum (for GET or ownership check)
  const forum = await db.forum.findUnique({
    where: { id: forumId },
    include: { user: true },
  })

  if (!forum) return res.status(404).json({ message: "Forum not found" })

  if (req.method === "GET") {
    // Publicly accessible
    return res.status(200).json({ forum })
  }

  // For PUT and DELETE: require login and ownership
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  if (forum.userId !== session.user?.id) {
    return res.status(403).json({ message: "Forbidden" })
  }

  if (req.method === "PUT") {
    const { title, description, tags } = req.body
    const updated = await db.forum.update({
      where: { id: forumId },
      data: { title, description, tags },
    })
    return res.status(200).json(updated)
  }

  if (req.method === "DELETE") {
    await db.forum.delete({ where: { id: forumId } })
    return res.status(204).end()
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}

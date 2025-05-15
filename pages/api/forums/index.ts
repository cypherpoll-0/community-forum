import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {db} from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "GET") {
    let forums
    if(req.query.mine === 'true') {
      forums = await db.forum.findMany({
        where: { userId: session?.user.id },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
      }) 
    } else {
      forums = await db.forum.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
      });
    }
    return res.status(200).json(forums);
  }

  if (req.method === "POST") {
    if (!session) return res.status(401).json({ message: "Unauthorized" });
    
    if (!session?.user?.email) {
        return res.status(400).json({ message: "Email is missing in session" });
    }   
    
    const { title, description, tags } = req.body;

    const forum = await db.forum.create({
      data: {
        title,
        description,
        tags,
        user: { connect: { email: session.user.email } },
      },
    });
    return res.status(201).json(forum);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
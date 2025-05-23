import { UserState } from "./userState.types"
import { CommentType } from "./comment.types"

export interface Forum {
  id: string
  title: string
  description: string
  tags: string[]
  createdAt: string // ISO format from DateTime
  userId: string
  user?: UserState       // optional: populated only when joined
  comments?: CommentType[]
}
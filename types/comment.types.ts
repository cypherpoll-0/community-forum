import { UserState } from './userState.types'

export interface CommentType {
  id: string
  content: string
  createdAt: string
  userId: string
  forumId: string
  user?: UserState
}
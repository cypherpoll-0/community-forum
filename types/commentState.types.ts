import { Comment } from './comment.types'

export interface CommentState {
  comments: Comment[]
  loading: boolean
  error: string | null
}
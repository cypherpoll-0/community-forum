import { CommentType } from './comment.types'

export interface CommentState {
  comments: CommentType[]
  loading: boolean
  error: string | null
}
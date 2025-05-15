import { Forum } from './forum.types'

export interface ForumState {
  forums: Forum[]
  loading: boolean
  error: string | null
}
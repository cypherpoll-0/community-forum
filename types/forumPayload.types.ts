export interface CreateForumPayload {
  title: string
  description: string
  tags?: string[]
}

export interface UpdateForumPayload {
  id: string
  title?: string
  description?: string
  tags?: string[]
}
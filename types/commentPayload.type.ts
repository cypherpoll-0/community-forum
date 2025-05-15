export interface CreateCommentPayload {
  forumId: string
  content: string
}

export interface UpdateCommentPayload {
  id: string
  content: string
}
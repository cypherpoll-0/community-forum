import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Forum } from '@/types/forum.types'
import { ForumState } from '@/types/forumState.types'
import {
  fetchAllForumsThunk,
  createForumThunk,
  updateForumThunk,
  deleteForumThunk,
  fetchForumByIdThunk,
  fetchUserForumsThunk
} from '../thunks/forumThunks'


const initialState: ForumState = {
  forums: [],
  loading: false,
  error: null,
}

const forumSlice = createSlice({
  name: 'forums',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch All
      .addCase(fetchAllForumsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllForumsThunk.fulfilled, (state, action: PayloadAction<Forum[]>) => {
        state.loading = false
        state.forums = action.payload
      })
      .addCase(fetchAllForumsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Fetch Mine
      .addCase(fetchUserForumsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserForumsThunk.fulfilled, (state, action: PayloadAction<Forum[]>) => {
        state.loading = false
        state.forums = action.payload
      })
      .addCase(fetchUserForumsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Create
      .addCase(createForumThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createForumThunk.fulfilled, (state, action: PayloadAction<Forum>) => {
        state.loading = false
        state.forums.unshift(action.payload) // add new forum to top
      })
      .addCase(createForumThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Update
      .addCase(updateForumThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateForumThunk.fulfilled, (state, action: PayloadAction<Forum>) => {
        state.loading = false
        const index = state.forums.findIndex((f) => f.id === action.payload.id)
        if (index !== -1) {
          state.forums[index] = action.payload
        }
      })
      .addCase(updateForumThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Delete
      .addCase(deleteForumThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteForumThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false
        state.forums = state.forums.filter((f) => f.id !== action.payload)
      })
      .addCase(deleteForumThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // 🟦 Handle single forum fetch
    .addCase(fetchForumByIdThunk.fulfilled, (state, action) => {
      const existing = state.forums.find(f => f.id === action.payload.id)
      if (!existing) {
        state.forums.push(action.payload)
      } else {
        // update if newer data
        Object.assign(existing, action.payload)
      }
    })
  },
})

export default forumSlice.reducer

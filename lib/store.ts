import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/redux/slices/userSlice'
import forumReducer from '@/redux/slices/forumSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    forum: forumReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
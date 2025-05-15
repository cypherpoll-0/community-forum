import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '@/types/userState.types'

const initialState: UserState = {
    id: null,
    name: null,
    email: null,
    image: null,
    isAuthenticated: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Partial<UserState>>) => {
            Object.assign(state, action.payload, { isAuthenticated: true })
        },
        clearUser: () => initialState,
    },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
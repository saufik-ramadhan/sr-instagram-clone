import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: { token: '', user: null } as AuthState,
  reducers: {
    setAuth: (state, { payload: { token, user } }: AuthPayload) => {
      state.token = token
      state.user = user
    },
    logout: state => {
      state.token = ''
      state.user = null
    },
  },
})

export const { setAuth, logout } = slice.actions

export default slice.reducer

export type AuthState = {
  token: string
  user: User | null
}

export type User = {
  id: string
  userName: string
}

type AuthPayload = {
  payload: { token: string; user: User }
}

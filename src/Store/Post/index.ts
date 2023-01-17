import { createSlice } from '@reduxjs/toolkit'
import { ImageSourcePropType } from 'react-native'

const slice = createSlice({
  name: 'auth',
  initialState: { posts: [] } as PostState,
  reducers: {
    addPost: (state, { payload: { id, images, detail } }: PostPayload) => {
      state.posts = [{ id, images, detail }, ...state.posts]
    },
    deletePost: (state, { payload: { id } }: { payload: { id: number } }) => {
      state.posts = state.posts.filter(i => i.id !== id)
    },
    editPost: (state, { payload: { id, images, detail } }: PostPayload) => {
      state.posts = state.posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            images,
            detail
          };
        } else {
          return post;
        }
      })
    }
  },
})

export const { addPost, deletePost, editPost } = slice.actions

export default slice.reducer

export type PostState = {
  posts: Post[]
}

export type Post = {
  id: number,
  images: {uri: string}[],
  detail: string
}

type PostPayload = {
  payload: Post
}

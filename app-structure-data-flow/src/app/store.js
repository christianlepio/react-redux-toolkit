import { configureStore } from '@reduxjs/toolkit'
//this contains actions/state for managing posts
import postsReducer from '../features/posts/postsSlice'

//config
export const store = configureStore({
    //list of reducers
    //components can call/use all reducers here from store
    reducer:{
        posts: postsReducer
    }
})
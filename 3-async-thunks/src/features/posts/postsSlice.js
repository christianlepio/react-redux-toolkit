//this slice is for posts features
//slice is a collection of reducer logic/actions for a single feature in the app
//this import is to create slice
//createAsyncThunk is for axios delayed process
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit"
import { sub } from 'date-fns'
import axios from 'axios'

//base url
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

//initialize state
const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null 
}

//create posts slice and it has an object inside of it
const postsSlice = createSlice({
    //objects
    name: 'postsMema', //this is required
    //this container holds all initialized state
    initialState,
    //reducers contains all actions/functions for posts
    reducers: {
        //action to add new post
        postAdded: {
            reducer: (state, action) => {
                //payload holds the passed parameter value
                state.posts.push(action.payload)
            }, 
            //prepare callback
            //to prepare all passed params before going to postAdded reducer
            prepare: (title, content, userId) => {
                return {
                    //manipulate action payload
                    payload: {
                        id: nanoid(),
                        title, 
                        content,
                        date: new Date().toISOString(),
                        userId, 
                        reactions: {
                            thumbsUp: 0,
                            wow: 0, 
                            heart: 0, 
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        //action to update reaction count
        //receives state and action
        reactionAdded: (state, action) => {
            //get received postId and reaction from action's payload
            const { postId, reaction } = action.payload

            //get specific post by post id
            const existingPost = state.posts.find(post => post.id === postId)

            //check if there is existing post
            if (existingPost) {
                //update reaction by adding 1
                existingPost.reactions[reaction]++
            }
        }
    }
})

//this will be useful for useSelector, to manage easily
export const selectAllPosts = (state) => state.posts.posts

//export actions to use in other components
export const { postAdded, reactionAdded } = postsSlice.actions

//export postsSlice reducer that will be use in app/store.js list of reducer
export default postsSlice.reducer
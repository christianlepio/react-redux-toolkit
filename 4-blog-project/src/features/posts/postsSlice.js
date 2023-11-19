//this slice is for posts features
//slice is a collection of reducer logic/actions for a single feature in the app
//this import is to create slice
//createAsyncThunk is for axios delayed process
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit"
import { sub } from 'date-fns'
import axios from 'axios'

//base url for posts
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

//initialize state
const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null 
}

//get all posts from posts url using axios in thunk
                                        //this is the 1st args
                                        //this is a prefix for the generated action type
                                        //'posts' here is coming from app/store.js list of reducers
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

//add new post using axios in thunk
                                        //this is the 1st args
                                        //this is a prefix for the generated action type
                                        //'posts' here is coming from app/store.js list of reducers
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

//update specific post
export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    //get id from parameter
    const { id } = initialPost
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data
    } catch (err) {
        //return err.message
        return initialPost //only for testing redux in fake api!
    }
})

//delete specific post
export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    //get id from parameter
    const { id } = initialPost
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        //this is the case for fake api
        //it is not actually deleting the post but it only sending the id that is deleted and its status
        if (response?.status === 200) {
            return initialPost
        } else {
            return `${response?.status}: ${response?.statusText}`
        }        
    } catch (err) {
        return err.message
    }
})

//create posts slice and it has an object inside of it
const postsSlice = createSlice({
    //objects
    name: 'postsMema', //this is required
    //this container holds all initialized state
    initialState,
    //reducers contains all actions/functions for posts
    reducers: {
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
    }, 
    //add extra reducers to support function fetchPosts and addNewPost
    //extra reducers accepting builder parameter
    //builder parameter is an object
    extraReducers: (builder) => {
        //promise response by fetchPosts and addNewPost
        builder
            //if fetching post is pending, set status to loading
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            //if the promise is fulfilled then fetching posts status is succeeded
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = []
                state.status = 'succeeded'
                //adding date and reactions to fetched posts from fake api
                let min = 1
                //action.payload holds the posts that is fetched from fake api
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0, 
                        heart: 0, 
                        rocket: 0,
                        coffee: 0
                    }
                    return post 
                })

                //append fetched posts to state variable posts[] together with the new field in loadedPosts
                state.posts = state.posts.concat(loadedPosts)
            })
            //if the promise got rejected then set status to failed and pass the error value
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            //if the promise is fulfilled for adding new post, append new post to state.posts
            .addCase(addNewPost.fulfilled, (state, action) => {
                // Creating sortedPosts & assigning the id 
                // would be not be needed if the fake API 
                // returned accurate new post IDs
                const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })

                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1

                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0, 
                    heart: 0, 
                    rocket: 0,
                    coffee: 0
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })
            //if the promise is fulfilled for updating post, update post from state.posts
            .addCase(updatePost.fulfilled, (state, action) => {
                //if the payload does not have id property
                if (!action.payload?.id) {
                    console.log('update could not complete!')
                    //we will get an error message right here
                    console.log('error: ',action.payload)
                    return
                } else {
                    //get id from action payload
                    const { id } = action.payload
                    action.payload.date = new Date().toISOString()
                    //get posts that is not equal to updated one
                    const posts = state.posts.filter(post => post.id !== id)
                    //update posts with specific post from action payload
                    state.posts = [...posts, action.payload]
                }
            })
            //if the promise is fulfilled for deleting post, delete post from state.posts
            .addCase(deletePost.fulfilled, (state, action) => {
                //if the payload does not have id property
                if (!action.payload?.id) {
                    console.log('delete could not complete!')
                    //we will get an error message right here
                    console.log('error: ',action.payload)
                    return
                } else {
                    //get id from action payload
                    const { id } = action.payload
                    //filter posts that is not equal to id in action payload
                    const posts = state.posts.filter(post => post.id !== id)
                    //update posts with filtered posts
                    state.posts = posts
                }
            })
    }
})

//this will be useful for useSelector, to manage easily
export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error

//this will select post by ID
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)

//export actions to use in other components
export const { postAdded, reactionAdded } = postsSlice.actions

//export postsSlice reducer that will be use in app/store.js list of reducer
export default postsSlice.reducer
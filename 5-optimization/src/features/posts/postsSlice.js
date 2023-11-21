//this slice is for posts features
//slice is a collection of reducer logic/actions for a single feature in the app
//this import is to create slice
//createAsyncThunk is for axios delayed process
//createSelector to create a memoized selector to avoid rerendering of useSelector
//createEntityAdapter is used for Normalization to avoid duplicated data, 
import { 
    createSlice, 
    createAsyncThunk, 
    createSelector, 
    createEntityAdapter 
} from "@reduxjs/toolkit"
import { sub } from 'date-fns'
import axios from 'axios'

//base url for posts
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

//create entity adapter
const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

//assign initialized state for postsAdapter.
//even if u don't have posts[] acrray here, postsAdapter will automatically 
//creates an object with id and entity contains all posts array
const initialState = postsAdapter.getInitialState({
    //these are extra state added to postsAdapter
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, 
    count: 0 //for testing performance 
})

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
            //state.entities contains all posts array from postsAdapter
            const existingPost = state.entities[postId]

            //check if there is existing post
            if (existingPost) {
                //update reaction by adding 1
                existingPost.reactions[reaction]++
            }
        },
        //for testing performance 
        increaseCount: (state, action) => {
            state.count = state.count + 1
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
                //state.entities contains all posts array from postsAdapter
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

                //postsAdapter has its own CRUD methods
                //upsert many creates shallow copy to merge old and new entities overwriting existing values,
                //adding new fields from loadedPosts to state.entities of postsAdapter
                postsAdapter.upsertMany(state, loadedPosts)                
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
                action.payload.id = state.ids[state.ids.length - 1] + 1

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
                //postsAdapter has its own CRUD methods
                //append action.payload to current state of postsAdapter
                postsAdapter.addOne(state, action.payload)
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
                    //update new value for date
                    action.payload.date = new Date().toISOString()
                    
                    //postsAdapter has its own CRUD methods
                    //upsertOne: accepts a single entity. If an entity with that ID exists, 
                    // it will perform a shallow update and the specified fields will be merged 
                    // into the existing entity, with any matching fields overwriting the existing values. 
                    // If the entity does not exist, it will be added.
                    postsAdapter.upsertOne(state, action.payload)
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
                    
                    //postsAdapter has its own CRUD methods
                    //removeOne: accepts a single entity ID value, and removes the entity with that ID if it exists.
                    postsAdapter.removeOne(state, id)
                }
            })
    }
})

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts, //this will return an array of post entities
    selectById: selectPostById, //returns specific post from entities with defined id
    selectIds: selectPostIds //returns the state.ids array
} = postsAdapter.getSelectors(state => state.posts) //state.posts here is from app/store.js list of reducer

//this will be useful for useSelector, to manage easily
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error
export const getCount = (state) => state.posts.count //for testing performance

//this will select post by user
//this will throw a memoized posts by user using createSelector
//createSelector accepts 1 or more input functions
export const selectPostbyUser = createSelector(
    //input functions inside the square brackets
    //these are the dependencies
    [selectAllPosts, (state, userId) => userId],
    //will provide input parameter from dependecies
    //if the posts/userId changes, that's the only time that this will run again
    (posts, userId) => posts.filter(post => post.userId === userId)
)

//export actions to use in other components
export const { increaseCount, reactionAdded } = postsSlice.actions

//export postsSlice reducer that will be use in app/store.js list of reducer
export default postsSlice.reducer
//this slice is for posts features
//slice is a collection of reducer logic/actions for a single feature in the app
//this import is to create slice
import { createSlice, nanoid } from "@reduxjs/toolkit"

//initialize state
const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: 'I have heard good things'
    },
    {
        id: '2',
        title: 'Post Slices...',
        content: 'Lorem ipsum dolor et al Lorem ipsum dolor et al'
    }
]

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
                state.push(action.payload)
            }, 
            prepare: (title, content) => {
                return {
                    payload: {
                        id: nanoid(),
                        title, 
                        content
                    }
                }
            }
        }
    }
})

//this will be useful for useSelector, to manage easily
export const selectAllPosts = (state) => state.posts

//export actions to use in other components
export const { postAdded } = postsSlice.actions

//export postsSlice reducer that will be use in app/store.js list of reducer
export default postsSlice.reducer
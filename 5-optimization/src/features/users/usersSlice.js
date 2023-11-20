//this slice is for user features
//slice is a collection of reducer logic/actions for a single feature in the app
//this import is to create slice
//createAsyncThunk is for axios delayed process
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

//base url for users
const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

//initialize state
const initialState = []

//get all users from users url using axios in thunk
                                        //this is the 1st args
                                        //this is a prefix for the generated action type
                                        //'users' here is coming from app/store.js list of reducers
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL)
    return response.data
})

//create user slice 
const usersSlice = createSlice({
    //objects
    name: 'usersMema', //this is required
    //this container holds all initialized state
    initialState,
    //reducers contains all actions/functions for users
    reducers: {}, 
    //add extra reducers to support function fetchUsers
    //extra reducers accepting builder parameter
    //builder parameter is an object
    extraReducers: (builder) => {
        //if the promise is fulfilled then return fetched users from fake api
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            //action.payload holds all fetched users from fake api
            return action.payload
        })
    }
})

//this will be useful for useSelector, to manage easily
export const selectAllUsers = (state) => state.users
//select user by id
export const selectUserById = (state, userId) => state.users.find(user => user.id === userId)

//export usersSlice reducer that will be use in app/store.js list of reducer
export default usersSlice.reducer
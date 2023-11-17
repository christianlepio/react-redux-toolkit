//this slice is for user features
//slice is a collection of reducer logic/actions for a single feature in the app
//this import is to create slice
import { createSlice } from "@reduxjs/toolkit"

//initialize state
const initialState = [
    { id: '0', name: 'Lanz Frealyn' }, 
    { id: '1', name: 'Ryan Christian' }, 
    { id: '2', name: 'Milka Snow' }, 
]

//create user slice 
const usersSlice = createSlice({
    //objects
    name: 'usersMema', //this is required
    //this container holds all initialized state
    initialState,
    //reducers contains all actions/functions for users
    reducers: {}
})

//this will be useful for useSelector, to manage easily
export const selectAllUsers = (state) => state.users

//export usersSlice reducer that will be use in app/store.js list of reducer
export default usersSlice.reducer
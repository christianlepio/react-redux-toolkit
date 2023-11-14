//this slice is for counter features
//slice is a collection of reducer logic/actions for a single feature in the app
//this import is to create slice
import { createSlice } from "@reduxjs/toolkit"

//initialize state
const initialState = {
    count: 0
}

//create counter slice and it has an object inside of it
export const counterSlice = createSlice({
    //objects
    name: 'counterMema', //required
    //this container here holds all initialized state
    initialState, 
    //this is where all actions/logics will be placed
    reducers: {
        //action to increment count state
        increment: (state) => {
            state.count += 1
        },
        //action to decrement count state
        decrement: (state) => {
            state.count -= 1
        },
        //action to reset count state to zero
        reset: (state) => {
            state.count = 0
        },
        //this will accepts value using action.payload
        incrementByAmnt: (state, action) => {
            state.count += action.payload
        }
    }
})

//export actions/functions to be useful in other component
export const { increment, decrement, reset, incrementByAmnt } = counterSlice.actions

//export counterSlice reducer that will be use in app/store.js list of reducer
export default counterSlice.reducer
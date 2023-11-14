import { configureStore } from '@reduxjs/toolkit'
//this contains actions for increment/decrement count state
import counterReducer from '../features/counter/counterSlice'

//config
export const store = configureStore({
    //list of reducers
    //components can call/use all reducers here from store
    reducer: {
        counterPers: counterReducer,
    }
})
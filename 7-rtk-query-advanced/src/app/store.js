import { configureStore } from '@reduxjs/toolkit'
//this contains RTK query (endpoints) for managing posts
import { apiSlice } from '../features/api/apiSlice'
//this contains actions/state for managing users
import usersReducer from '../features/users/usersSlice'

//config
export const store = configureStore({
    //list of reducers
    //components can call/use all reducers here from store
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer, //default property name of this is 'api'
        users: usersReducer
    },
    //this is required when implementing RTK query with store
    middleware: getDefaultMiddleware => 
        //add apiSlice middleware to default middleware
        //apiSlice middleware manages cache lifetimes and expirations and 
        //is required to use it when we're using RTk query in an apiSlice 
        getDefaultMiddleware().concat(apiSlice.middleware),
        //allow debugging in devtools
        devTools: true
})
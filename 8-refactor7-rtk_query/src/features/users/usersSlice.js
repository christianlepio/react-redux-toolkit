//this slice is for user features
//slice is a collection of reducer logic/actions for a single feature in the app
//createEntityAdapter is used for Normalization to avoid duplicated data, 
import { createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from "../api/apiSlice"

// create entity adapter
const usersAdapter = createEntityAdapter()

//initial state
//this will create a normalized state containing ids and entities
const initialState = usersAdapter.getInitialState()

//this will be injected to the endpoints in apiSlice file
export const usersApiSlice = apiSlice.injectEndpoints({
    //define endpoints
    endpoints: builder => ({
        //method to get all users
        //builder.query is for requesting data
        fetchUsers: builder.query({
            //query value that will combined to the baseUrl in apiSlice
            query: () => '/users',
            //get response data and setAll in usersAdapter
            transformResponse: resData => {
                //usersAdapter has its own CRUD methods
                //set resData to initialState
                return usersAdapter.setAll(initialState, resData)
            },
            providesTags: (result, error, arg) => {
                console.log('User.ids: ', result.ids)
                return [
                    //define type and id as LIST
                    { type: 'User', id: 'LIST' },
                    //map ids of every result
                    //if any one of these ids were invalidated, it will trigger
                    //fetchUser again and refetch users data automatically
                    ...result.ids.map(id => ({ type: 'User', id }))
                ]
            }
        })
    })
})

//RTK query automatically creates custom hooks for methods on injected endpoints
//these hooks can be use by the components
export const { 
    useFetchUsersQuery //custom hook generated from fetchUsers query method 
} = usersApiSlice
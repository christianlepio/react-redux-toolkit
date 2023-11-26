//this slice is for user features
//slice is a collection of reducer logic/actions for a single feature in the app

//createSelector to create a memoized selector to avoid rerendering of useSelector
//createEntityAdapter is used for Normalization to avoid duplicated data, 
import { 
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit'
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

//start of selectors

//get the result from injected enpoint method fetchUsers above
export const selectUsersResult = usersApiSlice.endpoints.fetchUsers.select()

//creates memoized selector
const selectUsersData = createSelector(
    //input function 
    selectUsersResult,
    //output function
    usersResult => usersResult.data //data property here holds normalized state obj with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring 
export const {
    selectAll: selectAllUsers, //this will return an array of user entities
    selectById: selectUserById, //returns specific user from entities with defined id 
    selectIds: selectUserIds // returns the state.ids array
    //?? = nullish operator, if normalized state is null then return the initial state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)

//end of selectors
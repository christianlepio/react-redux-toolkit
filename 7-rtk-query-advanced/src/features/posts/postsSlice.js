//this slice is for posts features
//slice is a collection of reducer logic/actions for a single feature in the app

//createSelector to create a memoized selector to avoid rerendering of useSelector
//createEntityAdapter is used for Normalization to avoid duplicated data, 
import { 
    createSelector, 
    createEntityAdapter 
} from "@reduxjs/toolkit"
import { sub } from 'date-fns'
import { apiSlice } from "../api/apiSlice"

//create entity adapter
const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

//assign initialized state for postsAdapter.
//even if u don't have posts[] acrray here, postsAdapter will automatically 
//creates an object with id and entity contains all posts array
const initialState = postsAdapter.getInitialState()

//this will be injected to the endpoints in apiSlice file
export const extendedApiSlice = apiSlice.injectEndpoints({
    //define endpoints
    endpoints: builder => ({
        //method to get all posts from url+query
        //builder.query is for requesting data
        getPosts: builder.query({
            //query value that will combined to baseUrl
            query: () => '/posts',
            //add or update new fields or obj to the posts data using transformResponse
            //to add date and reactions field to the fetched posts
            transformResponse: responseData => {
                //initialize minutes to 1
                let min = 1
                //map responseData and assign to loadedPosts container
                const loadedPosts = responseData.map(post => {
                    //check if post don't have a date field
                    if (!post?.date) {
                        //assign value for post date
                        post.date = sub(new Date(), { minutes: min++ }).toISOString
                    }
                    //check if post has a reactions data or field
                    if (!post?.reactions) {
                        //assign values for post reactions
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0, 
                            heart: 0, 
                            rocket: 0,
                            coffee: 0
                        }
                    }
                    //return or pass the post to loadedPosts
                    return post
                })
                //postsAdapter has its own CRUD methods
                //set loadedPosts to initialState
                return postsAdapter.setAll(initialState, loadedPosts)
            },

            providesTags: (results, error, arg) => [
                //define ID as LIST 
                { type: 'Post', id: 'LIST' },
                //map ids of every results
                //if any one of these ids were invalidated, it will trigger 
                //getPosts again and refetch data automatically
                ...results.ids.map(id => ({ type: 'Post', id }))
            ]
        }), 

    })
})

//RTK query automatically creates custom hooks for methods in extended enpoints above
//these custom hooks can be used by the components
export const {
    useGetPostsQuery, //custom hook generated from getPosts method
} = extendedApiSlice

//start of selectors

//get the result from enpoint method getPosts above
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

//creates memoized selector
const selectPostsData = createSelector(
    //input function 
    selectPostsResult, 
    //output function
    postsResult => postsResult.data //data property here holds normalized state obj with ids and entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts, //this will return an array of post entities
    selectById: selectPostById, //returns specific post from entities with defined id
    selectIds: selectPostIds //returns the state.ids array
    // ?? = nullish operator, if normalized state is null then return the initial state
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState) 

//end of selectors
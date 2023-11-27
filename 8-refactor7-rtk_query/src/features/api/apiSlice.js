//fetchBaseQuery handles baseUrl for the data
//createApi lets us to create apiSlice that will serve as backend code
//createApi is used to implement rtk query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//create apiSlice using createApi
export const apiSlice = createApi({
    //default objects
    reducerPath: 'api', //optional if value is 'api'
    //define the base url to be used in fetching data using fetchBaseQuery function
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }), 
    //for cached data
    //you can decide if you want to update this realtime using providesTags and invalidatesTags
    tagTypes: ['Post', 'User'],
    //this will handle all fetch requests (RTK query)
    endpoints: builder => ({})
})
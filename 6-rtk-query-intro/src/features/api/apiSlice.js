//fetchBaseQuery handles baseUrl for the data
//createApi lets us to create apiSlice that will serve as backend code
// createApi is used to implement rtk query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//crate apiSlice using createApi
export const apiSlice = createApi({
    // Default Objects
    reducerPath: 'api',
    //define the base url to be used in fetching data
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Todos'], //this is required to update data realtime
    //this will handle all fetch requests
    endpoints: (builder) => ({
        //defined method to get all todos from url+query
        //builder.query is for requesting the data
        getTodos: builder.query({
            query: () => '/todos',
            //transformResponse is a built in method of RTK query that lets you sort data
            transformResponse: res => res.sort((a, b) => b.id - a.id), 
            providesTags: ['Todos']
        }),
        //defined method to add new todo
        //builder.mutation is for changing the data
        addTodo: builder.mutation({
            //this will accepts todo params
            query: (todo) => ({
                url: '/todos',
                method: 'POST', //POST method is for submit
                body: todo //this todo is from passed parameter
            }),
            invalidatesTags: ['Todos']
        }),
        //defined method to update todo based on id
        updateTodo: builder.mutation({
            //this will accepts todo params
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH', //PUT is for changing full record, PATCH method is for changing part of the record
                body: todo //this todo is from passed parameter
            }),
            invalidatesTags: ['Todos']
        }),
        //defined method to delete todo based on id params
        deleteTodo: builder.mutation({
            //this will accepts todo params
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE', //DELETE method is for deleting record
                body: id //we only need id to delete todo item
            }),
            invalidatesTags: ['Todos']
        }),

    })
})

// RTK query automatically creates cutom hooks for methods in endpoints
// these hooks can be use by the components
export const {
    useGetTodosQuery, //this is hook generated from method getTodos query
    useAddTodoMutation, //hook generated from addTodo mutation
    useUpdateTodoMutation, //hook generated from updateTodo mutation
    useDeleteTodoMutation //hook generated from deleteTodo mutation
} = apiSlice //get those custom hooks from apiSlice that is created above
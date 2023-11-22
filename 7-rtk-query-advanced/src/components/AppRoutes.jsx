import { Routes, Route, Navigate } from 'react-router-dom'
//components
import Layout from './Layout'
import PostsList from './PostsList'
import AddPostForm from './AddPostForm'
import SinglePostPage from './SinglePostPage'
import EditPostForm from './EditPostForm'
import UsersList from './UsersList'
import UserPage from './UserPage'

const AppRoutes = () => {
    return (
        <Routes>
            //parent route
            <Route path='/' element={<Layout />}>
                //children routes
                //index keyword means this is the default page of Layout.
                <Route index element={<PostsList />} />

                //nested routing for post
                <Route path='post'>
                    //index keyword means this is the default page of post route.
                    <Route index element={<AddPostForm />} />
                    //route with params
                    <Route path=':postId' element={<SinglePostPage />} />
                    <Route path='edit/:postId' element={<EditPostForm />} />
                </Route>

                //nested routing for user
                <Route path='user'>
                    //index keyword means this is the default page of user route.
                    <Route index element={<UsersList />} />
                    //route with params
                    <Route path=':userId' element={<UserPage />} />
                </Route>

                {/* Catch all - replace with 404 component if you want */}
                <Route path='*' element={<Navigate to='/' replace />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
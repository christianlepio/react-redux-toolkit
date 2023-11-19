import { Routes, Route } from 'react-router-dom'
//components
import Layout from './Layout'
import PostsList from './PostsList'
import AddPostForm from './AddPostForm'
import SinglePostPage from './SinglePostPage'
import EditPostForm from './EditPostForm'

const AppRoutes = () => {
    return (
        <Routes>
            //parent route
            <Route path='/' element={<Layout />}>
                //children routes
                //index keyword means this is the default page of Layout.
                <Route index element={<PostsList />} />

                //nested routing
                <Route path='post'>
                    //index keyword means this is the default page of post route.
                    <Route index element={<AddPostForm />} />
                    //route with params
                    <Route path=':postId' element={<SinglePostPage />} />
                    <Route path='edit/:postId' element={<EditPostForm />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes
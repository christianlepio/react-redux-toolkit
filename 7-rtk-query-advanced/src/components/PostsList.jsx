//useSelector here is to get global state variable from store
import { useSelector } from 'react-redux'
import { selectPostIds } from '../features/posts/postsSlice'
//generated custom hooks from extended api slice (RTK query)
import { useGetPostsQuery } from '../features/posts/postsSlice'
//components
import PostsExcerpt from './PostsExcerpt'

const PostsList = () => {
    //variables from generated custom hooks of RTK query
    const {
        isLoading, //returns boolean
        isSuccess, //returns boolean
        isError,  //returns boolean
        error //returns error message
    } = useGetPostsQuery()

    //get posts ids from store
                                    //state => state.posts
    const orderedPostIds = useSelector(selectPostIds)

    //initialize content
    let content 
    //check all possibilities of postStatus
    if (isLoading) {
        content = <p className='fs-2 text-center'>Loading...</p>
    } else if (isSuccess) {
        // orderedPostIds is already sorted by date because sortComparer function in postsAdapter
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (isError) {
        content = <p className='fs-2 text-center'>{error}</p>
    }

    return (
        <section>
            <h2 className='fs-2 mb-4'>Posts</h2>
            {orderedPostIds.length > 0 ? content : (<p className='fs-3 text-center'>No posts to load...</p>)}
        </section>
    )
}

export default PostsList
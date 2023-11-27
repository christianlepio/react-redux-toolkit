//generated custom hooks from extended api slice endpoint (RTK query)
import { useGetPostsQuery } from '../features/posts/postsSlice'
//components
import PostsExcerpt from './PostsExcerpt'

const PostsList = () => {
    //variables from generated custom hooks of RTK query
    const {
        data: posts, //returns normalized state (ids & entities)
        isLoading, //returns boolean
        isSuccess, //returns boolean
        isError,  //returns boolean
        error //returns error message
    } = useGetPostsQuery('getPosts') //getPosts is an endpoint

    //initialize content & postsIdslength
    let content//, postsIdslength
    //check all possibilities of postStatus
    if (isLoading) {
        content = <p className='fs-2 text-center'>Loading...</p>
    } else if (isSuccess) {
        // posts.ids is already sorted by date because sortComparer function in postsAdapter
        content = posts.ids.map(postId => <PostsExcerpt key={postId} postId={postId} />)
        // postsIdslength = posts.ids.length
    } else if (isError) {
        content = <p className='fs-2 text-center'>{error}</p>
    }

    return (
        <section>
            <h2 className='fs-2 mb-4'>Posts</h2>
            {content}
            {/* {
                postsIdslength > 0 
                    ? content 
                    : (<p className='fs-3 text-center'>No posts to load...</p>)
            } */}
        </section>
    )
}

export default PostsList
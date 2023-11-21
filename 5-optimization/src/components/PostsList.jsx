//useSelector here is to get global state variable from store
import { useSelector } from 'react-redux'
import { 
    selectPostIds, 
    getPostsStatus, 
    getPostsError
} from '../features/posts/postsSlice'

import PostsExcerpt from './PostsExcerpt'

const PostsList = () => {
    //get posts ids from store
                                    //state => state.posts
    const orderedPostIds = useSelector(selectPostIds)
    // console.log('orderedPostIds: ', orderedPostIds)

    const postStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)

    //initialize content
    let content 
    //check all possibilities of postStatus
    if (postStatus === 'loading') {
        content = <p className='fs-2 text-center'>Loading...</p>
    } else if (postStatus === 'succeeded') {
        // orderedPostIds is already sorted by date because sortComparer function in postsAdapter
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (postStatus === 'failed') {
        content = <p className='fs-2 text-center'>{error}</p>
    }

    return (
        <section>
            <h2 className='fs-2 mb-4'>Posts</h2>
            {content}
        </section>
    )
}

export default PostsList
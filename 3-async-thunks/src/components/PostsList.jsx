//useSelector here is to get global state variable from store
//useDispatch is to call/use global actions from postsSlice
import { useSelector, useDispatch } from 'react-redux'
import { 
    selectAllPosts, 
    getPostsStatus, 
    getPostsError, 
    fetchPosts 
} from '../features/posts/postsSlice'

import { useEffect } from 'react'
import PostsExcerpt from './PostsExcerpt'

const PostsList = () => {
    //initialize dispatch
    const dispatch = useDispatch()

    //get posts from store
                            //state => state.posts
    const posts = useSelector(selectAllPosts)
    const postStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)

    useEffect(() => {
        //go and fetch posts from fake api when post status is idle
        if (postStatus === 'idle') {
            //call fetchPosts() inside dispatch
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    //initialize content
    let content 
    //check all possibilities of postStatus
    if (postStatus === 'loading') {
        content = <p className='fs-2 text-center'>Loading...</p>
    } else if (postStatus === 'succeeded') {
        //sort posts descending by date
        const sortedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

        //mapping all the posts and creating an article 
        content = sortedPosts.map(post => <PostsExcerpt key={post.id} post={post}/>)
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
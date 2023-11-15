//useSelector here is to get global state variable from store
import { useSelector } from 'react-redux'
import { selectAllPosts } from '../features/posts/postsSlice'

const PostsList = () => {
    //get posts from store
                            //state => state.posts
    const posts = useSelector(selectAllPosts)

    //mapping all the posts and creating an article 
    const renderedPosts = posts.map(post => (
        <article className='border rounded-4 my-3 p-4' key={post.id}>
            <h3 className='fs-3'>{post.title}</h3>
            <p className='fs-6'>{post.content.substring(0, 100)}</p>
        </article>
    ))

    return (
        <section>
            <h2 className='fs-2 mb-4'>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostsList
//components
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const PostsExcerpt = ({ post }) => {
    return (
        <article className='border rounded-4 my-3 p-4'>
            <h3 className='fs-3'>{post.title}</h3>
            <p className='fs-6'>{post.body.substring(0, 100)}</p>
            <p className='fs-6'>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default PostsExcerpt
import { Link } from 'react-router-dom'
//components
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const PostsExcerpt = ({ post }) => {
    return (
        <article className='border shadow-sm rounded-3 my-3 p-4'>
            <h3 className='fs-3'>{post.title}</h3>
            <p className='fs-6'>{post.body.substring(0, 50)}...</p>
            <p className='fs-6'>
                <Link to={`post/${post.id}`} className='link-opacity-50-hover'>View Post</Link>&nbsp;
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default PostsExcerpt
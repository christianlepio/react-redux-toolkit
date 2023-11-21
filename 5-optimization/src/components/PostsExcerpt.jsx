//this is required for React.memo
// import React from 'react'
import { Link } from 'react-router-dom'
//components
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

import { useSelector } from 'react-redux'
import { selectPostById } from '../features/posts/postsSlice'

//change this to 'let', other way to avoid re-rendering
const PostsExcerpt = ({ postId }) => {
    //get specific post by prop postId
    const post = useSelector(state => selectPostById(state, postId))

    return (
        <>
            {
                post ? 
                    (
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
                    ) : 
                    null
            }
        </>
    )
}

//this allows this component to not re-render when the prop 'post' is not changed
//other way to avoid re-rendering
// PostsExcerpt = React.memo(PostsExcerpt)

export default PostsExcerpt
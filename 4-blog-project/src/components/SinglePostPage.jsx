import { Link, useNavigate } from "react-router-dom"
//useSelector here is to get global state variable from store
//useDispatch is to call/use global actions from postsSlice
import { useSelector, useDispatch } from "react-redux"
import { selectPostById } from "../features/posts/postsSlice"
import { deletePost } from "../features/posts/postsSlice"

//components
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

//hook to get parameter in route path (url)
import { useParams } from 'react-router-dom'

const SinglePostPage = () => {
    //initialize navigate hook
    const navigate = useNavigate()
    //initialize dispatch
    const dispatch = useDispatch()
    //get post id parameter from url 
    const { postId } = useParams()

    //get speific post by ID
    const post = useSelector(state => selectPostById(state, Number(postId)))

    const onDeletePostClicked = () => {
        try {
            //call deletePost function inside dispatch
            //pass all required parameter value to deletePost function
            //use unwrap which throws an error and lets you catch the error
            //this lets the promise either reject/creates an error and allow to use try catch logic
            dispatch(deletePost({ id: post.id })).unwrap()
            //navigate to home page
            navigate('/')
        } catch (err) {
            console.error('Failed to delete post: ', err)
        }
    }

    if (!post) {
        return (
            <section>
                <h2 className="fs-2 mt-5 text-center">Post not found!</h2>
            </section>
        )
    }

    return (
        <article className='border rounded-4 my-3 p-4 mt-5'>
            <h3 className='fs-3'>{post.title}</h3>
            <p className='fs-6'>{post.body}</p>
            <p className='fs-6'>
                <Link to={`/post/edit/${post.id}`} className="link-opacity-50-hover">Edit Post</Link>&nbsp; / <a type='button' className="link-opacity-50-hover" onClick={onDeletePostClicked}>Delete Post</a>&nbsp;
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default SinglePostPage
import { Link, useNavigate } from "react-router-dom"
//generated custom hooks from extended api slice endpoint (RTK query)
import { useGetPostsQuery } from "../features/posts/postsSlice"

//components
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

//hook to get parameter in route path (url)
import { useParams } from 'react-router-dom'

//generated custom hooks from extended api slice (RTK query)
import { useDeletePostMutation } from "../features/posts/postsSlice"

const SinglePostPage = () => {
    //initialize RTK query custom hooks mutation.
    const [deletePost] = useDeletePostMutation()
    //initialize navigate hook
    const navigate = useNavigate()
    //get post id parameter from url 
    const { postId } = useParams()

    //get speific post by ID
    const {
        //define variables to be supplied
        post,
        isLoading //returns boolean
    } = useGetPostsQuery('getPosts', {
        //supply destructured variables above using selectFromResult
        selectFromResult: ({ data, isLoading }) => ({
            //get specific post by postId from data.entities
            post: data?.entities[postId],
            isLoading //returns boolean to variable above here
        })
    })

    const onDeletePostClicked = async () => {
        try {
            //call deletePost function
            //pass all required parameter value to deletePost function
            //use unwrap which throws an error and lets you catch the error
            //this lets the promise either reject/creates an error and allow to use try catch logic
            await deletePost({ id: post.id }).unwrap()
            //navigate to home page
            navigate('/')
        } catch (err) {
            console.error('Failed to delete post: ', err)
        }
    }

    if (isLoading) {
        return <p className='fs-2 text-center'>Loading...</p>
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
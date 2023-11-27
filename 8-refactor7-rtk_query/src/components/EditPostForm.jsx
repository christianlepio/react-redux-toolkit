import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
//generated custom hooks from extended api slice endpoint (RTK query)
import { useUpdatepostMutation } from "../features/posts/postsSlice"
import { useGetPostsQuery } from "../features/posts/postsSlice"
//generated custom hooks from users api slice endpoint (RTK query)
import { useFetchUsersQuery } from "../features/users/usersSlice"

const EditPostForm = () => {
    //initialize RTK query custom hooks mutation, also get isLoading variable.
    const [updatePost, { isLoading }] = useUpdatepostMutation()

    //get post id parameter from url
    const { postId } = useParams()
    //initialize navigate hook
    const navigate = useNavigate()

    //get speific post by ID
    const { 
        //define variables to be supplied
        post,  
        isLoading: isLoadingPosts, //returns boolean
        isSuccess //returns boolean
    } = useGetPostsQuery('getPosts', {
        //supply destructured variables above using selectFromResult
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            //get specific post by postId from data.entities
            post: data?.entities[postId],
            isLoading, //returns boolean to isLoadingPosts
            isSuccess //returns boolean
        })
    })

    //get all users
    const { 
        data: users, //returns all fetched users
        isSuccess: isSuccessUsers, //returns boolean
     } = useFetchUsersQuery('fetchUsers') //fetchUsers here is an endpoint

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(Number(e.target.value))

    useEffect(() => {
        //if fetching post by id success
        if (isSuccess) {
            setTitle(post.title)
            setContent(post.body)
            setUserId(post.userId)
        }
    }, [isSuccess, post?.title, post?.body, post?.userId])

    //check if title, content, userId are all true && requestStatus === 'idle'
    //will return true/false for save button disabling
    const canSave = [title, content, userId].every(Boolean) && !isLoading

    const onUpdatePostClicked = async (e) => {
        e.preventDefault()

        //check if user is allowed to edit post
        if (canSave) {
            try {
                //call updatePost function
                //pass all required parameter value to updatePost function
                await updatePost({
                    id: post.id, 
                    title,
                    body: content,
                    userId//,
                    // reactions: post.reactions
                }).unwrap()
                //use unwrap which throws an error and lets you catch the error
                //this lets the promise either reject/creates an error and allow to use try catch logic

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`) //navigate to previous page

            } catch (err) {
                console.error('Failed to update post: ', err)
            } 
        }
    }

    //if fetching post by specific id is loading
    if (isLoadingPosts) {
        return (
            <section>
                <h2 className="fs-2 mt-5 text-center">Loading...</h2>
            </section>
        )
    }

    if (!post) {
        return (
            <section>
                <h2 className="fs-2 mt-5 text-center">Post not found!</h2>
            </section>
        )
    }

    //map all users to option value
    let userOptions
    //check if fetching users success
    if (isSuccessUsers) {
        //map all users ids
        userOptions = users.ids.map(id => (
            <option key={id} value={id}>
                {/* call users name from entities with index of id */}
                {users.entities[id].name}
            </option>
        ))
    }

    return (
        <section className="mb-5">
            <h2 className="mb-3">Edit Post</h2>
            <form onSubmit={onUpdatePostClicked}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Title:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleFormControlInput1" 
                        placeholder="Post title" 
                        value={title}
                        onChange={onTitleChanged}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="selectInput" className="form-label">Author:</label>
                    <select 
                        id="selectInput"
                        className="form-select" 
                        aria-label="Default select example"
                        value={userId}
                        onChange={onAuthorChanged}
                    >
                        <option value=""></option>
                        {userOptions}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Content:</label>
                    <textarea 
                        className="form-control" 
                        id="exampleFormControlTextarea1" 
                        rows="4"
                        value={content}
                        onChange={onContentChanged}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <button 
                        className="btn btn-success"
                        type="submit"
                        disabled={!canSave}
                    >
                        Update Post
                    </button>
                </div>
            </form>
        </section>
    )
}

export default EditPostForm
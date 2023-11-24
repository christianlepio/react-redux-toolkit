import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectPostById } from "../features/posts/postsSlice"

import { selectAllUsers } from "../features/users/usersSlice"

//generated custom hooks from extended api slice (RTK query)
import { useUpdatepostMutation } from "../features/posts/postsSlice"

const EditPostForm = () => {
    //initialize RTK query custom hooks mutation, also get isLoading variable.
    const [updatePost, { isLoading }] = useUpdatepostMutation()

    //get post id parameter from url
    const { postId } = useParams()
    //initialize navigate hook
    const navigate = useNavigate()

    //get speific post by ID
    const post = useSelector(state => selectPostById(state, Number(postId)))
    //get all users
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(Number(e.target.value))

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

    if (!post) {
        return (
            <section>
                <h2 className="fs-2 mt-5 text-center">Post not found!</h2>
            </section>
        )
    }

    //map all users to option value
    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

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
                        defaultValue={userId}
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
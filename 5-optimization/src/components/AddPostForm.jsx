import { useState } from "react"
import { useNavigate } from "react-router-dom"
//useDispatch is to call/use global actions from postsSlice
import { useDispatch, useSelector } from "react-redux"

import { addNewPost } from "../features/posts/postsSlice"
import { selectAllUsers } from "../features/users/usersSlice"

const AddPostForm = () => {
    //initialize navigation hook
    const navigate = useNavigate()
    //initialize dispatch
    const dispatch = useDispatch()
    //get all users
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(Number(e.target.value))

    //check if title, content, userId are all true && addRequestStatus === 'idle'
    //will return true/false for save button disabling
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const onSavePostClicked = (e) => {
        e.preventDefault()

        //check if user is allowed to save new post
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                //call addNewPost function inside dispatch
                //pass all required parameter value to addNewPost function
                dispatch(
                    addNewPost({ title, body: content, userId })
                ).unwrap() //use unwrap which throws an error and lets you catch the error
                           //this lets the promise either reject/creates an error and allow to use try catch logic

                setTitle('')
                setContent('')
                setUserId('')
                navigate('/') //navigate to home page

            } catch (err) {
                console.error('Failed to save the post: ', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    //map all users to option value
    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))
    

    return (
        <section className="mb-5">
            <h2 className="mb-3">Add New Post</h2>
            <form onSubmit={onSavePostClicked}>
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
                        Save Post
                    </button>
                </div>
            </form>
        </section>
    )
}

export default AddPostForm
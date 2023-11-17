import { useState } from "react"
//useDispatch is to call/use global actions from postsSlice
import { useDispatch, useSelector } from "react-redux"

import { postAdded } from "../features/posts/postsSlice"
import { selectAllUsers } from "../features/users/usersSlice"

const AddPostForm = () => {
    //initialize dispatch
    const dispatch = useDispatch()
    //get all users
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(e.target.value)

    const onSavePostClicked = (e) => {
        e.preventDefault()

        //check if title, content, userid is not null
        if (title && content && userId) {
            //call postAdded action inside dispatch
            //pass all required parameter value to postAdded action
            dispatch(
                postAdded(title, content, userId)
            )

            setTitle('')
            setContent('')
            setUserId('')
        }
    }

    //map all users to option value
    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))
    
    //will return true/false for save button disabling
    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

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
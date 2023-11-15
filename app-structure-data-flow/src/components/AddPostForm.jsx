import { useState } from "react"
//useDispatch is to call/use global actions from counterSlice
import { useDispatch } from "react-redux"

import { postAdded } from "../features/posts/postsSlice"

const AddPostForm = () => {
    //initialize dispatch
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)

    const onSavePostClicked = (e) => {
        e.preventDefault()

        if (title && content) {
            //call postAdded action inside dispatch
            //pass all required parameter value to postAdded action
            dispatch(
                postAdded(title, content)
            )

            setTitle('')
            setContent('')
        }
    }

    return (
        <section className="mb-5">
            <h2>Add New Post</h2>
            <form onSubmit={onSavePostClicked}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Post title:</label>
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
                    >
                        Save Post
                    </button>
                </div>
            </form>
        </section>
    )
}

export default AddPostForm
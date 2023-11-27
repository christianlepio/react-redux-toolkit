import { useState } from "react"
import { useNavigate } from "react-router-dom"
//generated custom hooks from extended api slice (RTK query)
import { useAddNewPostMutation } from "../features/posts/postsSlice"
//generated custom hook from users api slice endpoint
import { useFetchUsersQuery } from "../features/users/usersSlice"

const AddPostForm = () => {
    //initialize RTK query custom hooks mutation, also get isLoading variable.
    const [addNewPost, { isLoading }] = useAddNewPostMutation()

    //initialize navigation hook
    const navigate = useNavigate()
    
    //get all users
    //variables from generated custom hooks of RTK query
    const { 
        data: users, //get all users from data
        isSuccess //returns boolean
    } = useFetchUsersQuery('fetchUsers')

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(Number(e.target.value))

    //check if title, content, userId are all true && not loading
    //will return true/false for save button disabling
    const canSave = [title, content, userId].every(Boolean) && !isLoading

    const onSavePostClicked = async (e) => {
        e.preventDefault()

        //check if user is allowed to save new post
        if (canSave) {
            try {
                //call addNewPost function
                //pass all required parameter value to addNewPost function
                await addNewPost({ title, body: content, userId }).unwrap()
                //use unwrap which throws an error and lets you catch the error
                //this lets the promise either reject/creates an error and allow to use try catch logic

                setTitle('')
                setContent('')
                setUserId('')
                navigate('/') //navigate to home page

            } catch (err) {
                console.error('Failed to save the post: ', err)
            }
        }
    }

    let userOptions
    //check if fetching users success
    if (isSuccess) {
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
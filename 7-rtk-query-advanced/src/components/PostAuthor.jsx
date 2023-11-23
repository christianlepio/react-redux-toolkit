//useSelector here is to get global state variable from store
import { useSelector } from "react-redux"
import { selectAllUsers } from "../features/users/usersSlice"
import { Link } from "react-router-dom"

const PostAuthor = ({ userId }) => {
    //get users from store
                            //state => state.users
    const users = useSelector(selectAllUsers)

    //find/get specific user by its id
    const author = users.find(user => user.id === userId)

    return (
        <span>by {author 
                    ? <Link to={`/user/${userId}`}>{author.name}</Link> 
                    : 'Unknown Author'}</span>
    )
}

export default PostAuthor
import { Link } from "react-router-dom"
//generated custom hooks from users api slice endpoint (RTK query)
import { useFetchUsersQuery } from "../features/users/usersSlice"

const PostAuthor = ({ userId }) => {
    //find/get specific user by its prop userid
    const { 
        //define variable to supplied
        specificUser: author 
    } = useFetchUsersQuery('fetchUsers', {
        //supply defined variable above by using selectFromResult
        selectFromResult: ({ data }) => ({
            //get specific user by its prop userid from data entities
            specificUser: data?.entities[userId]
        })
    })
    // const author = users.find(user => user.id === userId)

    return (
        <span>by {author 
                    ? <Link to={`/user/${userId}`}>{author.name}</Link> 
                    : 'Unknown Author'}
        </span>
    )
}

export default PostAuthor
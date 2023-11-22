//useSelector here is to get global state variable from store
import { useSelector } from "react-redux"
import { selectUserById } from "../features/users/usersSlice"
import { selectAllPosts, selectPostbyUser } from "../features/posts/postsSlice"
import { Link, useParams } from "react-router-dom"

const UserPage = () => {
    //get user id parameter from url
    const { userId } = useParams()

    //get specific user by id
    const user = useSelector(state => selectUserById(state, Number(userId)))

    //get all posts for specific user
    //this will return memoized data to avoid re-rendering that will affect to it's performance
    const postsForUser = useSelector(state => selectPostbyUser(state, Number(userId)))
    
    //map postsForUser and get all post titles
    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section>
            <h2 className="fs-2">{user.name}</h2>
            <ol>
                {postTitles}
            </ol>
        </section>
    )
}

export default UserPage
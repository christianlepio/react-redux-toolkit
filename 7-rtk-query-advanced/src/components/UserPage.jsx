//useSelector here is to get global state variable from store
import { useSelector } from "react-redux"
import { selectUserById } from "../features/users/usersSlice"
import { Link, useParams } from "react-router-dom"

//generated custom hooks from extended api slice (RTK query)
import { useGetPostsByUserIdQuery } from "../features/posts/postsSlice"

const UserPage = () => {
    //get user id parameter from url
    const { userId } = useParams()

    //get specific user by id
    const user = useSelector(state => selectUserById(state, Number(userId)))

    //get all posts for specific user (postsForUser)
    //this will return memoized data to avoid re-rendering that will affect to it's performance
    const {
        //variables from generated custom hooks of RTK query
        data: postsForUser, 
        isLoading, //returns boolean
        isSuccess, //returns boolean
        isError, //returns boolean
        error //returns error message
    } = useGetPostsByUserIdQuery(userId)

    let content
    if (isLoading) {
        content = <p className='fs-2 text-center'>Loading...</p>
    } else if (isSuccess) {
        //if request is success get ids and entities from postsForUser
        //ids, entities == normalized state
        const { ids, entities } = postsForUser
        
        //map all ids and use it as index of entities to get the title property then assign it as content
        content = ids.map(id => (
            <li key={id}>
                <Link to={`/post/${id}`}>{entities[id].title}</Link>
            </li>
        ))
    } else if (isError) {
        content = <p className='fs-2 text-center'>{error}</p>
    }

    return (
        <section>
            <h2 className="fs-2">{user.name}</h2>
            <ol>
                {content}
            </ol>
        </section>
    )
}

export default UserPage
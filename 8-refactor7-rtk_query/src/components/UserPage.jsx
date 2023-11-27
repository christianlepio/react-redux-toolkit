import { Link, useParams } from "react-router-dom"
//generated custom hooks from extended api slice endpoint (RTK query)
import { useGetPostsByUserIdQuery } from "../features/posts/postsSlice"
//generated custom hooks from users api slice endpoint (RTK query)
import { useFetchUsersQuery } from "../features/users/usersSlice"

const UserPage = () => {
    //get user id parameter from url
    const { userId } = useParams()

    //get specific user by id
    const {
        //define variables to be supplied
        user,
        isLoading: isLoadingUser, //returns boolean
        isSuccess: isSuccessUser, //returns boolean
        isError: isErrorUser, //returns boolean
        error: errorUser //returns error message
    } = useFetchUsersQuery('fetchUsers', {
        //supply destructured variables above using selectFromResult
        selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
            //get specific user by userId from data.entities
            user: data?.entities[userId],
            isLoading, //returns boolean to isLoadingUser
            isSuccess, //returns boolean to isSuccessUser
            isError, //returns boolean to isErrorUser
            error //returns error message to errorUser
        })
    })

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
    if (isLoading || isLoadingUser) {
        content = <p className='fs-2 text-center'>Loading...</p>
    } else if (isSuccess || isSuccessUser) {
        //if request is success get ids and entities from postsForUser
        //ids, entities == normalized state
        const { ids, entities } = postsForUser
        
        //map all ids and use it as index of entities to get the title property then assign it as content
        content = ids.map(id => (
            <li key={id}>
                <Link to={`/post/${id}`}>{entities[id].title}</Link>
            </li>
        ))
    } else if (isError || isErrorUser) {
        content = <p className='fs-2 text-center'>{error || errorUser}</p>
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
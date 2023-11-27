import { Link } from "react-router-dom"
//generated custom hooks from users api slice endpoint (RTK query)
import { useFetchUsersQuery } from "../features/users/usersSlice"

const UsersList = () => {
    //get all users
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useFetchUsersQuery('fetchUsers') //fetchUsers here is an endpoint

    let content
    if (isLoading) {
        content = (
            <section>
                <h2 className="fs-2 mt-5 text-center">Loading...</h2>
            </section>
        )
    } else if (isSuccess) {
        //map all users ids
        const renderedUsers = users.ids.map(id => (
            <li key={id}>
                {/* call users name from entities with index of id */}
                <Link to={`/user/${id}`}>{users.entities[id].name}</Link>
            </li>
        ))
        content = (
            <section>
                <h2 className="fs-2">Users</h2>
                <ul>
                    {renderedUsers}
                </ul>
            </section>
        )
    } else if (isError) {
        content = (
            <section>
                <h2 className="fs-2 mt-5 text-center">{error}</h2>
            </section>
        )
    }

    return content
}

export default UsersList
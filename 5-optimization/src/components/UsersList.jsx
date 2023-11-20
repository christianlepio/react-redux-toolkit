//useSelector here is to get global state variable from store
import { useSelector } from "react-redux"
import { selectAllUsers } from "../features/users/usersSlice"
import { Link } from "react-router-dom"

const UsersList = () => {
    //get all users
    const users = useSelector(selectAllUsers)

    //map all users to list
    const renderedUsers = users.map(user => (
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))

    return (
        <section>
            <h2 className="fs-2">Users</h2>
            <ul>
                {renderedUsers}
            </ul>
        </section>
    )
}

export default UsersList
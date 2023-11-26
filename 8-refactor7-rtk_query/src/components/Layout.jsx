import { Outlet } from "react-router-dom"
//component
import Navbar from "./Navbar"

const Layout = () => {
    return (
        <>
            <Navbar />
            <main className="container mt-5">
                <div className="d-block justify-content-center mx-5 px-5">
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default Layout
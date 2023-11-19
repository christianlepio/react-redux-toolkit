import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand mb-0">
                        <h1>Blogs</h1>
                    </Link>

                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div 
                        className="collapse navbar-collapse" 
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link active" aria-current="page">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='post' className="nav-link active" aria-current="page">
                                    Post
                                </Link>
                            </li>
                        </ul>                        
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
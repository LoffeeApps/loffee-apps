import { Link, useNavigate } from "react-router-dom"

export const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    if (localStorage.getItem('token')) {
        return (
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgb(24, 24, 24)", color: "rgb(231, 231, 231)" }}>
                <div className="container mb-1" style={{backgroundColor: "transparent"}}>
                    <div className="nav-item">
                        <img className="" src="https://media.discordapp.net/attachments/1176431420575592460/1176746122933456956/Untitled_design-removebg-preview.png?ex=656ffd3a&is=655d883a&hm=f7c436703177bcda8ca608b027fcd9209777f2e6d0c9a37d47cc69e934724bda&=&format=webp&width=468&height=468" style={{width: "120px"}} alt="logo" />
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <Link to="/" className="nav-link text-light" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link to="/chat" className="nav-link text-light" aria-current="page">Chat</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link to="/friends" className="nav-link text-light" aria-current="page">Friend</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex nav-item">

                        <button onClick={handleLogout} className="submitButton"  aria-current="page">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        )
    }

    return (
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgb(24, 24, 24)", color: "rgb(231, 231, 231)" }}>
                <div className="container mb-1">
                    <div className="nav-item">
                        <img src="https://i.imgur.com/xWgz4We.png" style={{width: "120px"}} alt="logo" />
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <Link to="/" className="nav-link text-light" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link to="/chat" className="nav-link text-light" aria-current="page">Chat</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link to="/friends" className="nav-link text-light" aria-current="page">Friend</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex nav-item">
                    <Link to="/login" className="btn submitButton">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    )

}
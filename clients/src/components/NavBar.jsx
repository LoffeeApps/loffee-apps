import logos from '../assets/logos.png'
function Navbar() {
    return (
        <>
            <div className="nav-bar">
                <div className="container">
                
                    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                        <a href="#" className="navbar-brand">MENU</a>
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <img src={logos} className='top-bar'/>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto">
                           
                                <a href="#" className="nav-item nav-link ">Home</a>
                                <a href="" className="nav-item nav-link">About</a>
                                <a href="contact.html" className="nav-item nav-link">Contact</a>
                             
                            </div>
                            <div className="ml-auto">
                                <a className="btn btn-custom" href="#">Play Game</a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
export default Navbar
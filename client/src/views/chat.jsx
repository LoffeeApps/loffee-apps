import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const Chat = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [userLogin, setUserLogin] = useState('')

    const fetchUser = async () => {
        try {
            const { data } = await axios({
                method: "GET",
                url: "http://localhost:3000/convo",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setUsers(data.convo)
            setUserLogin(data.username)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    if(loading) {
        return <h2>Loading</h2>
    }

    return (
        <>
            <div className="container mt-3">
                <div className="row h-100">
                    <div id="carouselExampleAutoplaying" className="carousel slide mx-3 mt-3" data-bs-ride="carousel">
                        <div className="d-flex">
                            <div className="col-md-3" style={{ position: "relative" }}>
                                <div>
                                    <ul className="list-group">
                                        {users.map(el => (
                                            <Link key={el.id} to={`/convo/${el.id}`} className="list-group-item">{el.ReceiverId.username === userLogin ? el.SenderId.username : el.ReceiverId.username}</Link>
                                        ))}

                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-9 me-3">
                                <div className="carousel-inner mb-3 pe-3">
                                    <div className="carousel-item active">
                                        <img src="https://i.imgur.com/Zmxio2G.jpg" className="d-block w-100" alt="overwatch" />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5 style={{ fontWeight: "bold" }}>Overwatch 2</h5>
                                            <p>Team up with friends regardless of platform and jump into the reimagined PvP experience.</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://i.imgur.com/IGzvjRV.jpg" className="d-block w-100" alt="dota2" />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5 style={{ fontWeight: "bold" }}>Dota 2</h5>
                                            <p>A Modern Multiplayer Masterpeace.</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://i.imgur.com/E78rIt6.jpg" className="d-block w-100" alt="genshin" />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5 style={{ fontWeight: "bold" }}>Genshin Impact</h5>
                                            <p>Teach The Weeboo Save the World.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "../components/navbar"
import Swal from 'sweetalert2'

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
            Swal.fire({
                title: 'Error!',
                text: error.response.data,
                icon: 'error',
                confirmButtonText: 'Cool'
              })
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
        <Navbar/>
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
                                        <img src="https://i0.wp.com/tintaresah.com/wp-content/uploads/2022/07/Horimiya-Season-2.webp?fit=1920%2C1080&ssl=1" className="d-block w-100" alt="overwatch" />
                                        <div className="carousel-caption d-none d-md-block">
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

import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function ChatEx() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [userLogin, setUserLogin] = useState('')

    const fetchUser = async () => {
        try {
            const { data } = await axios({
                method: "GET",
                url: "http://localhost:3000/convo",
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('token')}`
                // }
            })
            console.log(data)
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

    if (loading) {
        return <h2>Loading</h2>
    }


    return (

        <section style={{ backgroundColor: "#CDC4F9" }}>
            <div class="container py-5">

                <div class="row">
                    <div class="col-md-12">

                        <div class="card" id="chat3" style={{ borderRadius: "5px" }}>
                            <div class="card-body">

                                <div class="row">
                                    <div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">

                                        <div class="p-4">

                                            <div data-mdb-perfect-scrollbar="true" style={{ position: "relative", height: "480px", overflowY: "auto" }}>

                                                <ul class="list-unstyled mb-0">

                                                    {users.map(el => (
                                                        <li key={el.id} class="p-2 border-bottom">
                                                            <a href="#!" class="d-flex justify-content-between">
                                                                <div class="d-flex flex-row">
                                                                    <div>
                                                                        <img
                                                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                                            alt="avatar" class="d-flex align-self-center me-3" width="60" />
                                                                        <span class="badge bg-success badge-dot"></span>
                                                                    </div>
                                                                    <div class="pt-1">
                                                                        <p class="fw-bold mb-0">{el.ReceiverId.username === userLogin ? el.SenderId.username : el.ReceiverId.username}</p>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    ))}

                                                </ul>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="col-md-6 col-lg-7 col-xl-8">

                                        <div class="pt-3 pe-3" data-mdb-perfect-scrollbar="true"
                                            style={{ position: "relative", height: "500px", overflowY: "auto" }}>

                                            <div class="d-flex flex-row justify-content-start">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                                    alt="avatar 1" style={{ width: "45px", height: "100%" }} />
                                                <div>
                                                    <p class="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: "#f5f6f7" }}>Lorem ipsum
                                                        dolor
                                                        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                                        dolore
                                                        magna aliqua.</p>
                                                    <p class="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                                                </div>
                                            </div>


                                            {/* <div class="d-flex flex-row justify-content-end">
                                        <div>
                                            <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">Excepteur sint occaecat
                                                cupidatat
                                                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            <p class="small me-3 mb-3 rounded-3 text-muted">12:00 PM | Aug 13</p>
                                        </div>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="avatar 1" style={{ width: "45px", height: "100%" }} />
                                    </div> */}

                                        </div>

                                        <div class="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                                alt="avatar 3" style={{ width: "40px", height: "100%" }} />
                                            <input type="text" class="form-control form-control-lg" id="exampleFormControlInput2"
                                                placeholder="Type message" />
                                            <a class="ms-3" href="#!"><i class="fas fa-paper-plane"></i></a>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
} 
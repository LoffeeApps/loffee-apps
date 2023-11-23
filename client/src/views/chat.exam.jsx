
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client";

export default function ChatEx() {
    const [convo, setConvo] = useState([])
    const [convos, setConvos] = useState([])
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
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
        getConvo()
    }, [])

    const getConvo = async () => {
        try {
            const { data } = await axios({
                method: "GET",
                url: `http://localhost:3000/convo/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setConvo(data)
            setConvos(data.convo)
            setMessages(data.convo.Messages)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    
    const handleMessage = async (e) => {
        e.preventDefault()
        try {
            socket.emit("sendMessage", {
                userId1: convo.username,
                message: message
            })

            setMessages([...messages, {
                userId1: convo.username,
                message: message
            }])

            setMessage("")
            const { data } = await axios({
                method: 'POST',
                url: `http://localhost:3000/message/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    message
                }
            })

            getConvo()
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     getConvo()
    // },[])

    useEffect(() => {
        const socket = io('http://localhost:3000')
        setSocket(socket)

        socket.on('new-message', (payload) => {
            setMessages([...messages, payload])
            console.log(messages)
        })
    }, [])

    


    if(loading) {
        return <h2>Loading</h2>
    }


    return (

        <section style={{ backgroundColor: "#CDC4F9" }}>
            <div className="container py-5">

                <div className="row">
                    <div className="col-md-12">

                        <div className="card" id="chat3" style={{ borderRadius: "5px" }}>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">

                                        <div className="p-4">

                                            <div data-mdb-perfect-scrollbar="true" style={{ position: "relative", height: "480px", overflowY: "auto" }}>

                                                <ul className="list-unstyled mb-0">

                                                    {users.map(el => (
                                                        <li key={el.id} className="p-2 border-bottom">
                                                            <a href="#!" className="d-flex justify-content-between">
                                                                <div className="d-flex flex-row">
                                                                    <div>
                                                                        <img
                                                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                                            alt="avatar" className="d-flex align-self-center me-3" width="60" />
                                                                        <span className="badge bg-success badge-dot"></span>
                                                                    </div>
                                                                    <div className="pt-1">
                                                                        <p className="fw-bold mb-0" style={{color: "white"}}>{el.ReceiverId.username === userLogin ? el.SenderId.username : el.ReceiverId.username}</p>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    ))}

                                                </ul>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-md-6 col-lg-7 col-xl-8">

                                        <div className="pt-3 pe-3" data-mdb-perfect-scrollbar="true"
                                            style={{ position: "relative", height: "500px", overflowY: "auto" }}>

                                            {messages.length > 0?  messages.map(el => (
                                            <div className="d-flex flex-row justify-content-start">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                                    alt="avatar 1" style={{ width: "45px", height: "100%" }} />
                                                <div>
                                                    <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: "#f5f6f7" ,color: 'black'}}>
                                                        {el.message}
                                                    </p>
                                                    </div>
                                            </div>
                                            )) : <p>No message</p>}

                                            {/* <div className="d-flex flex-row justify-content-end">
                                        <div>
                                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">Excepteur sint occaecat
                                                cupidatat
                                                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            <p className="small me-3 mb-3 rounded-3 text-muted">12:00 PM | Aug 13</p>
                                        </div>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="avatar 1" style={{ width: "45px", height: "100%" }} />
                                    </div> */}

                                        </div>
                                        <form onSubmit={handleMessage}>
                                        <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                                alt="avatar 3" style={{ width: "40px", height: "100%" }} />
                                            <input onChange={(e) => setMessage(e.target.value)} type="text" className="form-control form-control-lg" id="exampleFormControlInput2"
                                                placeholder="Type message" />
                                            <input type="submit" className="ms-3 fas fa-paper-plane" href="#!"></input>
                                        </div>
                                        </form>
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
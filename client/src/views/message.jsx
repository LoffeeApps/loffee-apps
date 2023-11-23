import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client";


export const Message = () => {
    const [convo, setConvo] = useState([])
    const [convos, setConvos] = useState([])
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])

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

    useEffect(() => {
        getConvo()
    },[])

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

    return(
        <>
             <div className="container">
                <div className="row h-100">
                    <div>
                        <div className="card border-secondary mt-3 mb-3" style={{ maxWidth: "100rem", borderRadius: "10px" }}>
                            <div className="card-header" style={{ fontSize: "20px" }}>
                                {convo.convo.ReceiverId.username === convo.username ? convo.convo.SenderId.username : convo.convo.ReceiverId.username}
                            </div>
                        </div>
                        <div>
                            <p className="ms-3" style={{ color: 'white' }}>Message :</p>
                            {messages.length > 0?  messages.map(el => (
                                <div key={el.userId1} className="card border-secondary ms-5 mt-3 mb-3" style={{ maxWidth: "100rem", borderRadius: "10px" }}>
                                    <div className="card-header d-flex justify-content-between align-items-center" style={{ fontSize: "15px" }}>
                                        <div className="d-flex align-items-center">
                                            {el.message}
                                        </div>
                                    </div>
                                </div>
                            )) : <p>No message</p>}
                        </div>
                        <form onSubmit={handleMessage}>
                            <div className="input-group mt-4 mb-3 ps-5 pe-2">
                                <input onChange={(e) => setMessage(e.target.value)} type="text" className="form-control" placeholder="Text message..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <input className="btn btn-warning" type="submit" value={"send"} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
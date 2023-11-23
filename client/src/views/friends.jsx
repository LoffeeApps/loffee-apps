import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setUsers as setUsersRedux } from "../features/users/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";

export default function Friend() {

    const usersFromRedux = useSelector((state) => state.users.list);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState('')
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
        try {

            const { data } = await axios({
                url: "http://localhost:3000/friends",
                method: "get",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(setUsersRedux(data.friends))
            setUserLogin(data.username)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    

    const handleChat = async (id) => {
        try {
            await axios({
                method: 'POST',
                url: `http://localhost:3000/convo`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                data: {
                    userId2: id
                }
            })
            navigate('/chat')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if(loading) {
        return <h3>loading...</h3>
    }

    return (
        <>
        <Navbar/>
        <div className="container mx-auto mt-4" style={{backgroundColor: "transparent"}}>
            <div className="row">
                {usersFromRedux.map((u) => (
                    <div className="col-md-4">

                        <div className="card" style={{ width: "18rem" }}>
                            <img src={u.Receiver.username === userLogin ? u.Sender.imageUrl : u.Receiver.imageUrl} className="card-img-top" alt="..." />
                            <div className="card-body text-center">
                                <h5 className="card-title">{u.Receiver.username === userLogin ? u.Sender.username : u.Receiver.username}</h5>
                                <p className="card-text">Age: {u.Receiver.username === userLogin ? u.Sender.age : u.Receiver.age} years</p>
                                <p className="card-text">Gender: {u.Receiver.username === userLogin ? u.Sender.gender : u.Receiver.gender}</p>
                                <button type="button" onClick={() => handleChat(u.Receiver.username === userLogin ? u.Sender.id : u.Receiver.id)} className="btn mr-2">chat</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
        </>
    )
}
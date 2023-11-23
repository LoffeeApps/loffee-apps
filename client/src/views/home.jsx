import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setUsers as setUsersRedux } from "../features/users/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
import Swal from 'sweetalert2'

export default function Home() {

    const usersFromRedux = useSelector((state) => state.users.list);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchUsers = async () => {
        try {

            const { data } = await axios({
                url: "http://localhost:3000/users",
                method: "get",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            dispatch(setUsersRedux(data))

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data,
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        }
    }

    

    const handleAdd = async (id) => {
        try {
            await axios({
                method: 'POST',
                url: `http://localhost:3000/addFriend/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            navigate('/friends')
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data,
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
        <Navbar/>
        <div className="container mx-auto mt-4" style={{backgroundColor: "transparent"}}>
            <div className="row">
                {usersFromRedux.map((u) => (
                    <div className="col-md-4">

                        <div className="card" style={{ width: "18rem" }}>
                            <img src={u.imageUrl} className="card-img-top" alt="..." />
                            <div className="card-body text-center">
                                <h5 className="card-title">{u.username}</h5>
                                <p className="card-text">Age: {u.age} years</p>
                                <p className="card-text">Gender: {u.gender}</p>
                                <button type="button" onClick={() => handleAdd(u.id)} className="btn mr-2">Match</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
        </>
    )
}
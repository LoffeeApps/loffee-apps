import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setUsers as setUsersRedux } from "../features/users/userSlice";

export default function Home () {

    const usersFromRedux = useSelector((state) => state.users.list);
    const dispatch = useDispatch()

    // console.log(usersFromRedux, ">>> usersFromRDX")
    // const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        try {

            const { data } = await axios({
                url: "http://localhost:3000/users",
                method: "get"
            })

            dispatch(setUsersRedux(data))

            // setUsers(data)
            // console.log(data, ">>> usersFromUSEsT")

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>

            {usersFromRedux.map((u) => (
                <div key={u.id} className="card" style={{width: "18rem"}}>
                    <img src={u.imageUrl} className="card-img-top" alt={u.username} />
                    <div className="card-body">
                        <p className="card-text">{u.username}</p>
                        <p className="card-text">{u.age}</p>
                        <p className="card-text">{u.gender}</p>
                    </div>
                </div>
            ))}
           
        </div>

    )
}
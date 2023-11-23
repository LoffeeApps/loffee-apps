
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const { data } = await axios({
                url: "http://localhost:3000/login",
                method: "post",
                data:
                {
                    email,
                    password
                }
            })

            localStorage.setItem("token", data.access_token)

            navigate("/chat")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <div className="formRegister">
                <div className="formWrapper">
                    <span><img className="logoRegister" src="https://i.imgur.com/xWgz4We.png" alt="logo" /></span>
                    <span className="title">Login</span>
                    <form onSubmit={handleSubmit}>
                        <input onChange={(e) => setEmail(e.target.value)} className="inputForm" type="email" placeholder="email" />
                        <input onChange={(e) => setPasword(e.target.value)} className="inputForm" type="password" placeholder="password" />
                        <input className="submitButton" type="submit" value={'Login'} />
                    </form>
                    <p>-- or --</p>
                    <div id="buttonDiv"></div>
                </div>
            </div></>
    )
}
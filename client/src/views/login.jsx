
import { useState } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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

            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <div className="formRegister">
                <div className="formWrapper">
                    <span><img className="logoRegister" src="https://media.discordapp.net/attachments/1176431420575592460/1176746122933456956/Untitled_design-removebg-preview.png?ex=656ffd3a&is=655d883a&hm=f7c436703177bcda8ca608b027fcd9209777f2e6d0c9a37d47cc69e934724bda&=&format=webp&width=468&height=468" alt="logo" /></span>
                    <span className="title">Login</span>
                    <form onSubmit={handleSubmit}>
                        <input onChange={(e) => setEmail(e.target.value)} className="inputForm" type="email" placeholder="email" />
                        <input onChange={(e) => setPasword(e.target.value)} className="inputForm" type="password" placeholder="password" />
                        <input className="submitButton" type="submit" value={'Login'} />
                    </form>
                    <p>-- or --</p>
                    <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
                </div>
            </div></>
    )
}
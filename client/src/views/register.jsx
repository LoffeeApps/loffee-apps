

import { useState } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')
    const [gender, setGender] = useState('')
    const [age, setage] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:3000/register',
                data: {
                    username, email, password, gender, age, imageUrl
                }
            })

            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className="formRegister">
                <div className="formWrapper">
                    <span><img className="logoRegister" src="https://media.discordapp.net/attachments/1176431420575592460/1176746122933456956/Untitled_design-removebg-preview.png?ex=656ffd3a&is=655d883a&hm=f7c436703177bcda8ca608b027fcd9209777f2e6d0c9a37d47cc69e934724bda&=&format=webp&width=468&height=468" alt="logo" /></span>
                    <span className="title">Register</span>
                    <form onSubmit={handleSubmit}>
                        <input className="inputForm" onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" />
                        <input className="inputForm" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" />
                        <input className="inputForm" onChange={(e) => setPasword(e.target.value)} type="password" placeholder="password" />
                        <select class="form-select" style={{backgroundColor: 'whitesmoke', color: "black"}} onChange={(e) => setGender(e.target.value)} aria-label="Default select example">
                            <option selected disabled>gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <input className="inputForm" onChange={(e) => setage(e.target.value)} type="number" placeholder="age" />
                        <input className="inputForm" onChange={(e) => setImageUrl(e.target.value)} type="text" placeholder="image url" />
                        <input className="submitButton" type="submit" value={'Sign Up'}></input>
                    </form>
                    <p>You do have an account? <Link to={'/login'}>Login</Link></p>
                </div>
            </div></>
    )
}
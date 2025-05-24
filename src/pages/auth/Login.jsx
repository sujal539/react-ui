import { Link, useNavigate, } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './login.css'
import { API_URL, getRequest } from '../../helper'

const Login = () => {
    const navigate = useNavigate()
   

    useEffect(() => {
        const auth = async () => {
            const response = await getRequest('auth/me')
            if (response.error === null) {
                navigate("/", { replace: true })
            }
        }
        auth()
    },[navigate])


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const postData = async () => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })  // ← this should be "body", not "data"
        });

        if (response.ok) {
            navigate("/");
            alert("Login successfull")
        }
    }

    return <div className="l-body">
        <div className="l-card">

            <form onSubmit={async (ev) => {
                ev.preventDefault()
                await postData()
            }} id="registration-form">
                <div className="l-input-grid">
                    <label className='l-label' htmlFor="email">Email:</label>
                    <input className='l-input' value={email} onChange={ev => {
                        setEmail(ev.target.value)
                    }} type="text" id="email" pattern="^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2}$" name="email" required />
                </div>
                <div className="l-input-grid">
                    <label className='l-label' htmlFor="password">Password:</label>
                    <input className='l-input' value={password} onChange={ev => {
                        setPassword(ev.target.value)
                    }} type="password" id="password" name="password" required />
                </div>

                <div className="l-btn-container">
                    <button className='l-btn' type="submit">Login</button>
                    <Link style={{ color: 'blue', textDecoration: 'none' }} to={"/signup"}>Signup</Link>
                    {/* <a className="signup-text" href="/signup">Create an Account</a> */}
                </div>
            </form>
        </div>
    </div>
}
export default Login
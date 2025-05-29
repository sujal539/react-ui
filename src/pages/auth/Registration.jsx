import { useState, useEffect } from 'react'
import './registration.css'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../helper'
import { getRequest } from '../../helper'
const Registration = () => {


    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const auth = async () => {
            const response = await getRequest('auth/me')
            if (response.error === null) {
                navigate("/", { replace: true })
            }
        }
        auth()
    }, [navigate])

    const postData = async () => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            // credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ firstName, lastName, email, password, confirmPass })  // ← this should be "body", not "data"
        });

        if (response.ok) {
            navigate('/login')
            alert("Registration successfull")
        }
    }

    return <div className='r-body'>
        <div className="r-card">
            <form onSubmit={async (ev) => {
                ev.preventDefault()
                await postData()
            }} id="registration-form">
                <div className="r-input-grid">
                    <label className='r-label' htmlFor="firstName">First Name:</label>
                    <input value={firstName} onChange={ev => {
                        // console.log(ev.target.value)      
                        setFirstname(ev.target.value)
                    }} className='r-input' type="text" pattern="^[A-Za-z]{2,50}$" id="firstName" name="firstName" required />
                </div>

                <div className="r-input-grid">
                    <label className='r-label' htmlFor="lastName">Last Name:</label>
                    <input value={lastName} onChange={ev => {
                        setLastname(ev.target.value)
                    }} className='r-input' type="text" id="lastName" pattern="^[A-Za-z]{2,50}$" name="lastName" required />

                </div>

                <div className="r-input-grid">
                    <label className='r-label' htmlFor="email">Email:</label>
                    <input value={email} onChange={ev => {
                        setEmail(ev.target.value)
                    }} className='r-input' id="email" name="email" type="email" required />
                </div>

                <div className="r-input-grid rel-icon">
                    <label className='r-label' htmlFor="password">Password:</label>
                    <input value={password} onChange={ev => {
                        setPassword(ev.target.value)
                    }} className='r-input' type="password" id="password" name="password" required />
                    <i onClick={() => { }} className="fa-solid fa-eye-slash abs-icon"></i>
                </div>

                <div className="r-input-grid rel-icon">
                    <label className='r-label' htmlFor="confirm-password">Re-type Password:</label>
                    <input value={confirmPass} onChange={ev => {
                        setConfirmPass(ev.target.value)
                    }} className='r-input' type="password" id="confirm-password" name="confirm-password" required />
                    <i onClick={() => { }} className="fa-solid fa-eye-slash abs-icon"></i>
                </div>

                <div className="r-btn-container">
                    <button className='r-button' type="submit">Register</button>
                </div>

                <a className="r-signup-text" href="#" onClick={(e) => {
                    e.preventDefault();
                    navigate('/login');
                }}> Already have an account? Login</a>
            </form>
        </div>
    </div>
}
export default Registration

function ReactComponent({ text }) {
    return <p>{text}</p>
}


// without react state
// export function MyPage() {
//     let hello = "hello"
//     function onClick() {
//         console.log("button clickeds")
//         hello = "this is new value"
//         console.log(hello)
//     }


//     return (<div>
//         <button onClick={onClick}>Button</button>
//         <ReactComponent text={"hello"} />
//         <ReactComponent text={hello} />
//     </div>)
// }


// with react state
export function MyPage() {

    const [counter, setCounter] = useState(0)
    // let hello = "hello"
    function onClick() {
        setCounter(counter + 1)
    }


    return (<div>
        <button onClick={onClick}>Button</button>
        <ReactComponent text={"hello"} />
        <ReactComponent text={counter} />
    </div>)
}
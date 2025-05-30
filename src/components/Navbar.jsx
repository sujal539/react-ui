import './navbar.css'
import image from '../../public/icons/create.png'
import { postRequest } from '../helper'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getRequest } from '../helper'
const Navbar = ({ onCreate }) => {
    const navigate = useNavigate()

    const [userName, setUserName] = useState('')
    const handleLogout = async () => {
        try {
            const response = await postRequest('auth/logout', {}, 'POST')
            if (!response.ok) {
                throw new Error('unknown error')

            }
            navigate('/login', { replace: true })

        } catch (error) {
            alert(error.message)
        }

    }
    useEffect(() => {
        const auth = async () => {
            const response = await getRequest('auth/me')
            const { first_name, last_name } = response.data.data
            setUserName(first_name + " " + last_name)

        }
        auth()
    }, [])
    return <nav id="navbar">
        <p className='user'>{userName}</p>
        <h1 className='header'>Notes</h1>

        <div className='btn-container'>
            <div onClick={onCreate} className="note-btn">
                <img src={image} alt="Create Icon" />
                Add Notes
            </div>
            <div className="n-btn-container">
                <button onClick={handleLogout} className='n-button' type="submit">Logout</button>
            </div>
        </div>
    </nav>
}

export default Navbar

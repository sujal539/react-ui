import './navbar.css'
import image from '../../public/icons/create.png'
import { postRequest } from '../helper'
import {useNavigate } from 'react-router-dom'

const Navbar = ({ onCreate, uid }) => {
const navigate = useNavigate()
    const handleLogout = async () => {
        try {
        const response = await postRequest('auth/logout', {}, 'POST')
            if (!response.ok) {
                 throw new Error ('unknown error')
                
            }
            navigate('/login', { replace: true })
           
        } catch (error) {
            alert(error.message)
        }

    }
    return <nav id="navbar">
        <p>UserId {uid ?? 'na'}</p>
        <h1>Notes</h1>

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

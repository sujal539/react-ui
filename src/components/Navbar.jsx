import './navbar.css'
import image from '../../public/icons/create.png'
const Navbar = ({onCreate, uid}) => {
    return <nav id="navbar">
        <p>UserId {uid ?? 'na'}</p>
        <h1>Notes</h1>

        <div className='btn-container'>
            <div onClick={onCreate} className="note-btn">
            <img src={image} alt="Create Icon" />
            Add Notes
            </div>
            <div className="n-btn-container">
                <button className='n-button' type="submit">Logout</button>
            </div>  
        </div>
    </nav>
}

export default Navbar


import { useLocation } from 'react-router-dom';
import './editnote.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../helper';

const Editnote = () => {
    const location = useLocation()
    const state = location.state;

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        setTitle(state.title)
        setContent(state.content)
    }, [state])
const handleUpdate = async (ev) => {
    ev.preventDefault();

    try {
        const response = await fetch(`${API_URL}/api/note/${state.id}`, {
            method: 'PATCH', // or 'PATCH' based on your backend
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                title: title,
                content: content
            })
        });

        if (response.ok) {
            alert("Note updated successfully");
            navigate('/'); // Go back to Home page
        } else {
            alert("Failed to update note");
        }
    } catch (error) {
        console.error("Update failed", error);
        alert("An error occurred while updating the note");
    }
};

    console.log(state, 'state')
    return <div className='e-body'>
        <form id="update-form" onSubmit={handleUpdate}>
            <h3 className='e-h3'>Update Note</h3>
            <div className="input-container">
                <input className="e-input" value={title} onChange={ev => setTitle(ev.target.value)} type="text" id="title" name="title" placeholder="Select Your Title Here " />
            </div>
            <textarea className="e-no-border" value={content} onChange={ev => setContent(ev.target.value)} name="content" id="content" placeholder="type your content here...."></textarea>

            <div className="e-btn-container">
                <button className='e-button' type="submit">Update</button>
            </div>
        </form>
    </div>
}

export default Editnote
import './notecard.css';
import Button from './Button';
const Notecard = ({ title, text, date, onEdit, onDelete }) => {
    return (
        
        <div className="card">
            <div className="title">{title}</div>
            <div className="note-text">{text}</div>
            <p>{date}</p>
            <div id="note-action" className="note-action">
                <div style={{display: 'flex', gap: '1rem'}}>
                    <Button text={"Edit"} click={onEdit} className={'edit-btn'}/>
                    <Button text={"Delete"} click={onDelete} className={'delete-btn'}/>
                </div>

            </div>
        </div>)
}

export default Notecard

import './notecard.css';
import Button from './Button';

const Notecard = ({ title, text, date, onEdit, onDelete, fadeOut}) => {
  return (
    <div className={`card ${fadeOut ? 'fade-out' : ''}`}>
      <div className="title">{title}</div>
      <div className="note-text">
        <p>{text}</p>
      </div>
      <p className="date">{date}</p>
      <div className="note-action">
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button text={"Edit"} click={onEdit} className={'edit-btn'} />
          <Button text={"Delete"} click={onDelete} className={'delete-btn'} />
        </div>
      </div>
    </div>
  );
};

export default Notecard;

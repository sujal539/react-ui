import './dialog.css'
const Dialog = ({ title, text, onYes, onCancel, dialogRef }) => {

    
    return (
      
        <dialog ref={dialogRef}>
            <h3 className='h3-d'>{title}</h3>
            <p className='p-d'>{text}</p>
            <div className="dia-btn-container">
                <button className='ok-btn' onClick={onYes}>Ok</button>
                <button className='cancel-btn' onClick={onCancel}>Cancel</button>
            </div>
        </dialog>
    )
}
export default Dialog
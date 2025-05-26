import { forwardRef } from 'react'
import './dialog.css'
const Dialog = forwardRef(({ title, text, onYes, onCancel }, ref) => {


    return (

        <dialog ref={ref}>
            <h3 className='h3-d'>{title}</h3>
            <p className='p-d'>{text}</p>
            <div className="dia-btn-container">
                <button className='ok-btn' onClick={onYes}>Ok</button>
                <button className='cancel-btn' onClick={onCancel}>Cancel</button>
            </div>
        </dialog>
    )
})
Dialog.displayName = 'Dialog'
export default Dialog
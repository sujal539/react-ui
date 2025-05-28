import { useState } from 'react'
import './createnote.css'
import { useNavigate } from 'react-router-dom'
import { API_URL, postRequest } from '../helper'

const Createnote = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const postData = async () => {
    try {
      const response = await postRequest("api/note", { title, content }, 'POST')
      if (response.ok) {
        alert("Note Created")
        navigate('/')
      } else {
        alert("Failed to create note")
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className='c-body'>
      <form
        onSubmit={async (ev) => {
          ev.preventDefault()
          await postData()
        }}
        className='c-form'
        id="create-form"
      >
        <h3 className='c-h3'>Create Note</h3>
        <div className="c-input-container">
          <input
            className="r-input"
            type="text"
            value={title}
            onChange={ev => setTitle(ev.target.value)}
            id="title"
            name="title"
            placeholder="Select Your Title Here "
          />
        </div>
        <textarea
          className="c-no-border"
          name="content"
          value={content}
          onChange={ev => setContent(ev.target.value)}
          id="content"
          placeholder="type your content here...."
        />
        <div className="c-btn-container">
          <button className='c-button' type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default Createnote

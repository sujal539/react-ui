import React, { useEffect, useState , useRef} from 'react';
import '../index.css'
import './Home.css'
import Navbar from '../components/Navbar';
import Notecard from '../components/Notecard';
import { useNavigate } from 'react-router-dom';
import Dialog from '../components/Dialog';
import { getRequest } from '../helper';

// react functional component
function Home() {
  const [notes, setNotes] = useState({
    error: false,
    loading: true,
    data: []
  })

  const navigate = useNavigate()

  const dialogRef = useRef()


  const getNotes = async () => {

    const res = await  getRequest('api/notes')
    if(res.data){
       setNotes({
        loading: false,
        data: res.data
      })
    }else {
       setNotes({
        error: true,
        loading: false,
        data: []
      })
    }
  }

  const [deleteId, setDeleteId] = useState(-1)

  useEffect(() => {
    getNotes()
  }, [])

  if (notes.loading) {
    return <h1>Loading notes......</h1>
  }
  const handleEdit = (id) => {
    const noteToEdit = notes.data.find(note => note.id === id)
    navigate("/edit", { state: { id: id, title: noteToEdit.title, content: noteToEdit.content } })
  }


  const deleteNote = async () => {
    try {
     const resp =  await fetch(`http://localhost:3455/api/note/${deleteId}`,{
        method: 'DELETE',
        credentials: 'include',
      });
      if(!resp.ok){
        throw Error("something went wrong")
      }


      setNotes((prev) => {
       const newValue = {...prev} 
       const temp = newValue.data.filter(note => note.id !== deleteId)
       return {...newValue, data: temp}
      })

    } catch (error) {
      console.log(error)
      alert(`error while deleting note`)
    }
  }


  const handleDelete = (id) => {
    setDeleteId(id)
    dialogRef.current.showModal()
  }

  return (<div className='container'>
    <Navbar uid={notes.data && notes.data[0] && notes.data[0].uid} onCreate={() => navigate('/create')} />
    <div id="cards-wrapper" className="cards-wrapper">
      {notes.data.map(it => (
        <Notecard key={it.id}
          title={it.title}
          text={it.content}
          date={it.created_at}
          onEdit={() => handleEdit(it.id)}
          onDelete={() => handleDelete(it.id)}
        />))}
    </div>
    <Dialog dialogRef={dialogRef} onCancel={() => {
       dialogRef.current.close()
    }} onYes={() => {
      deleteNote()
      dialogRef.current.close()
    }} title={'Delete?'} text={'Are you sure you want to delete?'} />
  </div>)
}

export default Home;

// const notes = [{
//   id: 1,
//   title: "sample note",
//   text: "ssamdsdkjfksfdj",
//   date: "12/12/24"
// }, {
//   id: 2,
//   title: "sample note",
//   text: "ssamdsdkjfksfdj",
//   date: "12/12/24"
// }, {
//   id: 3,
//   title: "sample note",
//   text: "ssamdsdkjfksfdj",
//   date: "12/12/24"
// }]
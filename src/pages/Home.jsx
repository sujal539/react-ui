import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';  // <-- added useLocation
import '../index.css';
import './Home.css';
import Navbar from '../components/Navbar';
import Notecard from '../components/Notecard';
import Dialog from '../components/Dialog';
import { API_URL, getRequest } from '../helper';

function Home() {
  const [notes, setNotes] = useState({
    error: false,
    loading: true,
    data: []
  });

  const [deleteId, setDeleteId] = useState(-1);
  const [fadingNoteId, setFadingNoteId] = useState(null); // fade-out tracking

  const navigate = useNavigate();
  const dialogRef = useRef();

  const getNotes = async () => {
    const res = await getRequest('api/notes');
    if (res.data) {
      setNotes({
        loading: false,
        data: res.data.data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)), // Sort by date descending,
        error: false
      });
    } else {
      setNotes({
        error: true,
        loading: false,
        data: []
      });
    }
  };

  // Load notes on mount
  useEffect(() => {
    getNotes();
  }, []);



  if (notes.loading) {
    return <h1>Loading notes......</h1>;
  }

  const handleEdit = (id) => {
    const noteToEdit = notes.data.find(note => note.id === id);
    navigate("/edit", { state: { id: id, title: noteToEdit.title, content: noteToEdit.content } });
  };

  const deleteNote = async () => {
    try {
      const resp = await fetch(`${API_URL}/api/note/${deleteId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!resp.ok) throw Error("something went wrong");

      setNotes((prev) => {
        const updated = { ...prev };
        updated.data = updated.data.filter(note => note.id !== deleteId);
        return updated;
      });

    } catch (error) {
      console.log(error);
      alert(`error while deleting note`);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  return (
    <div className='container'>
      <Navbar
        uid={notes.data && notes.data[0] && notes.data[0].uid}
        onCreate={() => navigate('/create')}
      />

      <div id="cards-wrapper" className="cards-wrapper">
        {notes.data.map(it => (
          <Notecard
            key={it.id}
            id={it.id}
            title={it.title}
            text={it.content}
            date={it.created_at}
            onEdit={() => handleEdit(it.id)}
            onDelete={() => handleDelete(it.id)}
            fadeOut={fadingNoteId === it.id}  // fade-out prop
          />
        ))}
      </div>

      <Dialog
        ref={dialogRef}
        onCancel={() => dialogRef.current.close()}
        onYes={() => {
          setFadingNoteId(deleteId); // Start fade-out
          setTimeout(() => {
            deleteNote();             // Delete after fade-out
            setFadingNoteId(null);    // Reset fade-out state
          }, 500); // Match CSS transition duration
          dialogRef.current.close();
        }}
        title={'Delete?'}
        text={'Are you sure you want to delete?'}
      />
    </div>
  );
}

export default Home;

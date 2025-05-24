import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/auth/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration, { MyPage } from './pages/auth/Registration'
import Createnote from './pages/Createnote'
import Editnote from './pages/Editnote'
import Home from './pages/Home'
import Error from './pages/Error'
import Protected from './pages/Protected'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Registration />} />

        <Route path='/' element={<Protected><Home/></Protected>} />
        <Route path='/create' element={<Createnote />} />
        <Route path='/edit' element={<Editnote />} />
        <Route path='*' element={<Error />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)



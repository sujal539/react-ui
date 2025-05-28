import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/auth/Login'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Registration, { MyPage } from './pages/auth/Registration'
import Createnote from './pages/Createnote'
import Editnote from './pages/Editnote'
import Home from './pages/Home'
import Error from './pages/Error'
import Protected from './pages/Protected'
import ImageSlider from './pages/ImageSlider'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Open routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Registration />} />

        {/* Protected routes */}
        <Route element={<Protected><Outlet /></Protected>}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Createnote />} />
          <Route path="/inter" element={<ImageSlider />} />
          <Route path="/edit" element={<Editnote />} />
        </Route>

        {/* Optional: Catch-all route for 404 */}
        <Route path="*" element={<Error />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)



import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Table from './pages/Table'
import Booking from './pages/Booking'
import Snack from './pages/Snacks'
import AdminStock from './pages/AdminStock'
import AdminTable from './pages/AdminTable'
import SessionChecker from './utils/sessionChecker'

const App = (): any => {
  const { sessionId, setSessionId, resetSessionId } = SessionChecker()

  if (sessionId == null) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login sessionSetter = { setSessionId }/>} />
          <Route path="/register" element={<Register />} />
          <Route path = '*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard sessionReset={resetSessionId}/>} />
        <Route path="/dashboard" element={<Dashboard sessionReset={resetSessionId}/>} />
        <Route path="/table" element={<Table userId={sessionId}/>} />
        <Route path="/booking" element={<Booking/>} />
        <Route path="/snack" element={<Snack {...sessionId}/>} />
        <Route path='/stock' element={<AdminStock/>}/>
        <Route path='/admintable' element={<AdminTable/>}/>
        <Route path = '*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

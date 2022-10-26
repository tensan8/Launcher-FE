import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'

const App = (): any => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App

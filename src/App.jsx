import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdminDashboard from './pages/AdminDashboard'

function App() {

  return (
    <div className='dark:bg-gray-900'>
      <AdminDashboard />
    </div>
  )
}

export default App

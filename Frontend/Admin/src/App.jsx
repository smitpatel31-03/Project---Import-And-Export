import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authServices from './services/auth'
import { login, logout } from './store/authSlice.js'
import { Slidebar } from './components/index.js'
import { Outlet } from 'react-router'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authServices.getCurruntAdmin()
      .then((userData) => {
        if (userData) {
          dispatch(login())
        }
        else {
          dispatch(logout())
        }
      })
      .finally(()=>setLoading(false))
  }, [])


  return !loading ? (
    <>
      <div className='flex '>
        <Slidebar />
          <Outlet />
      </div>
    </>
  ) : null
}

export default App

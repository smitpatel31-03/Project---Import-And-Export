import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authServices from './services/auth'
import { login, logout } from './Store/authSlice.js'
import { Header,Footer } from './components/index.js'
import { Outlet } from 'react-router'
import { Analytics } from "@vercel/analytics/next"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authServices.getCurruntUser()
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
      <div className=' '>
        <Header />
          <Outlet />
          <Footer />
          <Analytics/>
      </div>
      
    </>
  ) : null
}

export default App

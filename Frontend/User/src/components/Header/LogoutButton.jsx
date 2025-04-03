import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../services/auth.js';  // Ensure correct path
import {logout} from '../../Store/authSlice.js'

function LogoutButton() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        
        authService.logoutUser()
        .then(()=>{
            dispatch(logout())
        })
        .catch()
    }
  return (
        <button className='inline-block px-6 py-2 duration-600 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutButton

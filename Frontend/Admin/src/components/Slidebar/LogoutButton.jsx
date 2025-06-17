import { useDispatch } from 'react-redux'
import authService from '../../services/auth'
import { logout } from '../../store/authSlice.js'
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
    const navigate = useNavigate() // ✅ corrected capitalization
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())                      // ✅ Clear Redux state
                localStorage.removeItem('token')        // ✅ Manually remove token if stored
                navigate('/login')                      // ✅ Redirect to login page
            })
            .catch((err) => {
                console.log("Logout error:", err)
            })
    }

    return (
        <button
            className='inline-block px-6 py-2 duration-600 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutButton

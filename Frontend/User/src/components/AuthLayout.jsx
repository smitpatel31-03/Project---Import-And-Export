import React,{useState, useEffect, Children} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function Protected({children,authentication=true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authstatus = useSelector(state => state.auth.status)
    
    useEffect(()=>{
        
        authstatus
        if(authentication && authstatus!==authentication){
            navigate("/login")
        }
        else if(!authentication && authstatus!==authentication){
            navigate("/")
        }
        setLoader(false)
    },[authstatus,navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected

import React from 'react'
import {Container, LogoutButton, Logo} from "../index"
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

function Slidebar() {

  const authStatus = useSelector((state)=>state.auth.status)
  const navigate = useNavigate()

  const navIteams=[
    {
      name:"Dasboard",
      slug:"/",
      active: authStatus
    },
    {
      name:"Login",
      slug:"/login",
      active: !authStatus
    },
    {
      name:"Signup",
      slug:"/signup",
      active: !authStatus
    },
    {
      name:"Catagories",
      slug:"/categories",
      active: authStatus
    },
    {
      name:"Products",
      slug:"/products",
      active: authStatus
    },
    {
      name:"Orders",
      slug:"/orders",
      active: authStatus
    },
    {
      name:"Admin",
      slug:"/admin",
      active: authStatus
    },
    
  ]

  return (
    <div className='flex-col bg-zinc-900 w-1/5 min-h-screen justify-center py-10 px-10 text-white'>
      <Container>
        <nav>
          <ul>
            {navIteams.map((iteam)=>(
              iteam.active ? (
              <li key={iteam.name}>
                <button onClick={()=>navigate(iteam.slug)} className='inline-block px-6 py-2 duration-200 text-white hover:text-black hover:bg-blue-100 rounded-full '>{iteam.name}</button>
              </li>
              ) : null
          ))}
          {
            authStatus && (
              <li>
                <LogoutButton />
              </li>
            )
          }
          </ul>
        </nav>

      </Container>
    </div>
  )
}

export default Slidebar

import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import authServices from '../services/auth';
import { AddAddressForm } from '../components/index.js'

function UserAddress() {
    const {id} = useParams()
    const [address, setAddress] = useState()

    useEffect(()=>{
        const fetchAddressDetails = async() =>{
            const data = await authServices.findUserAddresses(id)
            if(data){
                setAddress(data)
            }
        }

        fetchAddressDetails()
    },[id])
    
    
  return (
    <div>
      <AddAddressForm address={address}/>
    </div>
  )
}

export default UserAddress

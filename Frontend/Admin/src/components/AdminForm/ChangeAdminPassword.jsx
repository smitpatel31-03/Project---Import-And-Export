import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import services from '../../services/auth.js'
import {Input,Button} from '../index.js'
import { useSelector } from 'react-redux'

function ChangeAdminPassword(Admin) {
    
    const {register,handleSubmit} = useForm()

    const navigate = useNavigate()

    const submit = async(data) =>{
        if(Admin){
            const dbAdmin = await services.changeAdminPassword({...data})
            
            if(dbAdmin){
                navigate(`/`)
            }
        }

    }
  if(Admin){
    return(
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'> 
            <div className='w-2/3 px-2'>

            <Input 
            label="Old Password:"
            placeholder="Your Old Password"
            className="mb-4"
            type="password"
            {...register("oldPassword",{required:true})}
            />    
            <Input 
            label="New Password:"
            placeholder="Your New Password"
            className="mb-4"
            type="password"
            {...register("newPassword",{required:true})}
            />    
            <Input 
            label="Conform New Password:"
            placeholder="YourNew Password"
            className="mb-4"
            {...register("conformNewPassword",{required:true})}
            />    
            
            <Button type="submit" bgColor='bg-blue-500' className='w-full'>Update</Button>
            </div>
        </form>
    )
  }
  else{
    <div>
        Admin Not Found
    </div>
  }
}

export default ChangeAdminPassword

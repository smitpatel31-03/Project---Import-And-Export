import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import services from '../../services/auth.js'
import { Input , Button } from '../index.js'

function ChangeAdminDetails(Admin) {

    const {register,handleSubmit} = useForm({
        defaultValues:{
            email : Admin?.email, 
            name : Admin?.name 
        }
    })
   
    const navigate = useNavigate()

    const submit = async(data) =>{
        if(Admin){
            const dbAdmin = await services.changeAdminDetails({...data})
            
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
            label="Email:"
            placeholder="Enter Email"
            className="mb-4"
            {...register("email",{required:true})}
            />  

            <Input 
            label="Name:"
            placeholder="Enter Name"
            className="mb-4"
            {...register("name",{required:true})}
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

export default ChangeAdminDetails

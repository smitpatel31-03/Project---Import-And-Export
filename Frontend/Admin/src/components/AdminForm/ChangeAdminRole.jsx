import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import services from '../../services/auth.js'
import {Input,Select,Button} from '../index.js'

function ChangeAdminRole(Admin) {

    const {register,handleSubmit} = useForm({
        defaultValues:{
            role : Admin?.role
        }
    })

    

    const navigate = useNavigate()

    const submit = async(data) =>{
        if(Admin){
            
            const dbAdmin = await services.changeAdminRole({...data})
            
            
            if(dbAdmin){
                navigate(`/`)
            }
        }

    }
  if(Admin){
    return(
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'> 
            <div className='w-2/3 px-2'>
            <Select 
            label="Role:"
            options={["ADMIN", "OWNER", "CREATOR", "DELIVERY"]}
            placeholder="Select Your Role"
            className="mb-4"
            {...register("role",{required:true})}
            />  

            <Input 
            label="Key:"
            placeholder="Enter Key"
            className="mb-4"
            {...register("key",{required:true})}
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

export default ChangeAdminRole

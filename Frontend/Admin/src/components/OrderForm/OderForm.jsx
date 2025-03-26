import React from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { Input, Select, Button} from '../index.js'
import { useSelector } from 'react-redux'
import services from '../../services/config.js'

function OrderForm({ Order }) {
    
    const { register, handleSubmit } = useForm({
        defaultValues: {
            status: Order?.status || "",
            statusLocation: Order?.statusLocation || ""
        }
    })

    const navigate = useNavigate()

    const submit = async (data) => {
        const dbOrder = await services.updateOrderDetails(Order, {
            ...data
        })


        if (dbOrder) {
            navigate(`/OrderDetails/${Order}`)
        }
    }

    if(Order){
        return (
            <form onSubmit={handleSubmit(submit)}>
                <div className='w-2/3 px-2'>
                    <Select
                        options={["PENDING", "PROCESSING", "SHIPPED", "IN TRANSIT", "CUSTOMS CLEARANCE", "DELIVERED", "CANCELLED", "FAILED"]}
                        label="Status"
                        className="nb-4"
                        {...register("status", { required: true })}
                    />
    
                    <Input
                        label="Status Location"
                        placeholder="Enter Status Location"
                        className="mb-4"
                        {...register("")}
                        {...register("statusLocation", { required: true })}
                    />
    
                    <Button type="submit" bgColor='bg-blue-500' className='w-full'>Update</Button>
                </div>
            </form>
        )
    }
    else{
        return(
            <div>
                <h1>
                    Order Not Found
                </h1>
            </div>
        )
    }
    
}

export default OrderForm

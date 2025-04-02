import React from 'react'
import service from '../../services/config.js'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../index.js'

function ProductFeatureImage({ Product }) {
    const { register, handleSubmit } = useForm()

    console.log('product :',Product);
    
    const navigate = useNavigate()

    const submit = async (data) => {
        const dbProduct = await service.changeProductImage(Product._id, {...data})

        if (dbProduct) navigate(`/`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
                <div className='w-2/3 px-2'>
                    <Input
                        label="Product Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("featuedImages", { required: true })}
                    />

                    <img src={Product?.featuedImages} alt={Product?.name} />

                    <Button type="submit" bgColor={Product ? "bg-green-500" : undefined} className="w-full">
                        Upload
                    </Button>

                </div>
            </form>
        </div>
    )
}

export default ProductFeatureImage

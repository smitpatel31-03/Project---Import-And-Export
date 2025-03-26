import React from 'react'
import service from '../../services/config.js'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../index.js'

function ProductFeatureImage({ product }) {
    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()

    const submit = async () => {
        const dbProduct = await service.changeProductImage(product._id, { ...data })

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
                        {...register("image", { required: true })}
                    />

                    <Button type="submit" bgColor={product ? "bg-green-500" : undefined} className="w-full">
                        Upload
                    </Button>

                </div>
            </form>
        </div>
    )
}

export default ProductFeatureImage

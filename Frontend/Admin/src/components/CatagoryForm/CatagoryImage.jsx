import React from 'react'
import service from '../../services/config.js'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../index.js'

function CatagoryImage({ catagory }) {
    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()

    const submit = async () => {
        const dbcatagory = await service.changeCatagoryImage(catagory._id, { ...data })

        if (dbcatagory) navigate(`/`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
                <div className='w-2/3 px-2'>
                    <Input
                        label="Catagory Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: true })}
                    />

                    <Button type="submit" bgColor={catagory ? "bg-green-500" : undefined} className="w-full">
                        Upload
                    </Button>

                </div>
            </form>
        </div>
    )
}

export default CatagoryImage


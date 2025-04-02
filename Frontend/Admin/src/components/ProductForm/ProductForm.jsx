import React, { useEffect } from 'react'
import service from '../../services/config.js'
import { useNavigate, useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../index.js'
import { useSelector } from 'react-redux'

function ProductForm({ Product }) {
    const { id: categoryId } = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm()
    const admin = useSelector((state) => state.auth.userData);
    
    useEffect(()=>{
        if(Product){
            reset({
                name: Product?.name || "",
                price: Product?.price || "",
                description: Product?.description || "",
                category: categoryId || "",
                stock: Product?.stock || "",
                owner: Product?.owner || "",
                productId: Product?.productId || "",
            })
        }
    },[Product,categoryId,reset])
    

    const submit = async (data) => {
        if (Product) {
            const dbProduct = await service.changeProductDetails(Product._id, { ...data })
            if (dbProduct) {
                navigate(`/`)
            }
        } else {
            const dbProduct = await service.addProduct(categoryId, { ...data })
            if (dbProduct) {
                navigate(`/`)
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
                <div className='w-2/3 px-2'>
                    <Input
                        label="Name: "
                        placeholder="Enter Category Name"
                        className='mb-4'
                        {...register("name", { required: true })}
                    />

                    <Input
                        label="Price: "
                        placeholder="Enter Price In USD"
                        className='mb-4'
                        type="number"
                        {...register("price", { required: true })}
                    />

                    <Input
                        label="Description: "
                        placeholder="Enter Description"
                        className='mb-4'
                        {...register("description", { required: true })}
                    />
                    <Input
                        label="Category: "
                        value={categoryId}
                        className='mb-4'
                        {...register("category", { required: true })}
                    />

                    <Input
                        label="Stock: "
                        placeholder="Enter Stock"
                        className='mb-4'
                        type='number'
                        {...register("stock")}
                    />

                    <Input
                        label="Product ID: "
                        placeholder="Enter Product ID"
                        className='mb-4'
                        {...register("productId")}
                    />

                    {!Product && (
                        <>
                        <Input
                            label="Category Image:"
                            type="file"
                            className="mb-4"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("featuedImages", { required: !Product })}
                        />

                        <Input
                        label="Owner: "
                        value={admin}
                        className='mb-4'
                        {...register("owner")}
                        />
                    </>
                    )}

                    <Button type="submit" bgColor={Product ? "bg-green-500" : undefined} className="w-full">
                        {Product ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm

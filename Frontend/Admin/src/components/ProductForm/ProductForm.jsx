import React, { useEffect } from 'react';
import service from '../../services/config.js';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../index.js';
import { useSelector } from 'react-redux';

function ProductForm({ Product }) {
    const { id: categoryId } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const admin = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (Product) {
            reset({
                name: Product?.name || "",
                price: Product?.price || "",
                description: Product?.description || "",
                category: categoryId || "",
                stock: Product?.stock || "",
                owner: Product?.owner || "",
                productId: Product?.productId || "",
            });
        }
    }, [Product, categoryId, reset]);

    const submit = async (data) => {
        if (Product) {
            const dbProduct = await service.changeProductDetails(Product._id, { ...data });
            if (dbProduct) navigate(`/`);
        } else {
            const dbProduct = await service.addProduct(categoryId, { ...data });
            if (dbProduct) navigate(`/`);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{Product ? 'Update Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit(submit)} className='space-y-4'>
                <Input
                    label="Name"
                    placeholder="Enter Product Name"
                    className='w-full'
                    {...register("name", { required: true })}
                />
                <Input
                    label="Price"
                    placeholder="Enter Price In USD"
                    className='w-full'
                    type="number"
                    {...register("price", { required: true })}
                />
                <Input
                    label="Description"
                    placeholder="Enter Description"
                    className='w-full'
                    {...register("description", { required: true })}
                />
                <Input
                    label="Category"
                    value={categoryId}
                    className='w-full bg-gray-100 cursor-not-allowed'
                    readOnly
                    {...register("category", { required: true })}
                />
                <Input
                    label="Stock"
                    placeholder="Enter Stock"
                    className='w-full'
                    type='number'
                    {...register("stock")}
                />
                <Input
                    label="Product ID"
                    placeholder="Enter Product ID"
                    className='w-full'
                    {...register("productId")}
                />
                {!Product && (
                    <>
                        <Input
                            label="Category Image"
                            type="file"
                            className="w-full border p-2 rounded-lg"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("featuredImages", { required: !Product })}
                        />
                        <Input
                            label="Owner"
                            value={admin}
                            className='w-full bg-gray-100 cursor-not-allowed'
                            readOnly
                            {...register("owner")}
                        />
                    </>
                )}
                <Button type="submit" className={`w-full py-2 rounded-lg text-white ${Product ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                    {Product ? "Update Product" : "Add Product"}
                </Button>
            </form>
        </div>
    );
}

export default ProductForm;
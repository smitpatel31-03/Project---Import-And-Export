import React from "react";
import service from "../../services/config.js";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Button, Input } from "../index.js";

function ProductPhotos({ product }) {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const submit = async (data) => {
        const formData = new FormData();
        
        // Append each file separately
        Array.from(data.image).forEach((file) => {
            formData.append("image", file); 
        });

        try {
            const dbProduct = await service.addImagesToProduct(product._id, formData);

            if (dbProduct) navigate(`/ProductDetails/${dbProduct._id}`);
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                <div className="w-2/3 px-2">
                    <Input
                        label="Category Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        multiple
                        {...register("image", { required: true })}
                    />

                    <Button type="submit" bgColor={product ? "bg-green-500" : undefined} className="w-full">
                        Upload
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ProductPhotos;

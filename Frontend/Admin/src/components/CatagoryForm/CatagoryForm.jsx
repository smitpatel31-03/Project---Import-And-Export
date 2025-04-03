import React,{useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from "../index.js"
import { useNavigate } from 'react-router'
import service from '../../services/config.js'


function CatagoryForm({ catagory }) {
    const { register, handleSubmit, reset } = useForm({});

    
  
    useEffect(()=>{
       if(catagory){
        reset({
                name: catagory?.name || "",
                description: catagory?.description || "",
        })
       }
    },[catagory?._id])

    


    const navigate = useNavigate();

    // Handle Image Change Manually

    const submit = async (data) => {
        try {
            
            let dbCatagory;
            if (catagory) {
                dbCatagory = await service.changeCatagoryDetails(catagory._id, { ...data });
            } else {
                dbCatagory = await service.addCatagory({ ...data });
            }

            if (dbCatagory) {
                navigate(`/`);
            }
        } catch (error) {
            console.error("Error submitting category:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2 bg-zinc-600 p-10">
                <Input
                    label='Name :'
                    {...register("name", { required: true })}
                    placeholder="Enter Category Name"
                    className="mb-4 p-2 border rounded w-full text-black"
                />

                <Input
                    label="Description :"
                    type='textarea'
                    {...register("description", { required: true })}
                    placeholder="Enter Category Description"
                    className="mb-4 p-2 border rounded w-full text-black"
                />

                {!catagory && (
                    <>
                        <Input
                            label="Category Image:"
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            className="mb-4 p-2 border rounded w-full"
                            {...register("image",{required:true})}
                        />
                    </>
                )}

                <Button
                    type="submit"
                    className={`w-full p-2 rounded ${catagory ? "bg-green-500" : "bg-blue-500"} text-white`}
                >
                    {catagory ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default CatagoryForm
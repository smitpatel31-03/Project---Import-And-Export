import conf from "../conf/conf.js";
import authServices from "./auth.js";
import axios from "axios";

export class Service{
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: conf.apiurl || "http://localhost:10000/api/v1/admin",
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
    }

    async addCatagory({name, description,image}){
        try {            
            const headers = {
                ...authServices.getAuthHeadersImage(),
                "Content-Type": "multipart/form-data",
            };
            image = image[0]            

            
            const response = await this.axiosInstance.post(`/addCatagory`,{name, description,image}, {headers})

            
            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Adding Catagory"
        }
    }

    async addProduct(catagoryId,{name,featuedImages , price, description, category, stock, owner, productId}){
        
        
        try {
            const headers = {
                ...authServices.getAuthHeadersImage(),
                "Content-Type": "multipart/form-data",
            };

            featuedImages = featuedImages[0]

            

            const response = await this.axiosInstance.post(`/addProduct/${catagoryId}`,
                {name, price, description, category, stock, owner, productId,featuedImages},
                {headers})
            
            return response.data

        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Adding Product"
        }
    }

    async changeCatagoryDetails(catagoryId,{name, description}){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.patch(`/changeCatagoryDetails/${catagoryId}`,{name, description},{headers})

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Adding Catagory"
        }
    }

    async changeProductDetails(productId,{name, price, description, category, stock, owner}){
        try {
            
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.patch(`/changeProductDetails/${productId}`,
                {name, price, description, stock, productId},
                {headers})
            
            return response.data.data

        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Adding Product"
        }
    }

    async changeCatagoryImage(catagoryId,{image}){
        try {
            const headers = {
                ...authServices.getAuthHeadersImage(),
                "Content-Type": "multipart/form-data",
            };

            console.log(image);
            
            image = image[0]  
            const response = await this.axiosInstance.patch(`/changeCatagoryImage/${catagoryId}`,{image},{headers})

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Adding Catagory"
        }
    }

    async changeProductImage(productId,{featuedImages}){
        try {
            const headers = {
                ...authServices.getAuthHeadersImage(),
                "Content-Type": "multipart/form-data",
            };
            featuedImages = featuedImages[0]  
            const response = await this.axiosInstance.patch(`/changeProductFeatureImage/${productId}`,{featuedImages},{headers})

            return response.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Adding Catagory"
        }
    }

    async addImagesToProduct(productId, formData) {
        try {
            const headers = {
                ...authServices.getAuthHeadersImage(),
                "Content-Type": "multipart/form-data",
            };
    
            const response = await this.axiosInstance.patch(
                `/addPhotosToProduct/${productId}`,
                formData, 
                { headers }
            );
    
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || "Something went wrong while adding images";
        }
    }
    

    async updateOrderDetails(orderId,{status,statusLocation}){
        try {
            
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.patch(`/updateOrderDetails/${orderId}`,{status,statusLocation},{headers})
            
            
            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Issue In Oeders Updation"
        }
    }

    async getCurruntOrders(){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/getCurruntOrders`,{headers})

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Currunt Order Not Found"
        }
    }

    async catagoryDetailsOrListOfCatagorysProduct(catagoryId){
        
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/catagoryDetailsOrListOfCatagorysProduct/${catagoryId}`,{headers})

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Catagies's Products Are Not Found"
        }
    }

    async getAllProducts(){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/getAllProducts`,{headers})
            
            return response.data
        } catch (error) {
            throw error.response?.data?.message || "Products Are Not Found"
        }
    }
    
    async getAllCatagories(){
        try {
            const token = localStorage.getItem('accessToken')
            

            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/getAllCatagories`,{headers})            

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Catagories Are Not Found"
        }
    }

    async getProductsDetails(productId){
        try {
            
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/getProductsDetails/${productId}`,{headers})

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Product Not Found"
        }
    }

    async getAdminDetails(){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/getAdminDetails`,{headers})

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Admin Not Found"
            
        }
    }

    async getOrderDetails(orderId){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/getOrderDetails/${orderId}`,{headers})
    
            return response.data.data
    
        } catch (error) {
            throw error.response?.data?.message || "Can Not Find Order"
        }
    }
}

const service = new Service()

export default service
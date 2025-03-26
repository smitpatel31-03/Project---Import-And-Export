import conf from "../conf/conf.js";
import authServices from "./auth.js";
import axios from "axios";

export class Service{
    constructor() {
        this.API_URL = conf.apiurl || "http://localhost:3000/api/auth";
        this.axiosInstance = axios.create({
            baseURL: this.API_URL,
            headers: {
                "Content-Type": "application/json"
            }
        });  
    }

    async addCatagory({name, description,image}){
        try {            
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.post(`${this.API_URL}/addCatagory`,{name, description,image},{headers})

            return response.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Adding Catagory"
        }
    }

    async addProduct(catagoryId,{name, price, description, category, stock, owner, productId}){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.post(`${this.API_URL}/addProduct/${catagoryId}`,
                {name, price, description, category, stock, owner, productId},
                {headers})
            
            return response.data

        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Adding Product"
        }
    }

    async changeCatagoryDetails(catagoryId,{name, description}){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.patch(`${this.API_URL}/changeCatagoryDetails/${catagoryId}`,{name, description},{headers})

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Adding Catagory"
        }
    }

    async changeProductDetails(productId,{name, price, description, category, stock, owner}){
        try {
            
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.patch(`${this.API_URL}/changeProductDetails/${productId}`,
                {name, price, description, stock, productId},
                {headers})
            
            return response.data.data

        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Adding Product"
        }
    }

    async changeCatagoryImage(catagoryId,{image}){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.patch(`${this.API_URL}/changeCatagoryImage/${catagoryId}`,{image},{headers})

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Adding Catagory"
        }
    }

    async changeProductImage(productId,{image}){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.patch(`${this.API_URL}/changeProductImage/${productId}`,{featuedImages},{headers})

            return response.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Adding Catagory"
        }
    }

    async addImagesToProduct(productId,{image}){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.patch(`${this.API_URL}/addPhotosToProduct/${productId}`,{image},{headers})

            return response.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong Whilr Adding Images"
        }
    }

    async updateOrderDetails(orderId,{status,statusLocation}){
        try {
            
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.patch(`${this.API_URL}/updateOrderDetails/${orderId}`,{status,statusLocation},{headers})
            
            
            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Issue In Oeders Updation"
        }
    }

    async getCurruntOrders(){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`${this.API_URL}/getCurruntOrders`,{headers})

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Currunt Order Not Found"
        }
    }

    async catagoryDetailsOrListOfCatagorysProduct(catagoryId){
        
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`${this.API_URL}/catagoryDetailsOrListOfCatagorysProduct/${catagoryId}`,{headers})

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Catagies's Products Are Not Found"
        }
    }

    async getAllProducts(){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`${this.API_URL}/getAllProducts`,{headers})
            
            return response.data
        } catch (error) {
            throw error.response?.data?.message || "Products Are Not Found"
        }
    }
    
    async getAllCatagories(){
        try {
            const token = localStorage.getItem('accessToken')
            

            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`${this.API_URL}/getAllCatagories`,{headers})            

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Catagories Are Not Found"
        }
    }

    async getProductsDetails(productId){
        try {
            
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`${this.API_URL}/getProductsDetails/${productId}`,{headers})

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Product Not Found"
        }
    }

    async getAdminDetails(){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`${this.API_URL}/getAdminDetails`,{headers})

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Admin Not Found"
            
        }
    }

    async getOrderDetails(orderId){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`${this.API_URL}/getOrderDetails/${orderId}`,{headers})
    
            return response.data.data
    
        } catch (error) {
            throw error.response?.data?.message || "Can Not Find Order"
        }
    }
}

const service = new Service()

export default service
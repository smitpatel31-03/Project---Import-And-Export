import axios from "axios";
import authServices from "./auth";
import conf from "../conf/conf";

export class Services  {
    constructor(){
        this.axiosInstance = axios.create({
            baseURL: conf.apiurl || "http://localhost:8000/api/v1/users",
            headers:{
                 "Content-Type": "application/json"
            }
        })
    }

    async bookOrder(productId,{quntity, userDeliveryAddress}){
        try {

            console.log("userDeliveryAddress :",userDeliveryAddress);
            
            
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.post(`/bookOrder/${productId}`,{quntity, userDeliveryAddress},{headers})


            return response.data
            

        } catch (error) {
            throw error.response?.data?.message || "Can not Book Order"
        }
    }

    async getOrder(){
        try {
            const headers = this.getAuthHeaders()
            
            const response = await this.axiosInstance.get(`/getUserOrders`,{headers})

            return response.data.data
            

        } catch (error) {
            throw error.response?.data?.message || "Can not Get Order"
        }
    }

    async getCurruntOrder(){
        try {
            
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/getCurruntOrder`,{headers})


            return response.data.data
            

        } catch (error) {
            throw error.response?.data?.message || "Can not Get Order Details"
        }
    }

    async getCurruntOrderDetails(orderId){
        try {
            
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/getCurruntOrderDetails/${orderId}`,{headers})

            return response.data.data[0]
        } catch (error) {
            throw error.response?.data?.message || "Can not Get Order Details"
        }
    }

    async getUserOrderDetails(orderId){
        try {
            
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/getUserOrderDetails/${orderId}`,{headers})

            return response.data.data[0]
        } catch (error) {
            throw error.response?.data?.message || "Can not Get Order Details"
        }
    }

    async getAllCatagory(){
        try {

            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/getAllCatagories`,{headers})

            return response.data.data
            
        } catch (error) {
            throw error.response?.data?.message || "Can not Get Catagory"
        }
    }

   
    async getCatagoryDetails(catagoryId){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/catagoryDetailsOrListOfCatagorysProduct/${catagoryId}`,{headers})


            return response.data.data
            

        } catch (error) {
            throw error.response?.data?.message || "Can not Get Order details"
        }
    }

    async getProductDetails(productId){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/getProductsDetails/${productId}`,{headers})

            return response.data.data
            

        } catch (error) {
            throw error.response?.data?.message || "Can not Get Product details"
        }
    }

    async getAllProduct(){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/getAllProducts/`,{headers})            

            return response.data.data
        
            

        } catch (error) {
            throw error.response?.data?.message || "Can not Get Products"
        }
    }

    async capturePaypalOrder({ orderID }) {
        try {
            const headers = authServices.getAuthHeaders();
            const response = await this.axiosInstance.post(
                `http://localhost:8000/api/v1/paypal/capture-order`, 
                { orderID }, 
                { headers }
            );
            
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || "Failed to capture PayPal order";
        }
    }
    
   
    

    getAuthHeaders() {
        const token = localStorage.getItem("accessToken");
        
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

}

const services = new Services()

export default services
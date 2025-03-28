import axios from "axios";
import authServices from "./auth";
import conf from "../conf/conf";

export class Services  {
    constructor(){
        this.APT_URL= conf.apiurl || "http://localhost:3000/api/auth"
        this.axiosInstance = axios.create({
            baseURL: this.APT_URL,
            headers:{
                 "Content-Type": "application/json"
            }
        })
    }

    async bookOrder(productId,{quntity, userDeliveryAddress}){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.post(`${this.APT_URL}/bookOrder/${productId}`,{quntity, userDeliveryAddress},{headers})

            console.log(response.data);

            return response.data
            

        } catch (error) {
            throw error.response?.data?.message || "Can not Book Order"
        }
    }

    async getOrder(){
        try {
            const headers = this.getAuthHeaders()
            
            const response = await this.axiosInstance.get(`${this.APT_URL}/getUserOrders`,{headers})

            return response.data.data
            

        } catch (error) {
            throw error.response?.data?.message || "Can not Get Order"
        }
    }

    async getOrderDetails(orderId){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`${this.APT_URL}/getCurruntOrder/${orderId}`,{headers})

            console.log(response.data);

            return response.data
            

        } catch (error) {
            throw error.response?.data?.message || "Can not Get Order Details"
        }
    }

    async getAllCatagory(){
        try {

            console.log('working');
            
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`${this.APT_URL}/getAllCatagories`,{headers})

            return response.data.data
            
        } catch (error) {
            throw error.response?.data?.message || "Can not Get Catagory"
        }
    }

   
    async getCatagoryDetails(catagoryId){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`${this.APT_URL}/catagoryDetailsOrListOfCatagorysProduct/${catagoryId}`,{headers})

            console.log(response.data.data);

            return response.data.data
            

        } catch (error) {
            throw error.response?.data?.message || "Can not Get Order details"
        }
    }

    async getProductDetails(productId){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`${this.APT_URL}/getProductsDetails/${productId}`,{headers})

            console.log(response.data);

            return response.data.data
            

        } catch (error) {
            throw error.response?.data?.message || "Can not Get Product details"
        }
    }

    async getAllProduct(){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`${this.APT_URL}/getAllProducts/`,{headers})

            console.log('response :',response.data.data);
            

            return response.data.data
        
            

        } catch (error) {
            throw error.response?.data?.message || "Can not Get Products"
        }
    }


    getAuthHeaders() {
        const token = localStorage.getItem("accessToken");
        console.log(token);
        
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

}

const services = new Services()

export default services
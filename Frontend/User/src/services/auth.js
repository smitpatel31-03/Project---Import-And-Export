import axios from "axios";
import conf from '../conf/conf.js'

export class AuthServices {
    constructor() {
        this.API_URL = conf.apiurl || "http://localhost:8000/api/v1/users";
        this.axiosInstance = axios.create({
            baseURL: this.API_URL,
            headers: {
                "Content-Type": "application/json"
            },

            withCredentials: true
        })
    }

    async registerUser({email, password, fullName, phoneNumber, country }) {
        try {
            const response = await this.axiosInstance.post(`${this.API_URL}/register`,{email, password, fullName, phoneNumber, country })
            const {accessToken, refreshToken} = response.data
    
        
                localStorage.setItem("accessToken",accessToken)
                localStorage.setItem("refreshToken",refreshToken)
    
                return response.data
        } catch (error) {
            
            throw error.response?.data?.message || "Registration Failed"
        }
    }

    async loginUser({email, password }) {
        try {
            const response = await this.axiosInstance.post(`${this.API_URL}/login`,{email, password })
            const {accessToken, refreshToken} = response.data.data
                
                localStorage.setItem("accessToken",accessToken)
                localStorage.setItem("refreshToken",refreshToken)
    
                return response.data.data
        } catch (error) {
            
            throw error.response?.data?.message || "Login Failed"
        }
    }

    async logoutAdmin() {
        try {
            const headers =  this.getAuthHeaders()
            const response = await this.axiosInstance.post(`${this.API_URL}/logout`,{headers})
            const {accessToken, refreshToken} = response.data
    
        
                localStorage.removeItem("accessToken",accessToken)
                localStorage.removeItem("refreshToken",refreshToken)
    
                return response.data
        } catch (error) {
            
            throw error.response?.data?.message || "Logout Failed"
        }
    }

    async getCurruntUser(){
       try {
         const headers = this.getAuthHeaders()
         const response = await this.axiosInstance.get(`${this.API_URL}/getCurruntUser`,{headers})
 
         console.log(response.data.data);
 
         return response.data.data
       } catch (error) {
         throw error.response?.data?.message || "Somethig Went Wrong Finding User"
       }
        
    }

    async getUserDetails(){
       try {
         const headers = this.getAuthHeaders()
         const response = await this.axiosInstance.get(`${this.API_URL}/getUserDetails`,{headers})
 
         console.log("response :",response);
         
      
         return response.data.data
       } catch (error) {
         throw error.response?.data?.message || "Somethig Went Wrong Findig User Details"
       }
        
    }

    async changrUserPassword({ oldPassword, newPassword, conformNewPassword }){
       try {
         const headers = this.getAuthHeaders()
         const response = await this.axiosInstance.patch(`${this.API_URL}/changeUsersCurruntPassword`,{ oldPassword, newPassword, conformNewPassword},{headers})
 
         console.log(response);
 
         return response.data
       } catch (error) {
         throw error.response?.data?.message || "Somethig Went Wrong While Changing Password"
       }
        
    }

    async changeUserDetails({ email,phoneNumber, fullName, country }){
       try {
         const headers = this.getAuthHeaders()
         const response = await this.axiosInstance.patch(`${this.API_URL}/changeUserDetails`,{ email, phoneNumber, fullName, country},{headers})
 
         console.log(response);
 
         return response.data
       } catch (error) {
         throw error.response?.data?.message || "Somethig Went Wrong While Changing Password"
       }
        
    }

    async addUserAddress( { name, addressLine1, addressLine2, city, postalCode, state, country, mobileNumber }){
       try {
         const headers = this.getAuthHeaders()
         const response = await this.axiosInstance.post(`${this.API_URL}/addAddress`, { name, addressLine1, addressLine2, city, postalCode, state, country, mobileNumber },{headers})
 
         console.log(response);
 
         return response.data
       } catch (error) {
         throw error.response?.data?.message || "Somethig Went Wrong While Add Address"
       }
        
    }

    async updateUserAddress(useraddressId, { name, addressLine1, addressLine2, city, postalCode, state, country, mobileNumber }){
       try {
         const headers = this.getAuthHeaders()
         const response = await this.axiosInstance.patch(`${this.API_URL}/updateUserAddress/${useraddressId}`, { name, addressLine1, addressLine2, city, postalCode, state, country, mobileNumber },{headers})
 
         console.log(response);
 
         return response.data
       } catch (error) {
         throw error.response?.data?.message || "Somethig Went Wrong While Update Address"
       }
        
    }

    async findUserAddress(userId){
       try {

         const headers = this.getAuthHeaders()
         const response = await this.axiosInstance.get(`${this.API_URL}/findUserAddress/${userId}`,{headers})
 
 
         return response.data.data[0].address
       } 
       catch (error) {
         throw error.response?.data?.message || "Somethig Went Wrong While Update Address"
       }
        
    }

    getAuthHeaders() {
        const token = localStorage.getItem("accessToken");
        return token ? { Authorization: `Bearer ${token}` } : {};
    }
}

const authServices = new AuthServices()

export default authServices
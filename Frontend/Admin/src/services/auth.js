import conf from "../conf/conf.js";
import axios from "axios";

export class AuthServices {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: conf.apiurl || "http://localhost:10000/api/v1/admin",
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
    }

    async registerAdmin({email, password, name, key, role}){
        try {
            
            const response = await this.axiosInstance.post(`/register`,{email, password, name, key, role},{withCredentials:true})
            const {accessToken, refreshToken} = response.data

    
            localStorage.setItem("accessToken",accessToken)
            localStorage.setItem("refreshToken",refreshToken)

            return response.data
            
        } catch (error) {
            throw error.response?.data?.message || "Registration Failed"
        }
    }

    async loginAdmin({email, password}){
        try {
            
            const response = await this.axiosInstance.post(
                "/login",
                { email, password },
                { withCredentials: true }
              );
              

            const {accessToken, refreshToken} = response.data.data

            localStorage.setItem("accessToken",accessToken)
            localStorage.setItem("refreshToken",refreshToken)

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Login Failed"
        }
    }

    async getCurruntAdmin(){
        try {
            const headers = await this.getAuthHeaders()
            const response = await this.axiosInstance.get(`/getCurruntAdmin`,{headers})
            
            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Somethig Went Wrong"
        }
    }

    async getAdminDetails(){
        try {
            const headers = this.getAuthHeaders()
            const response = await this.axiosInstance.get(`/getAdminDetails`,{headers})
            
            return response.data.data[0]
        } catch (error) {
            throw error.response?.data?.message || "Somethig Went Wrong"
        }

    }

    async logout() {
  try {
    const headers = this.getAuthHeaders()
    const response = await this.axiosInstance.post('/logout', {}, { headers })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    return response.data.data
  } catch (error) {
    console.error("Logout API Error:", error)
    throw error.response?.data?.message || "Something Went Wrong"
  }
}

    async adminRefreshAccessToken(){
        try {
            const headers = this.getAuthHeaders()
            const response = await this.axiosInstance.post(`/refresh-token`,{headers})
    
            const {accessToken, refreshToken} = response.data
    
                localStorage.setItem("accessToken",accessToken)
                localStorage.setItem("refreshToken",refreshToken)
    
                return response.data
        } catch (error) {
            throw error.response?.data?.message || "Access Response Token Failed"
        }
    }
    
    async changeAdminDetails({email,name}){
        try {
            const headers = this.getAuthHeaders();
            const response = await this.axiosInstance.patch(`/changeAdminDetails`,{email,name},{headers})
            
            const {accessToken,refreshToken} = response.data
            
            localStorage.setItem("accessToken",accessToken)
            localStorage.setItem("refreshToken",refreshToken)
            
            return response.data
            
        } catch (error) {
            throw error.response?.data?.message || "Something Wrong To Change Admin Details"
        }
    }
    
    async changeAdminRole({role, key}){
        try {
            const headers = this.getAuthHeaders();
            const response = await this.axiosInstance.patch(`/changeAdminRole`,{role, key},{headers})

            const {accessToken,refreshToken} = response.data

            localStorage.setItem("accessToken",accessToken)
            localStorage.setItem("refreshToken",refreshToken)

            return response.data

        } catch (error) {
            throw error.response?.data?.message || "Something Wrong To Change Admin Role"
        }
    }

    async changeAdminPassword({oldPassword, newPassword, conformNewPassword}){
        try {
            
            const headers = this.getAuthHeaders()
            const response = await this.axiosInstance.post(`/changeAdminCurruntPassword`,{oldPassword, newPassword, conformNewPassword},{headers})

            
            const {accessToken, refreshToken} = response.data

            localStorage.setItem("accessToken",accessToken)
            localStorage.setItem("refreshToken",refreshToken)

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Changeing Password"
        }
    }

    getAuthHeaders() {
        const token = localStorage.getItem("accessToken");
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    getAuthHeadersImage() {
        const token = localStorage.getItem("accessToken");
        return token ? { Authorization: `Bearer ${token}` } : {};
    }
    
}
const authServices = new AuthServices()

export default authServices
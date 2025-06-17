import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: localStorage.getItem('accessToken') ? true : false,
    userData: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status = true;
            state.userData = action.payload._id
        },
        logout:(state)=>{
            console.log("state :",state);         
            state.status = false
            state.userData = null
        }
    }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer
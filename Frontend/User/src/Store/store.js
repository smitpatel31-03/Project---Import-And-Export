import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
import curruncyConvertReducer from './curruncySlice.js'

const store = configureStore({
    reducer:{
        auth: authReducer,
        curruncyConvert: curruncyConvertReducer
    }
})

export default store
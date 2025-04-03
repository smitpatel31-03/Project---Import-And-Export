import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    convertedValue: null
}

const curruncySlice = createSlice({
    name:"curruncyConvert",
    initialState,
    reducers:{
        convert:(state,action)=>{
            state.convertedValue = action.payload
        }
    }
})

export const {convert} = curruncySlice.actions

export default curruncySlice.reducer
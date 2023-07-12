'use client';
import { createSlice } from "@reduxjs/toolkit";

export const inventorySlice=createSlice({
    name:"inventory",
    initialState:{value:false},
    reducers:
    {
        inventoryRefresh:(state,action)=>{
            state.value=!state.value
        },
    }
})

export const {inventoryRefresh}=inventorySlice.actions;
export default inventorySlice.reducer;


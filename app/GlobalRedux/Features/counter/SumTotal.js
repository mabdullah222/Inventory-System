'use client';
import { createSlice } from "@reduxjs/toolkit";

const billSlice=createSlice({
    name:'totalSum',
    initialState:{value:0},
    reducers:{
        createTotal:(state,action)=>{
            state.value+=action.payload
        },
        clearTotal:(state,action)=>{
            state.value=0
        }
    }
})


export const {createTotal,clearTotal}=billSlice.actions;
export default billSlice.reducer;
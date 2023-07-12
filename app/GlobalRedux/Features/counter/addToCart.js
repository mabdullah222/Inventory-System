'use client';
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice=createSlice({
    name:"Bill",
    initialState:{value:{names:[],products:[],counts:{}}},
    reducers:
    {
        addToCart:(state,action)=>{
            if (state.value.names.indexOf(action.payload.name)==-1){
                state.value.names.push(action.payload.name);
                state.value.products.push(action.payload);
                state.value.counts[action.payload.name]=0
            }
        },
        clearCart:(state,action)=>{
            state.value={names:[],products:[],counts:{}}
        },
        changeCount:(state,action)=>{
            state.value.counts[action.payload.name]=action.payload.count
        }
    }
})

export const {addToCart,clearCart,changeCount}=counterSlice.actions;

export default counterSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const updateSlice=createSlice({
    name:'updateItem',
    initialState:{value:{}},
    reducers:{
        addUpdateItem:(state,action)=>{
            action.payload.mfg=new Date(action.payload.mfg).toISOString().split('T')[0]
            action.payload.exp=new Date(action.payload.exp).toISOString().split('T')[0]
            state.value=action.payload;
        },
        removeUpdateItem:(state,action)=>{
            state.value={}
        }
    }
})

export const {addUpdateItem,removeUpdateItem}=updateSlice.actions;

export default updateSlice.reducer;
'use client';
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './Features/counter/addToCart'
import totalReducer from './Features/counter/SumTotal';
import inventoryReducer from "./Features/counter/inventory";
import updateReducer from "./Features/counter/updateItem"

export const store= configureStore({
    reducer:{
        Bill:counterReducer,
        sumTotal:totalReducer,
        inventory:inventoryReducer,
        updateItem:updateReducer,
    }
});


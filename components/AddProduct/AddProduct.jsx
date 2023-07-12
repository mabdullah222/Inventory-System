'use client'

import React,{useEffect, useState} from 'react'
import './AddProduct.scss'
import { inventoryRefresh } from '@/app/GlobalRedux/Features/counter/inventory'
import { useDispatch,useSelector } from 'react-redux'
import {removeUpdateItem} from '@/app/GlobalRedux/Features/counter/updateItem'

const AddProduct =  () => {
    const dispatch=useDispatch()
    const updateItem=useSelector(state=>state.updateItem.value)
    let [data,setData]=useState({'name':"",'category':"",'mfg':"",'exp':'','quantity':0,price:0})

    let DataChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        if (updateItem._id){
            
            setData(updateItem);
        }
        else{
            setData({'name':"",'category':"",'mfg':"",'exp':'','quantity':0,price:0})
        }
    },[updateItem])

    let addProduct= async (e)=>{
        e.preventDefault();

        let status=true;
        for (let keys in data){
            if (data[keys].trim()==''){
                status=false;
                break;
            }
        }

        if (new Date(data.mfg)>new Date(data.exp)){
            status=false;
        }
        if (status){
            let response=await fetch('http://localhost:3000/api/products',{
                method:'PUT',
                headers:{
                    "Content-Type":'application/json'
                },
                body:JSON.stringify(data)
            })
            
            let jresponse=await response.json()
            alert(jresponse.message)
            if (jresponse.status){
                setData({'name':"",'category':"",'mfg':"",'exp':'','quantity':0,price:0})
            }
            dispatch(inventoryRefresh())
        }
        else{
            alert("Field Missing")
        }
    }

    let handleUpdate=async (e)=>{
        e.preventDefault();
        let status=true;
        for (let keys in data){
            if (data[keys]==''){
                status=false;
                break;
            }
        }
        if (new Date(data.mfg)>new Date(data.exp)){
            status=false;
        }

        if (status){
            let response=await fetch('http://localhost:3000/api/products',{
                method:'PATCH',
                headers:{
                    "Content-Type":'application/json'
                },
                body:JSON.stringify(data)
            })
            
            let jresponse=await response.json()
            alert(jresponse.message)
            if (jresponse.status){
                setData({'name':"",'category':"",'mfg':"",'exp':'','quantity':0,price:0})
            }
            else{
                alert(jresponse.message)
            }
            dispatch(removeUpdateItem())
            dispatch(inventoryRefresh())
        }
        else{
            alert("Field Missing or Some field is Incorrect")
        }
    }
  return (
    <form className='AddProduct__form'>
        <h1>Add a  Product</h1>
        <div className='AddProductForm__category'>
            <label htmlFor="name">Product Name</label>
            <input onChange={DataChange} type="text" id='name' name='name' value={data.name}/>
        </div>
        <div className='AddProductForm__category'>
            <label htmlFor="category">Product Category</label>
            <input onChange={DataChange} type="text" id='category' name='category' value={data.category}/>
        </div>
        <div className='AddProductForm__category'>
            <label htmlFor="quantity">Product Quantity</label>
            <input onChange={DataChange} type="number" id='quantity' name='quantity' value={data.quantity}/>
        </div>
        <div className='AddProductForm__category'>
            <label htmlFor="mfg">MFG Date</label>
            <input onChange={DataChange} type="date" id='mfg' name='mfg'  value={data.mfg}/>
        </div>
        <div className='AddProductForm__category'>
            <label htmlFor="exp">Exp Date</label>
            <input onChange={DataChange} type="date" id='exp' name='exp'  value={data.exp}/>
        </div>
        <div className='AddProductForm__category'>
            <label htmlFor="price">Price</label>
            <input onChange={DataChange} type="number" id='price' name='price' value={data.price}/>
        </div>
        {updateItem._id?<div className='btn__grp'>
            <button className='AddProductForm__btn' onClick={()=>dispatch(removeUpdateItem())}>Cancel</button>
            <button className='AddProductForm__btn' onClick={handleUpdate}>Update</button>
        </div>:<button className='AddProductForm__btn' onClick={addProduct}>Add Product</button>}
    </form>
  )
}

export default AddProduct
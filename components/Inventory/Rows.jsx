'use client';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { inventoryRefresh } from '@/app/GlobalRedux/Features/counter/inventory';
import { addUpdateItem } from '@/app/GlobalRedux/Features/counter/updateItem';


const Rows = ({e}) => {
  const dispatch=useDispatch()

  const  handleDelete=async ()=>{
    let response=await fetch(`http://localhost:3000/api/products/delete/${e._id}`,{
      'method':'DELETE',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:e._id})
    })
    let jresponse=await response.json()
    if (jresponse.status){
      dispatch(inventoryRefresh())
    }
  }


  return (
    <tr>
        <td>{e.name}</td>
        <td>{e.category}</td>
        <td>{new Date(e.mfg).toLocaleDateString()}</td>
        <td>{new Date(e.exp).toLocaleDateString()}</td>
        <td>{e.price}</td>
        <td>{e.quantity}</td>
        <td><Button variant="primary" onClick={()=>{dispatch(addUpdateItem(e))}}>Update</Button></td>
        <td><Button variant="danger" onClick={handleDelete}>Delete</Button></td>
    </tr>
  )
}

export default Rows
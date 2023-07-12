'use client';
import React,{useState,useEffect} from 'react'
import './Inventory.scss'
import Table from 'react-bootstrap/Table';


import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Rows from './Rows';
import { useDispatch, useSelector } from 'react-redux';
import { inventoryRefresh } from '@/app/GlobalRedux/Features/counter/inventory';
import { Suspense } from 'react';


const Inventory = () => {
  const dispatch=useDispatch()
  const refresh=useSelector(state=>state.inventory.value)
  const [data,setData]=useState([])
  let [body,setBody]=useState({category:'*',query:''})
  async function getInventory(){
    let response=await fetch('http://localhost:3000/api/products',{
      method:'POST',
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(body)
    })
    let jresponse=await response.json();
    setData(jresponse.data)
  }

  useEffect(()=>{
    getInventory();
  },[body,refresh])



  return (
    <div className='ProductTable'>
      <InputGroup className="mb-3">
        <Form.Control aria-label="Text input with dropdown button" placeholder='Search Product' onChange={(e)=>setBody({...body,query:e.target.value})}/>

        <Form.Select aria-label="Default select example" onClick={(e)=>setBody({...body,category:e.target.value})}>
          <option value='*'>All</option>
          <option value="1">In Stock</option>
          <option value="0">Expired</option>
          <option value="-1">Out of Stock</option>
        </Form.Select>
      </InputGroup>
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
        <th>Name</th>
        <th>Category</th>
        <th>MFG</th>
        <th>EXP</th>
        <th>Price(Rs)</th>
        <th>Quantity Left</th>
        </tr>
      </thead>
      <tbody>
        <Suspense fallback={'Loading'}>
          {data.map(e=>{
            return (
              <Rows e={e} key={e._id}/>
            )
          })}
        </Suspense>
      
      </tbody>
    </Table>
    </div>
    
  )
}

export default Inventory
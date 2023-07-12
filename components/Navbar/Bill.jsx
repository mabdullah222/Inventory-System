import React, { useState } from 'react'
import {AiFillPlusCircle,AiFillMinusCircle} from 'react-icons/ai'
import { useSelector,useDispatch } from 'react-redux'
import { createTotal } from '@/app/GlobalRedux/Features/counter/SumTotal'
import { changeCount } from '@/app/GlobalRedux/Features/counter/addToCart'

const Bill = ({element}) => {
  const dispatch=useDispatch()
  const count=useSelector(state=>state.Bill.value.counts[element.name])

    let handleAdd=async ()=>{
      let response=await fetch('http://localhost:3000/api/search',{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({inc:1,dec:0,id:element._id})
      })
      let jresponse=await response.json()
      if (jresponse.message){
        dispatch(createTotal(element.price))
        dispatch(changeCount({name:element.name,count:count+1}))
      }
    }

    let handleSubtract=async ()=>{
      if (count>0){
          let response=await fetch('http://localhost:3000/api/search',{
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({inc:0,dec:1,id:element._id})
        })
        let jresponse=await response.json()
        if (jresponse.message){
          dispatch(createTotal(-element.price))
          dispatch(changeCount({name:element.name,count:count-1}))
        }
      }
      
    }
    console.log(typeof element._id)
  return (
    <div className='bill__container'>
            <div className='bill__container-data'>
                <span>{element.name}</span>
            </div>
            <div className='result__btn'>
                <button onClick={handleAdd}><AiFillPlusCircle size={30}></AiFillPlusCircle></button>
                <span>{count}</span>
                <button onClick={handleSubtract}><AiFillMinusCircle size={30}/></button>
            </div>
            </div>
  )
}

export default Bill
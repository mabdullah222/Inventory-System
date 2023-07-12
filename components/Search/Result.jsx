import React from 'react'
import './Result.scss'

import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/app/GlobalRedux/Features/counter/addToCart'
const Result = (props) => {
  const dispatch=useDispatch()
  return (
    <div className='result'>
        <h3>{props.element.name}</h3>
        <div className='result__btn'>
            <span>Quantity: {props.element.quantity}</span>
            <button onClick={()=>dispatch(addToCart(props.element))}><AiOutlineShoppingCart size={25}></AiOutlineShoppingCart></button>
        </div>
        
    </div>
  )
}

export default Result
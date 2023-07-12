'use client'

import React, { useState } from 'react'
import "./Navbar.scss"

import Image from 'next/image'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch,useSelector } from 'react-redux'
import { clearTotal } from '@/app/GlobalRedux/Features/counter/SumTotal'
import {clearCart} from '@/app/GlobalRedux/Features/counter/addToCart'
import Bill from './Bill'
import saveBill from '@/Lib/saveBill'

function Navbar() {
  const dispatch=useDispatch()
  const sumTotal=useSelector((state)=>state.sumTotal.value)
  const {names,products,counts}=useSelector(state=>state.Bill.value)
  const [show, setShow] = useState(false);

  const handleClose=()=>{setShow(false)}

  const handleCloseCheckout = () => {
    if (sumTotal>0){
      try{
        saveBill({items:counts,total:sumTotal})
        dispatch(clearTotal())
        dispatch(clearCart())
        setShow(false)
      }
      catch(error){
        alert(error.message);
      }
    }
  };
  const handleShow = () => setShow(true);
  
  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <Image src='/assets/inventory.png' alt="Logo" width={90} height={40} />
      </div>
      <div>
        <p className='p-text'>Stock Managment System</p>
      </div>
      <div className='app__navbar__cart'>
      <Button variant="primary" onClick={handleShow}>
        <AiOutlineShoppingCart size={40}/>
      </Button>
      </div>
      <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bill Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {products.map(e=>{
            return (
              <Bill key={e.name} element={e}></Bill>
            )
          })}
        </Modal.Body>
        <Modal.Footer>
          <p>Total Amount: {sumTotal}.00 Rs</p>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseCheckout}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    </nav>
  )
}

export default Navbar
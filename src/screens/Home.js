import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import Cart from '../components/Cart'
import Carousal from '../components/Carousal'

export default function Home() {
  return (
    <div>
      <div><Navbar/></div>
      <div><Carousal/></div>
       <div><Cart/></div> 
      <div><Footer/></div>
    </div>

  )
}

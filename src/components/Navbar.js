import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Model from '../Model';
import AddCart from '../screens/AddCart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  let data = useCart();
  const [cartView , setcartView] = useState(false)
  const Navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authToken")
    Navigate('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">GoFood</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
          </li>
          { (localStorage.getItem("authToken"))?
           <li className="nav-item">
           <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
         </li> 
         : ""
}
        </ul>
        { (!localStorage.getItem("authToken"))?
            <div className='d-flex'>
            <Link className="btn bg-white text-success mx-1" aria-current="page" to="/login">Login</Link>
            <Link className="btn bg-white text-success mx-1" aria-current="page" to="/signup">Signup</Link>
        </div>
        :
        <div>
         <div className='btn bg-white text-danger mx-2' onClick={()=>{setcartView(true)}}>
           My Cart{" "}
         <Badge pill bg="secondary">{data.length}</Badge>
          </div>
          {cartView ? <Model onClose={()=>{setcartView(false)}}><AddCart/></Model>:null}
          <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
            Logout
          </div>
        </div>

}
      
      </div>
    </div>
  </nav>
  )
}

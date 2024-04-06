import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';

export default function Cart(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const options = props.options;
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleAddCart = async () => {
    const selectedSize = priceRef.current.value;
    const selectedQty = parseInt(qty);

    if (!selectedSize || selectedQty <= 0) {
    
      return;
    }

    const selectedPrice = parseInt(options[selectedSize]) || 0;
    const newFinalPrice = selectedQty * selectedPrice;

    let food = null;

    for (const item of data) {
      if (item.id === props.foodItem.id) {
        food = item;
        break;
      }
    }

    if (food !== null) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem.id, price: newFinalPrice, qty: selectedQty });
      } else {
        await dispatch({
          type: "ADD",
          id: props.foodItem.id,
          name: props.foodItem.name,
          price: newFinalPrice,
          qty: selectedQty,
          size: selectedSize
        });
      }
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem.id,
        name: props.foodItem.name,
        price: newFinalPrice,
        qty: selectedQty,
        size: selectedSize
      });
    }

  
    setFinalPrice(newFinalPrice);
  }

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className='container'></div>
            <select className='m-2 h-100 bg-success' onChange={(e) => setQty(parseInt(e.target.value))}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1} </option>
                )
              })}
            </select>
            <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={() => setSize(priceRef.current.value)}>
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>{data}</option>
                )
              })}
            </select>
            <div className='d-inline h-100 fs-5'>₹{finalPrice}/-</div>
          </div>
          <hr></hr>
          <button className={`btn btn-success justify-center ms-2`} onClick={handleAddCart}>Add Cart</button>
        </div>
      </div>
    </div>
  );
}

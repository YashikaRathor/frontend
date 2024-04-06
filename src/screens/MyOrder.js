import React, { useEffect, useState } from 'react';
import Footer from '../components/footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    console.log("orderdata",orderData)

    const fetchMyOrder = async () => {
        try {
            console.log(localStorage.getItem('userEmail'));
            const response = await fetch("http://localhost:3001/api/myorder", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const responseData = await response.json();
            setOrderData(JSON.parse(responseData?.order_data?.order_data));
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error, e.g., show error message to the user
        }
    };
    
    useEffect(() => {
        fetchMyOrder();
    }, []);
    
    return (
        <div>
            <div>
                <Navbar />
            </div>  
            <div className='container'>
    <div className='row'>
        {Array.isArray(orderData) && orderData.reverse().map((item) => {
            console.log("item", item); // Add this console.log statement
            return  (
                item.map((arrayData) => {
                    console.log("arrayData", arrayData);
                    return (
                        <div key={arrayData.id}>
                            {arrayData.Order_date ? (
                                <div className='m-auto mt-5'>
                                    {setOrderData(arrayData.Order_date)} {/* Correct way to update state */}
                                    <hr />
                                </div>
                            ) : (
                                <div className='col-12 col-md-6 col-lg-3'>
                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                        <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{arrayData.name}</h5>
                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                <span className='m-1'>{arrayData.qty}</span>
                                                <span className='m-1'>{arrayData.size}</span>
                                                <span className='m-1'>{arrayData.orderData}</span> {/* Use arrayData.orderData here */}
                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                    ₹{arrayData.price}/-
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })
            )
        })}
    </div>
</div>



            <Footer />
        </div>
    )
}

import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';
import '../css/MyOrder.css'

export default function MyOrder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch data from backend when component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const userEmail = localStorage.getItem('Useremail');
            const response = await axios.get(`https://cater-orange-backend.vercel.app/api/Myorders?email=${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response data:', response.data);
            console.log("orders:", response.data.orderData)
            setOrders(response.data.orderData.order_data); // Assuming response.data is an object with an 'orderData' property
        } catch (error) {
            console.error('Error fetching orders', error);
        }
    };

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="orders-container">
                <h1>Orders</h1>
                <div>
                    {orders.slice().reverse().map((order, index) => (
                        <div className="order" key={orders.length - index}>
                            <h2>Order {orders.length - index}</h2>
                            <p className="order-date">Order Date: {order.Order_date}</p>
                            <ul className="order-details">
                                {Object.values(order).map((item, i) => (
                                    typeof item === 'object' && // Check if item is an object
                                    i !== Object.values(order).length - 1 && // Exclude Order_date
                                    <li key={i}>
                                        <p>Name: {item.name}</p>
                                        <p>Quantity: {item.qty}</p>
                                        <p>Size: {item.size}</p>
                                        <p>Price: {item.price}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

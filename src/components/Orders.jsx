import React, { useEffect, useState } from 'react';
import '../styles/components/Orders.scss';
import axios from 'axios';
import { Order } from '../components/Order';
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_ORDER_HOST}/v1/order`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                );

                console.log(response.data.content.data);
                setOrders(response.data.content.data);
            } catch (error) {
                console.log(error);
                if (error.response.status === 401) {
                    navigate("/signin");
                }
            }
        };

        fetchOrder();
    }, []);

    return (
        <div className='orders-container flex flex-col'>
            <h1 className='text-lg'>Order history</h1>

            <div>
                {orders.map((order) => (
                    <Order orderId={order.id} key={order.id} />
                ))}
            </div>
        </div>
    );
};

export default Orders;

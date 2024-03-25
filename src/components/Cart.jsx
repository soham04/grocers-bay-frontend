import { React, useContext, useState } from 'react';

import '../styles/components/cart.scss'
import Cart_item from '../components/Cart_item'
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import empty_cart from '../images/empty_cart.jpg'
import { useEffect } from 'react';
import api from '../utils/axios.utils';
import axios from 'axios';
import { Checkout } from '../components/Checkout';
import { useHistory, useNavigate } from 'react-router-dom'; // Import useHistory hook

const Cart = () => {
    // const { user } = useContext(AuthContext)
    const navigate = useNavigate();

    const [charges, setCharges] = useState(0);
    const [checkout, setCheckout] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [error, setError] = useState(false)

    const { cartItems } = useContext(CartContext)
    console.log(cartItems);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `${process.env.REACT_APP_PRODUCT_HOST}/v1/cart/total`;
                const response = await axios.post(apiUrl, cartItems);
                console.log(response);

                setCharges(response.data.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [cartItems])

    async function createOrder(cartItems) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_ORDER_HOST}/v1/order`,
                cartItems,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            console.log(response);



            if (response.status === 200) {
                return response.data.orderId;
            } else {
                console.log("Error placing order:ff", response.data);
                return null;
            }
        } catch (error) {



            if (error.response.status === 401) {
                navigate("/signin");
            }


            console.error("Error placing order:", error);
            return null;
        }
    }


    const handleCheckout = async () => {
        const orderId = await createOrder(cartItems)

        if (orderId) {
            setOrderId(orderId)
            setCheckout(true)
        } else {
            setError(true)
        }
    }

    if (error) {
        return (<>
            <h1>ERROR</h1>
        </>)
    }
    // if (checkout) {
    // return (

    // )
    // } else {
    return (
        <>
            <div className='cart-container'>
                <div className='cart-items-container'>
                    {cartItems.length ? (
                        <>
                            {cartItems.map((product, index) => (
                                <Cart_item
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </>
                    ) : (
                        <img src={empty_cart} class="w-50 h-50"></img>
                    )}
                </div>


                <div className='white-line'></div>
                <div className='right-container'>
                    <div className='bill-container'>
                        <h3 className='order-summary-wrapper'>Order Summary</h3>
                        <table className='bill-table'>
                            <tr>
                                <td>Subtotal ({cartItems.reduce((total, currentItem) => total + currentItem.quantity, 0)}) Items</td>
                                <td className='quantity'>$ {charges.subtotal ? charges.subtotal : 0}</td>
                            </tr>
                            <tr>
                                <td>Tax({charges.taxPercent}%)</td>
                                <td className='quantity'>$ {charges.tax ? charges.tax : 0}</td>
                            </tr>
                            <tr>
                                <td className='total'>Total</td>
                                <td className='quantity total'>$ {charges.total}</td>
                            </tr>
                        </table>
                    </div>

                    <button className='checkout-wrapper' disabled={checkout} onClick={handleCheckout}>{checkout ? "Complete the Payment" : "Checkout"}</button>

                    {checkout &&
                        (<div className='flex text-white'>
                            <Checkout orderId={orderId} />
                        </div>)
                    }

                </div>
            </div>
        </>
    )
    // }


}

export default Cart


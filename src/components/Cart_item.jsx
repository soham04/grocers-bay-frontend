import React, { useEffect, useState, useContext } from 'react';
import '../styles/components/Cart_item.scss';
import api from '../utils/axios.utils';
import { CartContext } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CartItem = ({ product }) => {
    const { removeFromCart, addToCart, removeProductFromCart } = useContext(CartContext);
    const [productDetails, setProductDetails] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `${process.env.REACT_APP_PRODUCT_HOST}/v1/product/${product.id}`;
                const response = await axios.get(apiUrl);
                console.log(response);

                setProductDetails(response.data.content);
                console.log(productDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(productDetails);
    }, [productDetails]);


    return (
        <div className="cart-item-container">
            {productDetails && (
                <div className='product-wrapper'>
                    <img className="product-image" src={productDetails.thumbnail} alt="Product" />
                    <div className="product-details-cart">
                        <h3 className="product-name">{productDetails.title}</h3>
                        <p className="price-per-unit">${productDetails.price}</p>
                        <div className="quantity-details">
                            <div className="decrease-btn"
                                onClick={() => {
                                    removeFromCart({ id: productDetails._id })
                                }}
                                disabled={product.quantity === 1}
                            >
                                <FontAwesomeIcon icon={faMinus} style={{ color: "#000000", }} />
                            </div>
                            <p className="quantity">Qty {product.quantity}</p>
                            <div className="increase-btn"
                                onClick={() => {
                                    addToCart({ id: productDetails._id })
                                }}
                            >
                                <FontAwesomeIcon icon={faPlus} style={{ color: "#000000", }} />
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
            <div className="additional-details">
                <p className="total-price">${productDetails ? productDetails.price * product.quantity : 0}</p>
                <button className="remove-btn" onClick={() => removeProductFromCart({ id: product.id })}>Remove</button>
            </div>
        </div >
    );
};

export default CartItem;

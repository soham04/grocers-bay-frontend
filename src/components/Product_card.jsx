import { React, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/ProductCard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';




const ProductCard = ({ product }) => {
    const { getQuantityOfProduct, cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
    const { _id, title, thumbnail, price } = product;

    // attributes: ['id', 'title', 'image_path', 'description', 'sku', 'category_id', 'price'] // Adjust attributes accordingly
    const rating = 3.5
    const [quantity, setQuantity] = useState(0);
    // console.log(quantity);

    useEffect(() => {
        console.log(getQuantityOfProduct({ id: _id }));
        setQuantity(getQuantityOfProduct({ id: _id }))

    }, [quantity])

    const addToCartHandler = () => {
        console.log(_id);
        addToCart({ id: _id });
        setQuantity(quantity + 1)
    }

    const removeToCartHandler = () => {
        console.log(_id);
        removeFromCart({ id: _id });
        setQuantity(quantity - 1)
    }

    // Function to generate stars based on the rating
    const renderStars = () => {
        const starCount = Math.round(rating); // Assuming rating is out of 5
        const stars = [];

        let i;
        for (i = 0; i < starCount; i++) {
            stars.push(<span key={i}>&#9733;</span>); // Unicode star character
        }

        for (; i < 5; i++) {
            stars.push(<span key={i}>&#9734;</span>); // Unicode star character
        }

        return stars;
    };

    // Function to truncate the product name to 20 characters
    const truncateProductName = (name, maxLength) => {
        return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
    };

    const truncatedTitle = truncateProductName(title, 20);

    return (
        <>
            {/* <Link to={`/products/${us_item_id}`}> */}
            <div className="product-card">
                <img src={thumbnail} alt={title} loading='lazy' className="product-image" />
                <div className="product-info">
                    <div className="product-rating">{renderStars()}</div>
                    <div className='product-price'>${price}</div>
                    <Link to={`/products/${_id}`} className="product-link">
                        <p className="product-name">{truncatedTitle}</p>
                    </Link>



                    <div className="quantity-controls">
                        {quantity > 0 && (
                            <div className="quantity-details">
                                <div className="decrease-btn"
                                    onClick={() => {
                                        removeToCartHandler(_id)
                                    }}
                                    disabled={quantity === 1}
                                >
                                    <FontAwesomeIcon icon={faMinus} style={{ color: "#000000", }} />
                                </div>
                                <p className="quantity">Qty {quantity}</p>
                                <div className="increase-btn"
                                    onClick={() => {
                                        addToCartHandler(_id)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPlus} style={{ color: "#000000", }} />
                                </div>
                            </div>
                        )}
                        {!quantity && (
                            <button className="add-to-cart-button" onClick={addToCartHandler}>
                                <FontAwesomeIcon icon={faCartPlus} />
                            </button>
                        )}
                    </div>


                </div>
            </div>
            {/* </Link> */}
        </>
    );
};

export default ProductCard;

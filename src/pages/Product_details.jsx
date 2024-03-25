// ProductDetails.js

import React, { useState, useEffect } from 'react';
import '../styles/pages/Product_details.scss';
import { useParams } from 'react-router-dom';
import api from '../utils/axios.utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import ImageViewer from '../components/imageViewer';
import NutritionNavigator from '../components/NutritionNavigator';
import DescriptionBox from '../components/Description';
import axios from 'axios';
const ProductDetails = () => {
    const { id } = useParams();
    // console.log(id);
    const [product, setProduct] = useState(null);
    const apiUrl = `${process.env.REACT_APP_BACKEND_HOST}/v1/product/${id}`;
    const rating = 3.5

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                setProduct(response.data.content);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchData();
    }, [apiUrl]);

    if (!product) {
        // Add loading state or spinner while fetching data
        return <div>Loading...</div>;
    }

    const { title, thumbnail, short_description, long_description, sku, category_id, price, category, images, nutritional_info } = product;

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


    return (
        <div className="product-details">
            <div className='left-section'>
                <div className="image-viewer-container">
                    <ImageViewer images={images} />
                </div>

                <NutritionNavigator nutritionData={nutritional_info} />
            </div>
            <div className='right-section'>
                <h1 className="product-name">{title}</h1>
                <div className="product-rating">{renderStars()}</div>
                <div className="product-info">
                    <p className="product-price">$ {price}</p>
                    <div className='add-to-cart-bt'>Add to cart</div>
                    <DescriptionBox short_description={short_description} long_description={long_description} />
                    {/* <p className="product-description">{description}</p> */}
                </div>
                <div className='receipe'>AI receipe</div>
            </div>
        </div>
    );
};

export default ProductDetails;

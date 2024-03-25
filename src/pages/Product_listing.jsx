import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import '../styles/pages/Product_listing.css';
import ProductsCard from '../components/Product_card';
import api from '../utils/axios.utils';
import PageNavigator from '../components/PageNavigator';
import axios from 'axios';
// import { CartContext } from '../context/CartContext';

const ProductsDisplay = ({ searchQuery }) => {
    const [productData, setProductData] = useState([]);
    const [Metadata, setMetaData] = useState({
        "total": 0,
        "pages": 0,
        "page": 0
    })
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Fetch data from the API using the CORS proxy
        const fetchData = async () => {
            try {
                const apiUrl = `${process.env.REACT_APP_BACKEND_HOST}/v1/product` + (searchQuery ? '/search' : '')
                console.log(apiUrl);
                console.log(searchQuery);
                const response = await axios.get(apiUrl, {
                    params: {
                        page: currentPage,
                        searchTerm: searchQuery // Pass the search query as a parameter
                    },
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true // Set credentials to true
                    });

                    
                // const response = await ax
                console.log(response);
                // Extract the organic_results from the API response
                const data = response.data.content.data || [];
                console.log(data);
                // Update the state with the organic_results data
                setProductData(data);
                setMetaData(response.data.content.meta);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchQuery, currentPage]); // Empty dependency array to fetch data only once when the component mounts

    return (
        <>
            <div className='product-listing'>
                <div className='product-display-container'>
                    {productData.map((product, index) => (
                        <ProductsCard key={index} product={product} />
                    ))}
                </div>
                <PageNavigator
                    currentPage={Metadata.page}
                    totalPages={Metadata.pages}
                    setCurrentPage={setCurrentPage} />
            </div>
        </>
    );
};

export default ProductsDisplay;

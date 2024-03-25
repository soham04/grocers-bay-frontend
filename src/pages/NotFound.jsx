import React from 'react';
import '../styles/pages/NotFound.scss'; // Import your CSS file for styling
import not_found from '../images/not_found.webp'

const NotFound = () => {
    return (
        <div className="not-found-container">
            <img src={not_found} className='not-found-image'></img>
            {/* <h2 className="not-found-heading">404 - Not Found</h2> */}
            <p className="not-found-message">The page you're looking for does not exist.</p>
            {/* You can include additional content or links here */}
        </div>
    );
};

export default NotFound;

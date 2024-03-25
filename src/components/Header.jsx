// Header.js
import { React, useContext, useState } from 'react';
import "../styles/components/Header.scss"
import icon from "../images/icon.png"
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
import { faArrowRightFromBracket, faMagnifyingGlass, faRectangleList, faUser } from '@fortawesome/free-solid-svg-icons';
// import { AuthContext } from '../context/AuthContext';
// import { faChevronDown } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { isLoggedIn, firstName, lastName, email, setIsLoggedIn } = useAuth();
    console.log(isLoggedIn);
    const navigate = useNavigate();


    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        // Pass the query to the parent component to handle search
    };

    const handleKeyPress = (event) => {
        // Trigger search when Enter key is pressed to search
        if (event.key === 'Enter') {
            onSearch(searchQuery);
        }
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // setIsDropdownOpen(true)
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDropdownClose = () => {
        setIsDropdownOpen(false);
    };

    const handleSignOut = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_AUTH_DOMAIN}/v1/customer/logout`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true // Set credentials to true
            });
            console.log(response.data); // Assuming the server responds with a message upon successful sign-out
            // Perform any additional actions after sign-out (e.g., redirect to another page)

            setIsLoggedIn(false)
            navigate("/home")

        } catch (error) {
            console.error('Error signing out:', error);
            // Handle sign-out error
        }
    };


    return (
        <>
            <header>
                <div className="header-container">
                    <div className='section1'>
                        <img src={icon}></img>
                        <h1 ><NavLink to="/home" className='name-wrapper'>Grocers Bay</NavLink></h1>
                        <nav >
                            <ul>
                                <li>
                                    <NavLink to="/home">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/products">Products</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/cart">Cart</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <>
                        <div className='section2'>
                            <div className='search_container'>
                                <div className='search-input-wrapper'>
                                    <input className='search-input'
                                        onChange={handleSearchInputChange}
                                        onKeyDown={handleKeyPress}
                                        placeholder='Search Grocery'></input>
                                </div>
                                <div className='search-icon-wrapper' onClick={handleKeyPress}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#96ca62", }} />
                                </div>
                            </div>

                            {!isLoggedIn ?
                                (<div className='login-bts'>
                                    <Link to="/signin"><div className='signin-bt'>SignIn</div></Link>
                                    <Link to="/signup"><div className='signup-bt'>SignUp</div></Link>
                                </div>)
                                :
                                (
                                    <div className="dropdown" onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownClose}>
                                        <div className="dropdown-toggle">{firstName}</div>
                                        <FontAwesomeIcon icon={faChevronDown} style={{ color: "#96ca62", }} />

                                        {isDropdownOpen && (
                                            <div className="dropdown-menu z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">

                                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                    <div>{firstName} {lastName}</div>
                                                    <div className="font-medium truncate">{email}</div>
                                                </div>

                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                                                    <li>
                                                        <a href="/userprofile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Account</a>
                                                    </li>
                                                    <li>
                                                        <a href="/orders" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Orders</a>
                                                    </li>
                                                </ul>
                                                <div className="py-1">
                                                    <a onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                                </div>
                                            </div>
                                        )}
                                    </div>


                                )}
                        </div>
                    </>
                </div>
            </header>
            <Outlet />
        </>
    );
};

export default Header;

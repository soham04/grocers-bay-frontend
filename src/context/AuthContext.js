// AuthContext.js
import { faL } from '@fortawesome/free-solid-svg-icons';
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/axios.utils';
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');


    useEffect(() => {
        // Check if a token is stored in localStorage or cookies
        // let storedToken = localStorage.getItem('token') || getCookie('token');

        const validateToken = async () => {
            try {
                // Make a request to the server to validate the token
                const response = await axios.get(`${process.env.REACT_APP_AUTH_HOST}/v1/verify/loggedin`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true // Set credentials to true
                });

                console.log(response);

                if (response.status == 200) {
                    // Token is valid, set isLoggedIn to true
                    setIsLoggedIn(true);
                    setFirstName(response.data.user.firstName)
                    setLastName(response.data.user.lastName)
                    setEmail(response.data.user.email)

                } else {
                    // Token is invalid or expired, set isLoggedIn to false
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error validating token:', error);
            }
        };

        validateToken()

    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, firstName, lastName, email, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

// useAuth hook to access the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Function to retrieve cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

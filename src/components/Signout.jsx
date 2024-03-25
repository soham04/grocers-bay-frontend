// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';


const SignOut = () => {
    const [isSignedOut, setIsSignedOut] = useState(false);
    const [signOutMessage, setSignOutMessage] = useState('');

    useEffect(() => {
        const signOut = async () => {
            try {
                await firebase.auth().signOut();
                const user = firebase.auth().currentUser;
                if (user) {
                    // The user is still signed in for some reason
                    setSignOutMessage('Error signing out. Please try again.');
                } else {
                    // The user has successfully signed out
                    setIsSignedOut(true);
                    setSignOutMessage(`Signed out of ${user.email}`);
                }
            } catch (error) {
                console.error('Error signing out:', error.message);
                setSignOutMessage('Error signing out. Please try again.');
            }
        };

        signOut();
    }, []);

    if (isSignedOut) {
        // Redirect to "/home" after sign-out
        return <Redirect to="/home" />;
    }

    return (
        <div>
            {/* Display sign-out message */}
            <p>{signOutMessage}</p>
        </div>
    );
};

export default SignOut;

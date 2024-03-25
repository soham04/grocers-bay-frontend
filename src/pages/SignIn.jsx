import React, { useState } from 'react';
import '../styles/pages/SignIn.scss'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAt, faLock, faPhone, faCheck, faKey } from '@fortawesome/free-solid-svg-icons';
import { auth, provider, fireStoreDB } from '../utils/firebase.utils';
import { createUserWithEmailAndPassword, EmailAuthProvider } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider, sendSignInLinkToEmail } from 'firebase/auth'
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { useContext } from 'react';
// import { authContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import api from '../utils/axios.utils';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const SignInPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setIsLoggedIn } = useAuth()

    const handleSignIn = async () => {
        setLoading(true)
        setError('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_AUTH_HOST}/v1/customer/login`, {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true // Set credentials to true
            });

            console.log(response);
            const data = await response.data;
            if (response.status == 200) {
                console.log(data);
                setIsLoggedIn(true)
                // login(data)
                navigate("/products")
            } else {
                console.log(data.message);
                setError(data.message);
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setError('Something went wrong', error);
        } finally {
            setLoading(false)
        }
    };

    // function setCookie(name, value, days) {
    //     const date = new Date();
    //     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    //     const expires = "expires=" + date.toUTCString();
    //     document.cookie = name + "=" + value + ";" + expires + ";path=/";
    // }

    return (
        <div className="signin-container">
            <div className='signin-option-box'
                style={{
                    opacity: loading ? 0.5 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                }}>

                <>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            // handleSignInEmail();
                        }}
                        className="signin-form"
                    >

                        <h3>Welcome user</h3>
                        <p>Login to get started</p>
                        <div className="form-group">
                            <div className="input__box">
                                <div className="icon">
                                    <FontAwesomeIcon icon={faAt} style={{ color: "#4986f1" }} />
                                </div>
                                <div className="input__wrapper">
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        // id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input__box">
                                <div className="icon">
                                    <FontAwesomeIcon icon={faKey} style={{ color: "#28fb41" }} />
                                </div>
                                <div className="input__wrapper">
                                    <input
                                        placeholder="Password"
                                        type="password"
                                        // id="passwro"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <div className="form-group">
                                    <div className="input__box checkbox">
                                        <div className="icon">
                                        </div>
                                        <div className="input__wrapper checkbox-wrapper">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={acceptTerms}
                                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                                    required
                                                />
                                                <span>  I accept the Terms and Conditions</span>
                                            </label>
                                        </div>
                                    </div>
                                </div> */}
                        {error && <p className="error-message">{error}</p>}
                        <div className='submit__wrapper' onClick={handleSignIn} role="button" tabIndex={0}>
                            {loading ? 'Logging in...' : 'Login'}
                        </div>
                    </form>
                </>

            </div>
        </div >
    );
};
export default SignInPage;

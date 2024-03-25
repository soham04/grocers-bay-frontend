import React, { useState } from 'react';
import '../styles/pages/SignIn.scss'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAt, faLock, faEnvelopeCircleCheck, faPhone, faCheck, faKey, faAddressCard, faCity, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { auth, provider, fireStoreDB } from '../utils/firebase.utils';
import { createUserWithEmailAndPassword, EmailAuthProvider } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider, sendSignInLinkToEmail } from 'firebase/auth'
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { useContext } from 'react';
import { authContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";


const SignInPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [password, setPassword] = useState('');


    const [acceptTerms, setAcceptTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleSignIn = async () => {
        setLoading(true)
        setError('');

        try {
            const response = await fetch(`${process.env.REACT_APP_AUTH_HOST}/v1/customer/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, firstName, lastName, password, phoneNumber, addressLine1, addressLine2, city, pincode }),
            });
            const data = await response.json();
            if (response.status == 201) {
                // console.log("hi");
                // navigate("/products")
                setEmailSent(true)
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



    return (
        <div className="signin-container">
            <div className='signin-option-box'
                style={{
                    opacity: loading ? 0.5 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                }}>
                {!emailSent &&
                    (
                        <>
                            <div
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    // handleSignInEmail();
                                }}
                                className="signin-form"
                            >

                                <h3>Welcome user</h3>
                                <p>Login to get started</p>

                                <div className="form-group ">
                                    <div className="input__box">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faAt} style={{ color: "#4986f1" }} />
                                        </div>
                                        <div className="input__wrapper px-2">
                                            <input
                                                placeholder="Email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input__box justify-stretch">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faUser} style={{ color: "#28fb41" }} />
                                        </div>
                                        <div className='flex justify-items-end'>
                                            <div className="input__wrapper px-2">
                                                <input
                                                    placeholder="First Name"
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    required
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="input__wrapper px-2">
                                                <input
                                                    placeholder="Last Name"
                                                    type="text"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    required
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input__box">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faPhone} style={{ color: "#28fb41" }} />
                                        </div>
                                        <div className="input__wrapper px-2">
                                            <input
                                                placeholder="Phone Number"
                                                type="tel"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
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
                                        <div className="input__wrapper px-2">
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

                                <div className="form-group">
                                    <div className="input__box">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faAddressCard} style={{ color: "#28fb41" }} />
                                        </div>
                                        <div className="input__wrapper px-2">
                                            <input
                                                placeholder="Address Line 1"
                                                type="text"
                                                value={addressLine1}
                                                onChange={(e) => setAddressLine1(e.target.value)}
                                                required
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input__box">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faAddressCard} style={{ color: "#28fb41" }} />
                                        </div>
                                        <div className="input__wrapper px-2">
                                            <input
                                                placeholder="Address Line 2"
                                                type="text"
                                                value={addressLine2}
                                                onChange={(e) => setAddressLine2(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group justify-items-stretch">
                                    <div className="input__box">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faCity} style={{ color: "#28fb41" }} />
                                        </div>
                                        <div className="input__wrapper px-2">
                                            <input
                                                placeholder="City"
                                                type="text"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                required
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input__box">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faMapPin} style={{ color: "#28fb41" }} />
                                        </div>
                                        <div className="input__wrapper px-2">
                                            <input
                                                placeholder="Pincode"
                                                type="text"
                                                value={pincode}
                                                onChange={(e) => setPincode(e.target.value)}
                                                required
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
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
                                </div>
                                {error && <p className="error-message">{error}</p>}
                                <div className='submit__wrapper' onClick={handleSignIn} role="button" tabIndex={0}>
                                    {loading ? 'Registering in...' : 'Register'}
                                </div>
                            </div>
                        </>
                    )}
                {
                    emailSent && (
                        <div className='signin-form'>
                            <FontAwesomeIcon icon={faEnvelopeCircleCheck} className='h-10' style={{ color: "#FFD43B", }} />                            <h1>Email Sent!</h1>
                            <p>Please check your inbox for a verification email.</p>
                            <p>Click on the verification link to complete the signin process.</p>
                        </div>
                    )
                }
            </div>
        </div >
    );
};
export default SignInPage;

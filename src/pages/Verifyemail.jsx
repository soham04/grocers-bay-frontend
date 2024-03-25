import React, { useState, useEffect } from 'react';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireStoreDB } from '../utils/firebase.utils';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Verifyemail.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faCircleCheck, faLock, faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";


const Verifyemail = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [countdown, setCountdown] = useState(5); // Initial countdown time in seconds
    const navigate = useNavigate();

    const handleCompleteProfile = async () => {
        // await createUserWithEmailAndPassword(auth, email, password).then(async (credential) => {
        //     const user = credential.user;
        // User does not exist, add the user to Firestore

        await setDoc(doc(fireStoreDB, "Users", email), {
            // uid: user.uid,
            display_name: firstName + lastName,
            email: email,
            phoneNumber: phoneNumber,
            emailVerified: true,
            // accessToken: user.accessToken,
            password: password,
            creationTime: new Date(),
            lastSignInTime: new Date(),
        });
        setError("");
        console.log("Document written");
        // console.log(credential);
        // });

    }

    useEffect(() => {
        console.log(navigate);
        console.log("Ran useEffect");
        const auth = getAuth();

        const verifyEmail = async () => {
            if (isSignInWithEmailLink(auth, window.location.href)) {
                let email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    email = window.prompt('Please provide your email for confirmation');
                }

                try {
                    const result = await signInWithEmailLink(auth, email, window.location.href);
                    // window.localStorage.removeItem('emailForSignIn');
                    setLoading(false);
                    setEmail(email)
                    console.log(result);
                } catch (error) {
                    setLoading(false);
                    setError('Error verifying email link. Please try again.');
                    console.error(error);
                }
            } else {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [window.location.href]);



    return (
        <div className='verify-email-container'>
            {loading ? (
                <p className='loading'>Loading...</p>
            ) : error ? (
                <div className='error'>
                    <FontAwesomeIcon className='error-icon' icon={faTriangleExclamation} style={{ color: "#ec5818", }} />
                    <p >{error}</p>
                </div>
            ) : (
                <div className='success'>
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#3fe71d", }} />
                    <h1>Email Verified Successfully!</h1>
                    <p>Complete the profile to continue</p>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleCompleteProfile();
                        }}
                        className="signup-form"
                    >

                        {/* <h3>Create Account</h3> */}
                        {/* <p>Sign up to get started</p> */}
                        <div className="form-group">
                            <div className="input__box">
                                <div className="icon">
                                    <FontAwesomeIcon icon={faUser} style={{ color: "#96ca62" }} />
                                </div>
                                <div className="input__wrapper firstname">
                                    <input
                                        placeholder="First Name"
                                        type="text"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="input__wrapper lastname">
                                    <input
                                        placeholder="Last Name"
                                        type="text"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>

                            </div>
                        </div>
                        {/* <div className="form-group">
                            <div className="input__box">
                                <div className="icon">
                                    <FontAwesomeIcon icon={faAt} style={{ color: "#4986f1" }} />
                                </div>
                                <div className="input__wrapper">
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div> */}
                        <div className="form-group">
                            <div className="input__box">
                                <div className="icon">
                                    <FontAwesomeIcon icon={faLock} style={{ color: "#9166cc" }} />
                                </div>
                                <div className="input__wrapper">
                                    <input
                                        placeholder='Password'
                                        type="password"
                                        id="password"
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
                                    <FontAwesomeIcon icon={faPhone} style={{ color: "#ff5f5b" }} />
                                </div>
                                <div className="input__wrapper">
                                    <input
                                        placeholder="Phone Number (Optional)"
                                        type="tel"
                                        id="phoneNumber"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                                        <span> I accept the Terms and Conditions</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <div className='submit__wrapper' onClick={handleCompleteProfile} role="button" tabIndex={0}>
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </div>
                    </form>

                    {/* You can add more content if needed */}
                </div>
            )}
        </div>
    );
};

export default Verifyemail;

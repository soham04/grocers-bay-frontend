import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/components/UserProfiles.scss'
import Loading from './Loading';
import Orders from './Orders';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';

const UserProfile = ({ product, updateAllItemTotal }) => {
    const { isLoggedIn, firstName, lastName, login, logout } = useAuth();

    const [customer, setCustomer] = useState({
        created_at: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        pincode: "",

    });
    const [isEditing, setIsEditing] = useState(false);
    const [editedAddress, setEditedAddress] = useState({
        addressLine1: "customer.addressLine1",
        addressLine2: "customer.addressLine2",
        city: "customer.city",
        pincode: "customer.pincode"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveAddress = () => {
        // Here you can implement logic to save the edited address
        // For demonstration, let's just log the edited address
        console.log('Edited Address:', editedAddress);
        // After saving the address, switch back to view mode
        setIsEditing(false);
    };

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_AUTH_HOST}/v1/customer/`, {
                    withCredentials: true
                });
                console.log(response);
                setCustomer(response.data);
                setEditedAddress({
                    addressLine1: response.data.addressLine1,
                    addressLine2: response.data.addressLine2,
                    city: response.data.city,
                    pincode: response.data.pincode
                })
            } catch (error) {
                console.error('Error fetching customer details:', error);
            }
        };

        fetchCustomerDetails();
    }, []);

    // If user is null, return a loading state or redirect to login
    if (!!!isLoggedIn) {
        return (
            <>
                Unauthorised
            </>
        );
    }

    function formatDateString(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const formattedPhoneNumber = customer ? `(${customer.phoneNumber.substring(0, 3)}) ${customer.phoneNumber.substring(3, 6)}-${customer.phoneNumber.substring(6)}` : "";
    return (
        <div className="max-w-md mx-auto mt-8 bg-[#282828] shadow-md text-white rounded-md p-6">
            <h2 className="text-xl  font-semibold mb-4 text-mygreen">Account Details</h2>
            <div>
                <p className="mb-2"><strong>Member Since:</strong> {customer ? formatDateString(customer.created_at) : ""}</p>
                <p className="mb-2"><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
                <p className="mb-2"><strong>Email:</strong> {customer.email}</p>
                <p className="mb-2"><strong>Phone Number:</strong> {formattedPhoneNumber}</p>
                <p className="mb-2"><strong>Address:</strong></p>
                {isEditing ? (
                    <div>
                        <input type="text" placeholder='Address Line 1' name="addressLine1" value={editedAddress.addressLine1} onChange={handleInputChange} className="text-black mb-2 border border-gray-300 rounded-md px-3 py-2" />
                        <input type="text" placeholder='Address Line 2' name="addressLine2" value={editedAddress.addressLine2} onChange={handleInputChange} className="text-black mb-2 border border-gray-300 rounded-md px-3 py-2" />
                        <input type="text" placeholder='City' name="city" value={editedAddress.city} onChange={handleInputChange} className=" text-black mb-2 border border-gray-300 rounded-md px-3 py-2" />
                        <input type="text" placeholder='Pincode' name="pincode" value={editedAddress.pincode} onChange={handleInputChange} className=" text-black mb-2 border border-gray-300 rounded-md px-3 py-2" />
                        <div className="flex justify-between items-center mt-2">
                            <button onClick={handleSaveAddress} className="bg-mygreen text-black hover:bg-darkgreen px-4 py-2 rounded-md flex items-center">
                                <FontAwesomeIcon icon={faSave} className="mr-2" />
                                Save
                            </button>
                            <button onClick={() => setIsEditing(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md">
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="mb-1">{customer.addressLine1}</p>
                        {customer.addressLine2 && <p className="mb-1">{customer.addressLine2}</p>}
                        <p className="mb-1">{customer.city}, {customer.pincode}</p>
                        <button onClick={() => setIsEditing(true)} className="text-mygreen mt-2 bg-96ca62 hover:bg-80a150 text-black px-4 py-2 rounded-md">
                            <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                            Edit Address
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
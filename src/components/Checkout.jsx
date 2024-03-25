import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

async function getClientSecret(orderId) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_ORDER_HOST}/v1/payment`, {
            orderId: orderId,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        const data = await response.data;
        return data.client_secret;
    } catch (error) {
        console.error('Error fetching client secret:', error);
        return null; // Return null or handle the error appropriately
    }
}

export function Checkout({ orderId }) {
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const secret = await getClientSecret(orderId);
            console.log(secret);
            setClientSecret(secret);
        }
        fetchData();
    }, []);

    if (!clientSecret) {
        return <div>Loading...</div>; // Add loading indicator while fetching client secret
    }

    const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret,
    };

    return (
        <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
        </Elements>
    );
}

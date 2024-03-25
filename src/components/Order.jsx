import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Order = ({ orderId }) => {
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_ORDER_HOST}/v1/order/${orderId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                );
                setOrder(response.data.content); // Set the order state with fetched data
            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === 401) {
                    navigate("/signin");
                }
            }
        };

        fetchOrder();
    }, [orderId, navigate]); // Add orderId and navigate to the dependency array

    // Function to format date to "Month day, year" format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Function to remove hyphens from the UUID order ID
    const formatOrderId = (id) => {
        return id.replace(/-/g, '');
    };

    return (
        <>
            {order && (
                <div className="flex flex-col px-3 py-1 border-2 rounded-md">
                    <div className="flex justify-between">
                        <div className="py-2 px-1">
                            {formatDate(order.created_at)} | {formatOrderId(order.id)}
                        </div>
                        <div className="py-2 px-1 font-bold text-mygreen">
                           $ {order.total} {/* Display order total */}
                        </div>
                    </div>
                    <div className="px-1 py-2 border-t-2">
                        {/* Display thumbnails or any other relevant order information */}
                        Thumbnails
                    </div>
                </div>
            )}
        </>
    );
};

export default Order;

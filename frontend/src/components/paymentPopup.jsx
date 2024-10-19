import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentPopup = ({ onClose, courseId, price, token }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/user/bye/${courseId}`,
                {}, // Request body (empty in this case)
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.status === 200) {
                toast.success("Payment successful!");
                onClose();
                // You might want to refresh the course list or update UI here
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (error) {
            console.error("Payment error:", error.response?.data || error.message);
            toast.error(error.response?.data?.msg || error.response?.data?.message || "Payment failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Payment Details</h2>
                    <button 
                        onClick={onClose}
                        className="text-black hover:text-gray-700 bg-red-500 w-5 h-5 text-center font-bold"
                    >
                        ×
                    </button>
                </div>
                <div className="mb-4">
                    <p className="text-black font-bold">Amount: {price} Rs</p>
                    {/* Add your payment form fields here if needed */}
                </div>
                <div className="flex justify-end">
                    <button 
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handlePayment}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Pay'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPopup;

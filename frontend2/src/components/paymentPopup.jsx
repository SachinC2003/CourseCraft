import React from "react";

const PaymentPopup = ({ onClose, props }) => {
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
                    <p className="text-gray-600">{/*props.price*/}</p>
                    {/* Add your payment form fields here */}
                </div>
                <div className="flex justify-end">
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Pay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPopup;
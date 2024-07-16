// In ClassCard component
import React, { useState } from "react";
import PaymentPopup from "./paymentPopup";

const ClassCard = (props) => {
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 h-60 w-80">
            <h2 className="text-lg font-bold mb-2">Course Title</h2>
            <p className="text-gray-600 mb-2 pt-1">Description - ...........</p>
            <p className="text-gray-600 mb-2 pt-1">Price - ...........</p>
            <p className="text-gray-600 mb-2 pt-1">Owner - ...........</p>
            {/* Here is where you should check the onClick */}
            <button onClick={<PaymentPopup />} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                Enroll Now
            </button>

            {showPopup && <PaymentPopup onClose={closePopup} />}
        </div>
    );
};

export default ClassCard;

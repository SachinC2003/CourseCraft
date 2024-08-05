import React, { useState } from "react";

const ClassCard = ({ title, description, price, published }) => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-auto w-80">
      <div className="mb-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT26MP9f5YdlTfN-2pikGFAXSyfPfT7l-wdhA&s"
          alt="Course"
          className="rounded-lg w-full h-40 object-cover"
        />
      </div>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2 pt-1">Price - {price} Rs</p>
      <button
        onClick={openPopup}
        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      >
        Enroll Now
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT26MP9f5YdlTfN-2pikGFAXSyfPfT7l-wdhA&s"
              alt="Course"
              className="mb-4 rounded-lg w-full h-40 object-cover"
            />
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="text-gray-600 mb-2 pt-1">Description - {description}</p>
            <p className="text-gray-600 mb-2 pt-1">Price - {price} Rs</p>
            <button
              onClick={closePopup}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassCard;


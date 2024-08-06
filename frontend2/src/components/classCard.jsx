import React, { useState, useEffect } from "react";
import PaymentPopup from "../components/paymentPopup"
const ClassCard = ({ id, title, description, price, role }) => {
  const [token, setToken] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const renderButton = () => {
  switch (role) {
    case 'user':
      return (
        <button
          onClick={openPopup}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Enroll Now
        </button>
      );
    case 'teacher':
      return (
        <button
          onClick={openPopup}
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        >
          Update
        </button>
      );
    case 'admin':
      return (
        <button
          onClick={openPopup}
          className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
        >
          Manage Course
        </button>
      );
    default:
      return (
        <button
          onClick={openPopup}
          className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
        >
          View Details
        </button>
      );
  }
};

  const renderPopupContent = () => {
    switch (role) {
      case 'user':
      return (
        <div>
          <div className="mb-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT26MP9f5YdlTfN-2pikGFAXSyfPfT7l-wdhA&s"
              alt="Course"
              className="rounded-lg w-full h-40 object-cover"
            />
          </div>
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-2">Description: {description}</p>
          <p className="text-gray-600 mb-2">Price: {price} Rs</p>
          <button
            onClick={() =>{
              setShowPaymentPopup(true)
              setShowPopup(false)}}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2"
          >
            Confirm Enrollment
          </button>
        </div>
      );
      case 'teacher':
        return (
          <div>
            <div className="mb-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT26MP9f5YdlTfN-2pikGFAXSyfPfT7l-wdhA&s"
                alt="Course"
                className="rounded-lg w-full h-40 object-cover"
              />
            </div>
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="text-gray-600 mb-2">Description: {description}</p>
            <p className="text-gray-600 mb-2">Price: {price} Rs</p>
            <p className="text-gray-600 mb-2">Students Enrolled: [Number]</p>
            <button
              onClick={() => {/* Implement class management logic */}}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 mr-2"
            >
              Manage Students
            </button>
          </div>
        );
      case 'admin':
        return (
          <div>
            <div className="mb-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT26MP9f5YdlTfN-2pikGFAXSyfPfT7l-wdhA&s"
                alt="Course"
                className="rounded-lg w-full h-40 object-cover"
              />
            </div>
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="text-gray-600 mb-2">Description: {description}</p>
            <p className="text-gray-600 mb-2">Price: {price} Rs</p>
            <button
              onClick={async() => {
                try{
                  await axios.put(`http://localhost:3000/admin/delete/${id}`,
                    {},
                    {
                      headers :{ Authorization: `Bearer ${token}` }
                    }
                  )
                }catch(error){
                  console.log(error)
                }
              }}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Delete Course
            </button>
          </div>
        );
      default:
        return null;
    }
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
      <p className="text-gray-600 mb-2 pt-1">{price} Rs</p>
      {renderButton()}

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end">
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {renderPopupContent()}
          </div>
        </div>
      )}

      {showPaymentPopup && (
            <PaymentPopup 
              onClose={() => setShowPaymentPopup(false)}
              courseId={id}
              price={price}
              token={token}
            />
          )}

    </div>
  );
};

export default ClassCard;
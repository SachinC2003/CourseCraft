import React from 'react';

function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
    >
      {label}
    </button>
  );
}

export default Button;

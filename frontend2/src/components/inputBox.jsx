import React from 'react';

function InputBox({ label, value, onChange, placeholder }) {
  return (
    <div className='mb-4'>
      <h4 className='font-medium text-lg mb-2'>{label}</h4>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-80 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      /> 
    </div>
  );
}

export default InputBox;

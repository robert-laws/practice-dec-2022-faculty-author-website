import React, { useState } from 'react';

export const SingleLineTextInput = ({
  inputType,
  inputName,
  placeholder,
  initialValue = '',
}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className='mt-1'>
      <input
        type={inputType}
        name={inputName}
        id={inputName}
        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        placeholder={placeholder}
        onChange={handleInputChange}
        value={inputValue}
      />
    </div>
  );
};

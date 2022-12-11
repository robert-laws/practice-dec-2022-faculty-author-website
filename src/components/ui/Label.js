import React from 'react';

export const Label = ({ htmlForType, label }) => {
  return (
    <label
      htmlFor={htmlForType}
      className='block text-sm font-medium text-gray-700'
    >
      {label}
    </label>
  );
};

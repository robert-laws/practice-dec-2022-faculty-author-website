import React from 'react';

export const Heading = ({ size = 'normal', text }) => {
  let textSize = '';

  if (size === 'small') {
    textSize = 'text-sm';
  } else if (size === 'normal') {
    textSize = 'text-base';
  } else if (size === 'large') {
    textSize = 'text-lg';
  } else if (size === 'xlarge') {
    textSize = 'text-xl';
  } else if (size === '2xlarge') {
    textSize = 'text-2xl';
  } else {
    textSize = 'text-base';
  }

  return (
    <div className='md:flex md:items-center md:justify-between mt-2'>
      <div className='min-w-0 flex-1'>
        <h2
          className={`${textSize} font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight`}
        >
          {text}
        </h2>
      </div>
    </div>
  );
};

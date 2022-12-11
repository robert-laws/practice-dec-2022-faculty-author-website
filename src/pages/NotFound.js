import React from 'react';
import { Navigation } from '../components';

export const NotFound = () => {
  return (
    <>
      <Navigation />
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <h2 className='text-2xl font-bold mt-4'>Page Not Found</h2>
      </div>
    </>
  );
};

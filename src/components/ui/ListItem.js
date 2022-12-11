import React from 'react';
import { Link } from 'react-router-dom';

export const ListItem = ({ id, author, title, year, documentType }) => {
  return (
    <tr>
      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
        {author}
      </td>
      <td className='whitespace-normal px-3 py-4 text-sm text-gray-500'>
        {title}
      </td>
      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
        {year}
      </td>
      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
        {documentType}
      </td>
      <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
        <Link
          to={`/publication/${id}`}
          className='text-indigo-600 hover:text-indigo-900'
        >
          View Details<span className='sr-only'>, {title}</span>
        </Link>
      </td>
    </tr>
  );
};

import React from 'react';
import { usePagination, DOTS } from '../../hooks/usePagination';
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid';

export const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className='pagination mt-4'>
      <nav className='flex items-center justify-between border-t border-gray-200 px-4 sm:px-0'>
        <div className='-mt-px flex w-0 flex-1'>
          <button
            className='inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            onClick={onPrevious}
            disabled={currentPage === 1}
          >
            <ArrowLongLeftIcon
              className='mr-3 h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
            Previous
          </button>
        </div>
        <div className='hidden md:-mt-px md:flex'>
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <span
                  key={index}
                  className='inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500'
                >
                  ...
                </span>
              );
            }

            if (pageNumber === currentPage) {
              return (
                <button
                  key={index}
                  onClick={() => onPageChange(pageNumber)}
                  className='inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600'
                >
                  {pageNumber}
                </button>
              );
            }

            return (
              <button
                className='inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
                onClick={() => onPageChange(pageNumber)}
                key={index}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
        <div className='-mt-px flex w-0 flex-1 justify-end'>
          <button
            className='inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            onClick={onNext}
            disabled={currentPage === lastPage}
          >
            Next
            <ArrowLongRightIcon
              className='ml-3 h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </button>
        </div>
      </nav>
    </div>
  );
};

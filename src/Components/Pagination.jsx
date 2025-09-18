// File: /src/Pagination.js
import React from 'react';

// 1. Receive props from the parent component
function Pagination({ page, pageCount, handleNext, handlePrev }) {

  // A helper function to get classes for disabled buttons
  const getButtonClassName = (isDisabled) => {
    return `px-8 ${isDisabled ? 'text-gray-500 cursor-not-allowed' : 'hover:cursor-pointer'}`;
  };

  return (
    <div className='bg-gray-400 p-4 mt-8 flex justify-center'>
      <div
        className={getButtonClassName(page === 1)}
        onClick={handlePrev} // 2. Call handler for previous page
      >
        <i className="fa-solid fa-arrow-left"></i>
      </div>

      <div className="font-bold">
        {page}
      </div>

      <div
        className={getButtonClassName(page === pageCount)}
        onClick={handleNext} // 3. Call handler for next page
      >
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
}

export default Pagination;
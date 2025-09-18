
import React from 'react';


function Pagination({ page, pageCount, handleNext, handlePrev }) {

  
  const getButtonClassName = (isDisabled) => {
    return `px-8 ${isDisabled ? 'text-gray-500 cursor-not-allowed' : 'hover:cursor-pointer'}`;
  };

  return (
    <div className='bg-gray-400 p-4 mt-8 flex justify-center'>
      <div
        className={getButtonClassName(page === 1)}
        onClick={handlePrev} 
      >
        <i className="fa-solid fa-arrow-left"></i>
      </div>

      <div className="font-bold">
        {page}
      </div>

      <div
        className={getButtonClassName(page === pageCount)}
        onClick={handleNext} 
      >
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
}

export default Pagination;
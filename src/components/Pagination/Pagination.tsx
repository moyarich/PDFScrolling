import React from 'react';

export interface IPaginationProps {
  currentPageIndex: number;
  onChange: (pageIndex: number) => void;
  pagesCount: number;
}

export const Pagination = ({
  currentPageIndex,
  onChange,
  pagesCount,
}: IPaginationProps): JSX.Element => {
  const handlePageChange = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < pagesCount) {
      onChange(pageIndex);
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < pagesCount - 1) {
      onChange(currentPageIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      onChange(currentPageIndex - 1);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handlePreviousPage}
        disabled={currentPageIndex === 0}
        className="px-4 py-2 rounded-md mr-2 bg-gray-200 hover:bg-gray-300 focus:outline-none"
        style={{
          color: '#000716',
        }}
      >
        Previous
      </button>
      {[...Array(pagesCount)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index)}
          disabled={currentPageIndex === index}
          className={`px-4 py-2 rounded-md mx-1 focus:outline-none ${
            currentPageIndex === index
              ? 'bg-gray-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          style={{
            color: '#000716',
          }}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPageIndex === pagesCount - 1}
        className="px-4 py-2 rounded-md ml-2 bg-gray-200 hover:bg-gray-300 focus:outline-none"
        style={{
          color: '#000716',
        }}
      >
        Next
      </button>
    </div>
  );
};

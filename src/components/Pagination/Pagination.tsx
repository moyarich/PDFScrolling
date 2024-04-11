import { cn } from '@/common/utils';
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
    onChange(Math.min(currentPageIndex + 1, pagesCount));
  };
  
  const handlePreviousPage = () => {
    onChange(Math.max(currentPageIndex - 1, 1));
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={handlePreviousPage}
        disabled={currentPageIndex === 0}
        className="size-8 px-3 h-8 me-3 text-sm font-medium text-['#000716'] rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
        Previous
      </button>
      {[...Array(pagesCount)].map((_, index) => {
        const pageIndex = index + 1;
        return(
        <button
          key={index}
          onClick={() => handlePageChange(pageIndex)}
          disabled={currentPageIndex === pageIndex}
          className={cn(`px-3 h-8 me-3 text-sm font-medium text-['#000716'] rounded-md focus:outline-none bg-gray-200 hover:bg-gray-300`,
         { "bg-gray-600 text-white": currentPageIndex === pageIndex}
         )}
          
        >
          {pageIndex}
        </button>
      )})}
      <button
        onClick={handleNextPage}
        disabled={currentPageIndex === pagesCount}
        className="px-3 h-8 me-3 text-sm font-medium text-['#000716'] rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
        Next
      </button>
    </div>
  );
};

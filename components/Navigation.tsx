
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface NavigationProps {
  onNextPage: () => void;
  onPreviousPage: () => void;
  currentPage: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const NavigationButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode; ariaLabel: string }> = ({ onClick, disabled, children, ariaLabel }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className="px-4 py-2 sm:px-6 sm:py-3 mx-2 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-semibold rounded-lg shadow-md hover:shadow-lg disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-all duration-150 ease-in-out transform active:scale-95 flex items-center space-x-2 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);

const Navigation: React.FC<NavigationProps> = ({
  onNextPage,
  onPreviousPage,
  currentPage,
  totalPages,
  isFirstPage,
  isLastPage,
}) => {
  return (
    <nav className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between">
      <NavigationButton onClick={onPreviousPage} disabled={isFirstPage} ariaLabel="Previous Page">
        <ChevronLeftIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Previous</span>
      </NavigationButton>
      <span className="text-sm sm:text-base text-slate-600 font-medium my-2 sm:my-0">
        Page {currentPage} of {totalPages}
      </span>
      <NavigationButton onClick={onNextPage} disabled={isLastPage} ariaLabel="Next Page">
        <span className="hidden sm:inline">Next</span>
        <ChevronRightIcon className="w-5 h-5" />
      </NavigationButton>
    </nav>
  );
};

export default Navigation;
    
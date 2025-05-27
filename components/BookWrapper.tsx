import React from 'react';
import { PageData } from '../types';
import PageContent from './PageContent';
import Navigation from './Navigation';

interface BookWrapperProps {
  pageData: PageData;
  currentPageNumber: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const BookWrapper: React.FC<BookWrapperProps> = ({
  pageData,
  currentPageNumber,
  totalPages,
  onNextPage,
  onPreviousPage,
  isFirstPage,
  isLastPage,
}) => {
  return (
    <main className="w-full max-w-3xl mt-24 mb-16 bg-slate-50/95 backdrop-blur-md shadow-deep rounded-2xl p-6 md:p-10 lg:p-12 transform transition-all duration-500 ease-in-out">
      <div className="min-h-[60vh] flex flex-col justify-between">
        <PageContent
          chapterTitle={pageData.chapterTitle}
          title={pageData.pageTitle} 
          paragraphs={pageData.paragraphs} 
          isCover={pageData.id === 'cover'}
        />
        <Navigation
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          currentPage={currentPageNumber}
          totalPages={totalPages}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
        />
      </div>
    </main>
  );
};

export default BookWrapper;

import React, { useState, useCallback } from 'react';
import { BOOK_PAGES, THE_BOOK_TITLE } from './constants/bookData';
import { PageData } from './types';
import BookWrapper from './components/BookWrapper';
import TableOfContents from './components/TableOfContents';
import MenuIcon from './components/icons/MenuIcon';
import CloseIcon from './components/icons/CloseIcon';

const App: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);

  const totalPages = BOOK_PAGES.length;

  const goToNextPage = useCallback(() => {
    setCurrentPageIndex((prevIndex) => Math.min(prevIndex + 1, totalPages - 1));
  }, [totalPages]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, []);

  const goToPage = useCallback((index: number) => {
    if (index >= 0 && index < totalPages) {
      setCurrentPageIndex(index);
      setIsTocOpen(false);
    }
  }, [totalPages]);

  const toggleToc = useCallback(() => {
    setIsTocOpen((prev) => !prev);
  }, []);

  const currentPageData: PageData | undefined = BOOK_PAGES[currentPageIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-600 via-sky-400 to-slate-50 text-slate-800 flex flex-col items-center justify-center p-4 font-sans selection:bg-sky-200 selection:text-sky-700 relative overflow-hidden">
      <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 z-20">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight shadow-sm">
          {THE_BOOK_TITLE}
        </h1>
        <button
          onClick={toggleToc}
          className="p-2 rounded-full text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
          aria-label={isTocOpen ? "Close table of contents" : "Open table of contents"}
        >
          {isTocOpen ? <CloseIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
        </button>
      </header>

      <TableOfContents
        isOpen={isTocOpen}
        pages={BOOK_PAGES}
        currentPageIndex={currentPageIndex}
        onNavigate={goToPage}
        onClose={toggleToc}
      />
      
      {currentPageData && (
        <BookWrapper
          pageData={currentPageData}
          currentPageNumber={currentPageIndex + 1}
          totalPages={totalPages}
          onNextPage={goToNextPage}
          onPreviousPage={goToPreviousPage}
          isFirstPage={currentPageIndex === 0}
          isLastPage={currentPageIndex === totalPages - 1}
        />
      )}
      
      <footer className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm text-slate-500/80 z-10">
        <p>Interactive Book Reader | Page {currentPageIndex + 1} of {totalPages}</p>
      </footer>
    </div>
  );
};

export default App;
    
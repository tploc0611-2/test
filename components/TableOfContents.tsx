import React from 'react';
import { PageData } from '../types';
import CloseIcon from './icons/CloseIcon';

interface TableOfContentsProps {
  isOpen: boolean;
  pages: PageData[];
  currentPageIndex: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  isOpen,
  pages,
  currentPageIndex,
  onNavigate,
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  let lastChapterTitle: string | undefined = undefined;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* TOC Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-50 shadow-2xl p-6 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="toc-title"
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-300">
          <h2 id="toc-title" className="text-2xl font-semibold text-sky-700 font-serif">
            Table of Contents
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
            aria-label="Close table of contents"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <nav className="overflow-y-auto h-[calc(100vh-120px)] pr-2"> {/* Adjust height & add padding for scrollbar */}
          <ul className="space-y-0.5">
            {pages.map((page, index) => {
              const showChapterTitle = page.chapterTitle && page.chapterTitle !== lastChapterTitle;
              if (showChapterTitle) {
                lastChapterTitle = page.chapterTitle;
              }
              return (
                <React.Fragment key={page.id}>
                  {showChapterTitle && (
                    <li className="pt-3 pb-1 mt-2">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-sky-600/90 font-sans">{page.chapterTitle}</h3>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => onNavigate(index)}
                      className={`w-full text-left px-3 py-2.5 rounded-md text-base transition-colors duration-150 ${
                        index === currentPageIndex
                          ? 'bg-sky-100 text-sky-700 font-semibold'
                          : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700'
                      } ${page.chapterTitle ? 'pl-5' : 'pl-3'}`} // Indent more if under a chapter
                      aria-current={index === currentPageIndex ? "page" : undefined}
                    >
                      {page.pageTitle || `Page ${index + 1}`}
                    </button>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default TableOfContents;
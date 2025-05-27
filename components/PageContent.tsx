import React from 'react';

interface PageContentProps {
  chapterTitle?: string;
  title?: string; // This is the pageTitle
  paragraphs: string[];
  isCover?: boolean;
}

const PageContent: React.FC<PageContentProps> = ({ chapterTitle, title, paragraphs, isCover = false }) => {
  if (isCover) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-10 min-h-[50vh]">
        {title && <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sky-700 mb-6 font-serif">{title}</h1>}
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={`mt-3 text-lg md:text-xl lg:text-2xl ${index === 0 ? 'font-semibold text-slate-700' : 'text-slate-500'}`}>
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  return (
    <article className="prose prose-slate lg:prose-xl max-w-none prose-headings:font-serif prose-p:font-serif prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-justify">
      {chapterTitle && (
        <h1 className="text-xl md:text-2xl font-bold text-sky-800/90 mb-3 pb-3 border-b-2 border-sky-200/70 font-sans !mt-0">
          {chapterTitle}
        </h1>
      )}
      {title && (
        <h2 className={`text-2xl md:text-3xl font-semibold text-sky-700 mb-6 ${chapterTitle ? 'mt-4' : '!mt-0'}`}>
          {title}
        </h2>
      )}
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-4">
          {paragraph}
        </p>
      ))}
    </article>
  );
};

export default PageContent;
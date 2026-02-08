import React, { useMemo } from 'react';
import katex from 'katex';

interface KaTeXRendererProps {
  formula: string;
  className?: string;
  displayMode?: boolean;
}

const KaTeXRenderer: React.FC<KaTeXRendererProps> = ({ formula, className, displayMode = true }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(formula, {
        displayMode: displayMode,
        throwOnError: false,
        macros: {
          "\\tg": "\\operatorname{tg}",
          "\\ctg": "\\operatorname{ctg}"
        }
      });
    } catch (error) {
      console.error('KaTeX rendering error:', error);
      // Fallback to displaying raw formula in case of error
      return `<span class="text-red-400 font-mono text-sm break-all">${formula}</span>`;
    }
  }, [formula, displayMode]);

  // Added 'no-scrollbar' to ensure any internal scrolling in KaTeX output is hidden
  return <div className={`whitespace-normal break-words max-w-full no-scrollbar ${className || ''}`} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default React.memo(KaTeXRenderer);
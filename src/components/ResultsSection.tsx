import React from 'react';
import { ResultItem as ResultItemType } from '../types';
import ResultItem from './ResultItem';

interface ResultsSectionProps {
  results: ResultItemType[];
  onClearResults: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, onClearResults }) => {
  const hasResults = results.length > 0;

  return (
    <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
          <span className="text-3xl">📊</span>
          ผลลัพธ์การทดสอบ
        </h2>
        
        {hasResults && (
          <button
            onClick={onClearResults}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
            aria-label="Clear all results"
          >
            🗑️ Clear All
          </button>
        )}
      </div>

      <div id="resultsContainer">
        {!hasResults ? (
          // Empty State
          <div className="text-center text-gray-500 py-16">
            <div className="text-6xl mb-5">🧪</div>
            <p className="text-lg">กดปุ่มด้านบนเพื่อเริ่มทดสอบการเชื่อมต่อ</p>
          </div>
        ) : (
          // Results List
          <div className="space-y-4">
            {results.map((result, index) => (
              <ResultItem key={index} result={result} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsSection;

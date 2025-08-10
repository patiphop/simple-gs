import React from 'react';
import { ResultItem as ResultItemType } from '../types';

interface ResultItemProps {
  result: ResultItemType;
}

const ResultItem: React.FC<ResultItemProps> = ({ result }) => {
  const getMethodColor = (method: string) => {
    return method === 'GET' ? 'bg-green-500' : 'bg-blue-500';
  };

  const getStatusColor = (success: boolean) => {
    return success 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-xl p-5 mb-4 border-l-4 border-blue-500 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-3 border-b border-gray-200 gap-3">
        <span className={`font-semibold px-3 py-1 rounded-full text-sm text-white ${getMethodColor(result.method)}`}>
          {result.method}
        </span>
        
        <span className={`font-semibold px-3 py-1 rounded-full text-sm ${getStatusColor(result.success)}`}>
          {result.success ? '✅ Success' : '❌ Failed'}
        </span>
        
        <span className="text-gray-600 text-sm">
          {result.timestamp}
        </span>
      </div>

      {result.success ? (
        // Success Content
        <div className="space-y-3">
          {result.statusCode && (
            <div>
              <strong className="text-gray-700">Status Code:</strong> {result.statusCode}
            </div>
          )}
          
          {result.duration && (
            <div>
              <strong className="text-gray-700">Response Time:</strong> {result.duration}ms
            </div>
          )}
          
          {result.requestData && (
            <div>
              <strong className="text-gray-700">Request Data:</strong>
              <pre className="mt-2 p-3 bg-gray-50 rounded-lg text-sm overflow-x-auto">
                {JSON.stringify(result.requestData, null, 2)}
              </pre>
            </div>
          )}
          
          {result.responseData && (
            <div>
              <strong className="text-gray-700">Response Data:</strong>
              <pre className="mt-2 p-3 bg-gray-50 rounded-lg text-sm overflow-x-auto">
                {JSON.stringify(result.responseData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ) : (
        // Error Content
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <strong className="text-red-800">Error:</strong>
          <p className="text-red-700 mt-1">{result.errorMessage || 'Unknown error occurred'}</p>
        </div>
      )}
    </div>
  );
};

export default ResultItem;

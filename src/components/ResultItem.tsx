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

  const getEndpointDisplay = (endpoint?: string) => {
    if (!endpoint) return 'Root (/)';
    return endpoint;
  };

  const getEndpointColor = (endpoint?: string) => {
    switch (endpoint) {
      case '/health':
        return 'bg-purple-100 text-purple-800';
      case '/stats':
        return 'bg-indigo-100 text-indigo-800';
      case '/test':
        return 'bg-orange-100 text-orange-800';
      case '/api':
        return 'bg-cyan-100 text-cyan-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 mb-4 border-l-4 border-blue-500 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-3 border-b border-gray-200 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`font-semibold px-3 py-1 rounded-full text-sm text-white ${getMethodColor(result.method)}`}>
            {result.method}
          </span>
          
          {result.endpoint && (
            <span className={`font-semibold px-3 py-1 rounded-full text-sm ${getEndpointColor(result.endpoint)}`}>
              {getEndpointDisplay(result.endpoint)}
            </span>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
          <span className={`font-semibold px-3 py-1 rounded-full text-sm ${getStatusColor(result.success)}`}>
            {result.success ? '✅ Success' : '❌ Failed'}
          </span>
          
          <span className="text-gray-600 text-sm">
            {result.timestamp}
          </span>
        </div>
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
          
          {result.responseData?.path && (
            <div>
              <strong className="text-gray-700">Endpoint Path:</strong> {result.responseData.path}
            </div>
          )}
          
          {result.responseData?.scriptInfo && (
            <div>
              <strong className="text-gray-700">Script Info:</strong>
              <div className="mt-2 p-3 bg-blue-50 rounded-lg text-sm">
                <div><strong>Name:</strong> {result.responseData.scriptInfo.name}</div>
                <div><strong>Version:</strong> {result.responseData.scriptInfo.version}</div>
                <div><strong>Environment:</strong> {result.responseData.scriptInfo.environment}</div>
                <div><strong>Last Deploy:</strong> {new Date(result.responseData.scriptInfo.lastDeploy).toLocaleString('th-TH')}</div>
              </div>
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

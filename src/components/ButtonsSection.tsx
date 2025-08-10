import React from 'react';

interface ButtonsSectionProps {
  onGetRequest: () => void;
  onPostRequest: () => void;
  onTestBoth: () => void;
  onClearResults: () => void;
  isRequestInProgress: boolean;
}

const ButtonsSection: React.FC<ButtonsSectionProps> = ({
  onGetRequest,
  onPostRequest,
  onTestBoth,
  onClearResults,
  isRequestInProgress
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {/* GET Request Button */}
      <button
        onClick={onGetRequest}
        disabled={isRequestInProgress}
        className="px-6 py-4 bg-gradient-to-br from-green-500 to-teal-500 text-white font-semibold rounded-xl text-lg transition-all duration-300 hover:from-green-600 hover:to-teal-600 hover:transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-3"
        aria-label="Test GET request"
        tabIndex={0}
      >
        {isRequestInProgress ? (
          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
        ) : (
          <span className="text-xl">📤</span>
        )}
        {isRequestInProgress ? 'Sending...' : 'Test GET Request'}
      </button>

      {/* POST Request Button */}
      <button
        onClick={onPostRequest}
        disabled={isRequestInProgress}
        className="px-6 py-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold rounded-xl text-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-3"
        aria-label="Test POST request"
        tabIndex={0}
      >
        {isRequestInProgress ? (
          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
        ) : (
          <span className="text-xl">📤</span>
        )}
        {isRequestInProgress ? 'Sending...' : 'Test POST Request'}
      </button>

      {/* Test Both Button */}
      <button
        onClick={onTestBoth}
        disabled={isRequestInProgress}
        className="px-6 py-4 bg-gradient-to-br from-yellow-500 to-orange-500 text-white font-semibold rounded-xl text-lg transition-all duration-300 hover:from-yellow-600 hover:to-orange-600 hover:transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-3"
        aria-label="Test both GET and POST requests"
        tabIndex={0}
      >
        {isRequestInProgress ? (
          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
        ) : (
          <span className="text-xl">🧪</span>
        )}
        {isRequestInProgress ? 'Testing...' : 'Test Both'}
      </button>

      {/* Clear Results Button */}
      <button
        onClick={onClearResults}
        disabled={isRequestInProgress}
        className="px-6 py-4 bg-gradient-to-br from-gray-500 to-gray-700 text-white font-semibold rounded-xl text-lg transition-all duration-300 hover:from-gray-600 hover:to-gray-800 hover:transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-3"
        aria-label="Clear all results"
        tabIndex={0}
      >
        <span className="text-xl">🗑️</span>
        Clear Results
      </button>
    </div>
  );
};

export default ButtonsSection;

import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { AppConfig, ResultItem, RequestParams, PostData } from './types';
import { 
  sendGetRequest, 
  sendPostRequest, 
  isValidUrl
} from './utils/api';
import ConfigSection from './components/ConfigSection';
import ButtonsSection from './components/ButtonsSection';
import ResultsSection from './components/ResultsSection';
import Message from './components/Message';

// Main App Component
const App: React.FC = () => {
  // State management
  const [config, setConfig] = useState<AppConfig>({
    scriptUrl: '',
    postData: '{"message": "Hello from webapp!", "timestamp": "2024-01-01", "source": "react-interface"}',
    getParams: 'action=test&source=webapp'
  });

  const [results, setResults] = useState<ResultItem[]>([]);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [urlDisplay, setUrlDisplay] = useState('');
  const [showUrlDisplay, setShowUrlDisplay] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Load saved configuration from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gscriptTesterConfig');
      if (saved) {
        const savedConfig = JSON.parse(saved);
        setConfig(prev => ({ ...prev, ...savedConfig }));
      }
    } catch (error) {
      console.error('Error loading saved config:', error);
    }
  }, []);

  // Update URL display when script URL changes
  useEffect(() => {
    const url = config.scriptUrl.trim();
    
    if (url && url !== 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec') {
      try {
        const urlObj = new URL(url);
        setUrlDisplay(`
          <strong>URL Components:</strong><br>
          Protocol: ${urlObj.protocol}<br>
          Hostname: ${urlObj.hostname}<br>
          Pathname: ${urlObj.pathname}<br>
          Script ID: ${urlObj.pathname.split('/').pop()}
        `);
        setShowUrlDisplay(true);
      } catch (error) {
        setUrlDisplay('<span style="color: #dc3545;">Invalid URL format</span>');
        setShowUrlDisplay(true);
      }
    } else {
      setShowUrlDisplay(false);
    }
  }, [config.scriptUrl]);

  // Save configuration to localStorage
  const handleConfigChange = useCallback((newConfig: AppConfig) => {
    setConfig(newConfig);
    localStorage.setItem('gscriptTesterConfig', JSON.stringify(newConfig));
  }, []);

  // Show message helper
  const showMessage = useCallback((type: 'error' | 'success', text: string) => {
    setMessage({ type, text });
  }, []);

  // Clear message
  const clearMessage = useCallback(() => {
    setMessage(null);
  }, []);

  // Add result item
  const addResultItem = useCallback((result: ResultItem) => {
    setResults(prev => [result, ...prev]);
  }, []);

  // Send GET request
  const handleGetRequest = useCallback(async () => {
    if (isRequestInProgress) return;

    const url = config.scriptUrl.trim();
    if (!isValidUrl(url)) {
      showMessage('error', 'กรุณาใส่ Google Apps Script URL ที่ถูกต้อง');
      return;
    }

    setIsRequestInProgress(true);

    try {
      const params = parseQueryString(config.getParams);
      const { data, duration } = await sendGetRequest(url, params);

      const result: ResultItem = {
        method: 'GET',
        success: true,
        statusCode: 200,
        duration,
        responseData: data,
        requestData: params,
        timestamp: new Date().toLocaleString('th-TH')
      };

      addResultItem(result);
      showMessage('success', 'GET request successful!');

    } catch (error) {
      const result: ResultItem = {
        method: 'GET',
        success: false,
        errorMessage: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toLocaleString('th-TH')
      };

      addResultItem(result);
      showMessage('error', `GET request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRequestInProgress(false);
    }
  }, [config.scriptUrl, config.getParams, isRequestInProgress, showMessage, addResultItem]);

  // Send POST request
  const handlePostRequest = useCallback(async () => {
    if (isRequestInProgress) return;

    const url = config.scriptUrl.trim();
    if (!isValidUrl(url)) {
      showMessage('error', 'กรุณาใส่ Google Apps Script URL ที่ถูกต้อง');
      return;
    }

    let postData: PostData;
    try {
      postData = JSON.parse(config.postData);
    } catch (error) {
      showMessage('error', 'POST Data ต้องเป็น JSON ที่ถูกต้อง');
      return;
    }

    setIsRequestInProgress(true);

    try {
      const { data, duration } = await sendPostRequest(url, postData);

      const result: ResultItem = {
        method: 'POST',
        success: true,
        statusCode: 200,
        duration,
        responseData: data,
        requestData: postData,
        timestamp: new Date().toLocaleString('th-TH')
      };

      addResultItem(result);
      showMessage('success', 'POST request successful!');

    } catch (error) {
      const result: ResultItem = {
        method: 'POST',
        success: false,
        errorMessage: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toLocaleString('th-TH')
      };

      addResultItem(result);
      showMessage('error', `POST request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRequestInProgress(false);
    }
  }, [config.scriptUrl, config.postData, isRequestInProgress, showMessage, addResultItem]);

  // Test both requests
  const handleTestBoth = useCallback(async () => {
    if (isRequestInProgress) return;

    // Test GET first
    await handleGetRequest();
    
    // Wait a bit before testing POST
    setTimeout(() => {
      handlePostRequest();
    }, 1000);
  }, [isRequestInProgress, handleGetRequest, handlePostRequest]);

  // Clear results
  const handleClearResults = useCallback(() => {
    setResults([]);
  }, []);

  // Parse query string helper
  const parseQueryString = (queryString: string): RequestParams => {
    const params: RequestParams = {};
    if (!queryString) return params;
    
    queryString.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      if (key && value) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    });
    
    return params;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-3xl p-8 mb-8 text-center shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-light mb-3">🚀 Google Apps Script Webapp Tester</h1>
          <p className="text-xl opacity-90">ทดสอบการเชื่อมต่อ GET/POST requests ไปยัง Google Apps Script webapp</p>
        </div>

        {/* Main Content */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Configuration Section */}
            <ConfigSection
              config={config}
              onConfigChange={handleConfigChange}
              urlDisplay={urlDisplay}
              showUrlDisplay={showUrlDisplay}
            />

            {/* Buttons Section */}
            <ButtonsSection
              onGetRequest={handleGetRequest}
              onPostRequest={handlePostRequest}
              onTestBoth={handleTestBoth}
              onClearResults={handleClearResults}
              isRequestInProgress={isRequestInProgress}
            />

            {/* Results Section */}
            <ResultsSection
              results={results}
              onClearResults={handleClearResults}
            />
          </div>
        </div>
      </div>

      {/* Message Component */}
      {message && (
        <Message
          type={message.type}
          message={message.text}
          onClose={clearMessage}
        />
      )}
    </div>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

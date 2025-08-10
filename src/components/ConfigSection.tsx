import React from 'react';
import { AppConfig, ApiEndpoint } from '../types';

interface ConfigSectionProps {
  config: AppConfig;
  onConfigChange: (config: AppConfig) => void;
  urlDisplay: string;
  showUrlDisplay: boolean;
  selectedEndpoint: ApiEndpoint;
  onEndpointChange: (endpoint: ApiEndpoint) => void;
}

const ConfigSection: React.FC<ConfigSectionProps> = ({
  config,
  onConfigChange,
  urlDisplay,
  showUrlDisplay,
  selectedEndpoint,
  onEndpointChange
}) => {
  const handleInputChange = (field: keyof AppConfig, value: string) => {
    onConfigChange({
      ...config,
      [field]: value
    });
  };

  const handleUrlBlur = () => {
    // Save to localStorage
    localStorage.setItem('gscriptTesterConfig', JSON.stringify(config));
  };

  const handleEndpointChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const endpoint = e.target.value as ApiEndpoint;
    onEndpointChange(endpoint);
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-6 mb-8 border-2 border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center gap-3">
        <span className="text-3xl">⚙️</span>
        การตั้งค่า
      </h2>
      
      <div className="space-y-5">
        {/* Script URL Input */}
        <div>
          <label 
            htmlFor="scriptUrl" 
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Google Apps Script URL:
          </label>
          <input
            type="url"
            id="scriptUrl"
            value={config.scriptUrl}
            onChange={(e) => handleInputChange('scriptUrl', e.target.value)}
            onBlur={handleUrlBlur}
            placeholder="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base transition-colors focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
            aria-label="Google Apps Script URL"
          />
          {showUrlDisplay && (
            <div className="mt-3 p-3 bg-gray-200 rounded-lg font-mono text-sm break-all border border-gray-300">
              {urlDisplay}
            </div>
          )}
          <small className="text-gray-600 text-sm mt-2 block">
            ใส่ Google Apps Script URL ที่ถูกต้อง
          </small>
        </div>

        {/* Endpoint Selection */}
        <div>
          <label 
            htmlFor="endpoint" 
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            API Endpoint:
          </label>
          <select
            id="endpoint"
            value={selectedEndpoint}
            onChange={handleEndpointChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base transition-colors focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
            aria-label="Select API endpoint"
          >
            <option value="">Root (/) - Welcome & Basic Info</option>
            <option value="/api">/api - API Endpoint</option>
            <option value="/health">/health - Health Check</option>
            <option value="/stats">/stats - Server Statistics</option>
            <option value="/test">/test - Test Endpoint</option>
          </select>
          <small className="text-gray-600 text-sm mt-2 block">
            เลือก endpoint ที่ต้องการทดสอบ
          </small>
        </div>

        {/* POST Data Textarea */}
        <div>
          <label 
            htmlFor="postData" 
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            POST Data (JSON):
          </label>
          <textarea
            id="postData"
            value={config.postData}
            onChange={(e) => handleInputChange('postData', e.target.value)}
            onBlur={handleUrlBlur}
            rows={4}
            placeholder='{"message": "Hello from webapp!", "timestamp": "2024-01-01"}'
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base transition-colors focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 resize-vertical"
            aria-label="POST data in JSON format"
          />
        </div>

        {/* GET Parameters Input */}
        <div>
          <label 
            htmlFor="getParams" 
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            GET Parameters:
          </label>
          <input
            type="text"
            id="getParams"
            value={config.getParams}
            onChange={(e) => handleInputChange('getParams', e.target.value)}
            onBlur={handleUrlBlur}
            placeholder="action=test&source=webapp"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base transition-colors focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
            aria-label="GET parameters"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfigSection;

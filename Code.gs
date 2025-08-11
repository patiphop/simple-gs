// URL: https://script.google.com/macros/s/AKfycbxj-en-qUYi-iSSeasmFMGt7TyXMT2G0vHmMB_Sg9rwlYgmYpit3jwhJO0ifRyleECS_g/exec

/**
 * Google Apps Script - HTTP Method Handler
 * Handles GET, POST, and OPTIONS requests with CORS support
 */

// Main doGet function for GET requests
function doGet(e) {
  try {
    // Get query parameters
    const params = e.parameter;
    
    // Process GET request
    const response = processGetRequest(params);
    
    // Set CORS headers using proper method
    const output = ContentService.createTextOutput(JSON.stringify(response));
    output.setMimeType(ContentService.MimeType.JSON);
    
    
    return output;
      
  } catch (error) {
    return handleError(error, 'GET');
  }
}

// Main doPost function for POST requests
function doPost(e) {
  try {
    // Get request data
    const data = e.postData ? JSON.parse(e.postData.contents) : {};
    
    // Process POST request
    const response = processPostRequest(data);
    
    // Set CORS headers using proper method
    const output = ContentService.createTextOutput(JSON.stringify(response));
    output.setMimeType(ContentService.MimeType.JSON);
    
    // Add CORS headers
    const headers = getCorsHeaders();
    Object.keys(headers).forEach(key => {
      output.addHeader(key, headers[key]);
    });
    
    return output;
      
  } catch (error) {
    return handleError(error, 'POST');
  }
}

// Handle OPTIONS requests (for CORS preflight)
function doOptions(e) {
  const output = ContentService.createTextOutput('');
  output.setMimeType(ContentService.MimeType.TEXT);
  
  // Add CORS headers
  const headers = getCorsHeaders();
  headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
  headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  
  Object.keys(headers).forEach(key => {
    output.addHeader(key, headers[key]);
  });
  
  return output;
}

// Helper function to set CORS headers
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  };
}

// Process GET request logic
function processGetRequest(params) {
  const timestamp = new Date().toISOString();
  
  // Example GET logic - you can customize this
  const response = {
    method: 'GET',
    timestamp: timestamp,
    message: 'GET request processed successfully',
    params: params,
    data: {
      status: 'success',
      items: [
        { id: 1, name: 'Item 1', value: 'Sample data 1' },
        { id: 2, name: 'Item 2', value: 'Sample data 2' },
        { id: 3, name: 'Item 3', value: 'Sample data 3' }
      ]
    }
  };
  
  // Log the request
  console.log('GET Request processed:', JSON.stringify(response));
  
  return response;
}

// Process POST request logic
function processPostRequest(data) {
  const timestamp = new Date().toISOString();
  
  // Example POST logic - you can customize this
  const response = {
    method: 'POST',
    timestamp: timestamp,
    message: 'POST request processed successfully',
    receivedData: data,
    data: {
      status: 'success',
      processed: true,
      id: generateId(),
      result: `Processed data: ${JSON.stringify(data)}`
    }
  };
  
  // Log the request
  console.log('POST Request processed:', JSON.stringify(response));
  
  return response;
}

// Generate a simple ID
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Error handler
function handleError(error, method) {
  const errorResponse = {
    method: method,
    timestamp: new Date().toISOString(),
    error: true,
    message: error.message || 'An error occurred',
    details: error.toString()
  };
  
  console.error(`${method} Request Error:`, JSON.stringify(errorResponse));
  
  const output = ContentService.createTextOutput(JSON.stringify(errorResponse));
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Add CORS headers
  const headers = getCorsHeaders();

  
  return output;
}

// Test function to verify the script is working
function testEndpoints() {
  console.log('Testing GET endpoint...');
  const getTest = processGetRequest({ test: 'true' });
  console.log('GET Test Result:', JSON.stringify(getTest));
  
  console.log('Testing POST endpoint...');
  const postTest = processPostRequest({ test: 'true', data: 'sample' });
  console.log('POST Test Result:', JSON.stringify(postTest));
}

/**
 * Utility functions สำหรับ API calls และ data processing
 * รองรับ path routing ตาม Code.gs
 */

import { RequestParams, PostData, ServerResponse } from '../types';

/**
 * API Endpoints ที่รองรับ
 */
export const API_ENDPOINTS = {
  ROOT: '',
  API: '/api',
  HEALTH: '/health',
  STATS: '/stats',
  TEST: '/test'
} as const;

export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];

/**
 * สร้าง URL สำหรับ endpoint ที่ต้องการ
 */
export const buildEndpointUrl = (baseUrl: string, endpoint: ApiEndpoint = ''): string => {
  const cleanBaseUrl = baseUrl.replace(/\/$/, ''); // ลบ trailing slash
  const cleanEndpoint = endpoint.replace(/^\//, ''); // ลบ leading slash
  
  if (!cleanEndpoint) {
    return cleanBaseUrl;
  }
  
  return `${cleanBaseUrl}/${cleanEndpoint}`;
};

/**
 * Parse query string เป็น object
 */
export const parseQueryString = (queryString: string): RequestParams => {
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

/**
 * ส่ง GET request ไปยัง Google Apps Script endpoint ที่ระบุ
 */
export const sendGetRequest = async (
  url: string, 
  params: RequestParams,
  endpoint: ApiEndpoint = ''
): Promise<{ data: ServerResponse; duration: number }> => {
  // เพิ่ม metadata parameters
  const enrichedParams: RequestParams = {
    ...params,
    test: 'true',
    timestamp: new Date().toISOString(),
    source: 'react-interface',
    endpoint: endpoint || 'root'
  };
  
  // Build URL with endpoint และ parameters
  const endpointUrl = buildEndpointUrl(url, endpoint);
  const urlObj = new URL(endpointUrl);
  Object.keys(enrichedParams).forEach(key => {
    urlObj.searchParams.append(key, enrichedParams[key]);
  });
  
  const startTime = Date.now();
  
  const response = await fetch(urlObj.toString(), {
    method: 'GET',
    headers: {
      'User-Agent': 'GoogleScriptTester/2.0',
      'Content-Type': 'application/json'
    }
  });
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  return { data, duration };
};

/**
 * ส่ง POST request ไปยัง Google Apps Script endpoint ที่ระบุ
 */
export const sendPostRequest = async (
  url: string, 
  postData: PostData,
  endpoint: ApiEndpoint = ''
): Promise<{ data: ServerResponse; duration: number }> => {
  // เพิ่ม metadata
  const enrichedData = {
    ...postData,
    test: true,
    timestamp: new Date().toISOString(),
    source: 'react-interface',
    endpoint: endpoint || 'root'
  };
  
  // Build URL with endpoint
  const endpointUrl = buildEndpointUrl(url, endpoint);
  
  const startTime = Date.now();
  
  const response = await fetch(endpointUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'GoogleScriptTester/2.0'
    },
    body: JSON.stringify(enrichedData)
  });
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  return { data, duration };
};

/**
 * ส่ง GET request ไปยัง root endpoint (/)
 */
export const sendRootGetRequest = async (
  url: string, 
  params: RequestParams = {}
): Promise<{ data: ServerResponse; duration: number }> => {
  return sendGetRequest(url, params, API_ENDPOINTS.ROOT);
};

/**
 * ส่ง POST request ไปยัง root endpoint (/)
 */
export const sendRootPostRequest = async (
  url: string, 
  postData: PostData
): Promise<{ data: ServerResponse; duration: number }> => {
  return sendPostRequest(url, postData, API_ENDPOINTS.ROOT);
};

/**
 * ส่ง GET request ไปยัง API endpoint (/api)
 */
export const sendApiGetRequest = async (
  url: string, 
  params: RequestParams = {}
): Promise<{ data: ServerResponse; duration: number }> => {
  return sendGetRequest(url, params, API_ENDPOINTS.API);
};

/**
 * ส่ง POST request ไปยัง API endpoint (/api)
 */
export const sendApiPostRequest = async (
  url: string, 
  postData: PostData
): Promise<{ data: ServerResponse; duration: number }> => {
  return sendPostRequest(url, postData, API_ENDPOINTS.API);
};

/**
 * ส่ง GET request ไปยัง health check endpoint (/health)
 */
export const sendHealthCheckRequest = async (
  url: string
): Promise<{ data: ServerResponse; duration: number }> => {
  return sendGetRequest(url, {}, API_ENDPOINTS.HEALTH);
};

/**
 * ส่ง GET request ไปยัง stats endpoint (/stats)
 */
export const sendStatsRequest = async (
  url: string
): Promise<{ data: ServerResponse; duration: number }> => {
  return sendGetRequest(url, {}, API_ENDPOINTS.STATS);
};

/**
 * ส่ง GET request ไปยัง test endpoint (/test)
 */
export const sendTestGetRequest = async (
  url: string
): Promise<{ data: ServerResponse; duration: number }> => {
  return sendGetRequest(url, {}, API_ENDPOINTS.TEST);
};

/**
 * ส่ง POST request ไปยัง test endpoint (/test)
 */
export const sendTestPostRequest = async (
  url: string, 
  postData: PostData
): Promise<{ data: ServerResponse; duration: number }> => {
  return sendPostRequest(url, postData, API_ENDPOINTS.TEST);
};

/**
 * ตรวจสอบว่า URL ถูกต้องหรือไม่
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return url !== 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
  } catch {
    return false;
  }
};

/**
 * ตรวจสอบว่า JSON string ถูกต้องหรือไม่
 */
export const isValidJson = (jsonString: string): boolean => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
};

/**
 * ตรวจสอบว่า endpoint ที่ระบุถูกต้องหรือไม่
 */
export const isValidEndpoint = (endpoint: string): endpoint is ApiEndpoint => {
  return Object.values(API_ENDPOINTS).includes(endpoint as ApiEndpoint);
};

/**
 * แสดง error message
 */
export const showError = (message: string): void => {
  console.error('❌ Error:', message);
  // ใน React เราจะใช้ state แทน
};

/**
 * แสดง success message
 */
export const showSuccess = (message: string): void => {
  console.log('✅ Success:', message);
  // ใน React เราจะใช้ state แทน
};

/**
 * สร้าง test data สำหรับทดสอบ endpoints
 */
export const createTestData = (endpoint: ApiEndpoint = ''): PostData => {
  return {
    message: `Test message for ${endpoint || 'root'} endpoint`,
    timestamp: new Date().toISOString(),
    testData: {
      randomNumber: Math.floor(Math.random() * 1000),
      endpoint: endpoint || 'root',
      source: 'react-interface'
    }
  };
};

/**
 * Utility functions สำหรับ API calls และ data processing
 */

import { RequestParams, PostData, ServerResponse } from '../types';

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
 * ส่ง GET request ไปยัง Google Apps Script
 */
export const sendGetRequest = async (
  url: string, 
  params: RequestParams
): Promise<{ data: ServerResponse; duration: number }> => {
  // เพิ่ม metadata parameters
  const enrichedParams: RequestParams = {
    ...params,
    test: 'true',
    timestamp: new Date().toISOString(),
    source: 'react-interface'
  };
  
  // Build URL with parameters
  const urlObj = new URL(url);
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
 * ส่ง POST request ไปยัง Google Apps Script
 */
export const sendPostRequest = async (
  url: string, 
  postData: PostData
): Promise<{ data: ServerResponse; duration: number }> => {
  // เพิ่ม metadata
  const enrichedData = {
    ...postData,
    test: true,
    timestamp: new Date().toISOString(),
    source: 'react-interface'
  };
  
  const startTime = Date.now();
  
  const response = await fetch(url, {
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

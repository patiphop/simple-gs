/**
 * TypeScript interfaces และ types สำหรับ Google Apps Script Webapp Tester
 */

// Configuration interface
export interface AppConfig {
  scriptUrl: string;
  postData: string;
  getParams: string;
}

// Request parameters interface
export interface RequestParams {
  [key: string]: string;
}

// POST data interface
export interface PostData {
  message?: string;
  timestamp?: string;
  source?: string;
  [key: string]: any;
}

// Server response interface
export interface ServerResponse {
  success: boolean;
  method: 'GET' | 'POST';
  timestamp: string;
  requestCount: number;
  message: string;
  data: {
    currentTime: string;
    serverInfo: {
      platform: string;
      version: string;
      environment: string;
    };
    userData: UserDataItem[];
    statistics: {
      totalRequests: number;
      dataCount: number;
    };
  };
  parameters?: RequestParams;
  receivedData?: PostData;
  processedData?: any;
}

// User data item interface
export interface UserDataItem {
  id: number;
  timestamp: string;
  data: any;
  source: string;
}

// Error response interface
export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    details: string;
    timestamp: string;
  };
}

// Result item interface
export interface ResultItem {
  method: 'GET' | 'POST';
  success: boolean;
  statusCode?: number;
  duration?: number;
  responseData?: ServerResponse;
  requestData?: PostData | RequestParams;
  errorMessage?: string;
  timestamp: string;
}

// Button state interface
export interface ButtonState {
  getBtn: boolean;
  postBtn: boolean;
  testBothBtn: boolean;
}

// Form validation interface
export interface FormValidation {
  scriptUrl: boolean;
  postData: boolean;
  getParams: boolean;
}

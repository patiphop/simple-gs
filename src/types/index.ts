/**
 * TypeScript interfaces และ types สำหรับ Google Apps Script Webapp Tester
 * รองรับ path routing และ endpoints
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
  endpoint?: string;
  testData?: {
    randomNumber: number;
    endpoint: string;
    source: string;
  };
  [key: string]: any;
}

// API Endpoints type
export type ApiEndpoint = '' | '/api' | '/health' | '/stats' | '/test';

// Server response interface - รองรับ path และ script info
export interface ServerResponse {
  success: boolean;
  method: 'GET' | 'POST';
  path?: string;
  timestamp: string;
  requestCount: number;
  message: string;
  scriptInfo?: {
    name: string;
    version: string;
    environment: string;
    lastDeploy: string;
    endpoints: {
      root: string;
      api: string;
      health: string;
      stats: string;
      test: string;
    };
  };
  data: {
    currentTime: string;
    serverInfo: {
      platform: string;
      version: string;
      environment: string;
      lastDeploy?: string;
    };
    userData: UserDataItem[];
    statistics: {
      totalRequests: number;
      dataCount: number;
      lastRequest?: string;
    };
    endpoints?: {
      root: string;
      api: string;
      health: string;
      stats: string;
      test: string;
    };
    test?: boolean;
    randomNumber?: number;
    echo?: any;
    status?: string;
    uptime?: string;
  };
  parameters?: RequestParams;
  receivedData?: PostData;
  processedData?: any;
}

// User data item interface - รองรับ path
export interface UserDataItem {
  id: number;
  timestamp: string;
  data: any;
  source: string;
  path?: string;
}

// Error response interface - รองรับ script version
export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    details: string;
    timestamp: string;
    scriptVersion?: string;
  };
}

// Result item interface - รองรับ endpoint
export interface ResultItem {
  method: 'GET' | 'POST';
  success: boolean;
  statusCode?: number;
  duration?: number;
  endpoint?: ApiEndpoint;
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

// Endpoint test result interface
export interface EndpointTestResult {
  endpoint: ApiEndpoint;
  method: 'GET' | 'POST';
  success: boolean;
  duration: number;
  response: ServerResponse;
  timestamp: string;
}

// Health check response interface
export interface HealthCheckResponse {
  success: boolean;
  method: 'GET';
  path: '/health';
  timestamp: string;
  message: string;
  data: {
    status: string;
    uptime: string;
    serverInfo: {
      platform: string;
      version: string;
      environment: string;
    };
  };
}

// Stats response interface
export interface StatsResponse {
  success: boolean;
  method: 'GET';
  path: '/stats';
  timestamp: string;
  message: string;
  data: {
    statistics: {
      totalRequests: number;
      dataCount: number;
      lastRequest: string | null;
    };
    serverInfo: {
      platform: string;
      version: string;
      environment: string;
    };
  };
}

// Test response interface
export interface TestResponse {
  success: boolean;
  method: 'GET' | 'POST';
  path: '/test';
  timestamp: string;
  message: string;
  receivedData?: PostData;
  data: {
    test: boolean;
    randomNumber: number;
    echo?: any;
    serverInfo: {
      platform: string;
      version: string;
      environment: string;
    };
  };
}

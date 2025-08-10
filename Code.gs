/**
 * Google Apps Script Webapp Server
 * ไฟล์หลักสำหรับ serve ข้อมูลให้กับ frontend
 *
 * การใช้งาน:
 * 1. อัปโหลดไฟล์นี้ไปยัง Google Apps Script
 * 2. Deploy เป็น webapp
 * 3. ใช้ URL ที่ได้ใน index.html
 */

// ตัวแปร global สำหรับเก็บข้อมูล
let userData = [];
let requestCount = 0;
let scriptInfo = {
  name: 'Google Apps Script Webapp Tester',
  version: '2.0.0',
  environment: 'Production',
  lastDeploy: new Date().toISOString(),
  endpoints: {
    root: '/',
    api: '/api',
    health: '/health',
    stats: '/stats',
    test: '/test'
  }
};

/**
 * ฟังก์ชันหลักที่ Google Apps Script จะเรียกเมื่อมี request เข้ามา
 * รองรับทั้ง GET และ POST requests พร้อม path routing
 */
function doGet(e) {
  console.log('📥 GET Request received');
  console.log('📋 Parameters:', e.parameter);
  console.log('🌐 Path:', e.pathInfo);

  try {
    // เพิ่ม request count
    requestCount++;

    // ตรวจสอบ path และ route ไปยังฟังก์ชันที่เหมาะสม
    const path = e.pathInfo || '';
    
    switch (path) {
      case '':
      case '/':
        return handleRootGet(e);
      case '/health':
        return handleHealthCheck(e);
      case '/stats':
        return handleStatsGet(e);
      case '/test':
        return handleTestGet(e);
      case '/api':
        return handleApiGet(e);
      default:
        return handleApiGet(e); // Default to API endpoint
    }

  } catch (error) {
    console.error('❌ Error in doGet:', error);
    return createErrorResponse('GET request failed', error.message);
  }
}

/**
 * ฟังก์ชันสำหรับรับ POST requests พร้อม path routing
 */
function doPost(e) {
  console.log('📥 POST Request received');
  console.log('🌐 Path:', e.pathInfo);

  try {
    // เพิ่ม request count
    requestCount++;

    // ตรวจสอบ path และ route ไปยังฟังก์ชันที่เหมาะสม
    const path = e.pathInfo || '';
    
    switch (path) {
      case '':
      case '/':
        return handleRootPost(e);
      case '/api':
        return handleApiPost(e);
      case '/test':
        return handleTestPost(e);
      default:
        return handleApiPost(e); // Default to API endpoint
    }

  } catch (error) {
    console.error('❌ Error in doPost:', error);
    return createErrorResponse('POST request failed', error.message);
  }
}

/**
 * จัดการ GET request ที่ root path (/)
 */
function handleRootGet(e) {
  const responseData = {
    success: true,
    method: 'GET',
    path: '/',
    timestamp: new Date().toISOString(),
    requestCount: requestCount,
    message: 'Welcome to Google Apps Script Webapp Tester',
    scriptInfo: scriptInfo,
    data: {
      currentTime: new Date().toLocaleString('th-TH'),
      serverInfo: {
        platform: 'Google Apps Script',
        version: scriptInfo.version,
        environment: scriptInfo.environment,
        lastDeploy: scriptInfo.lastDeploy
      },
      endpoints: scriptInfo.endpoints,
      userData: userData.slice(-5), // ส่งข้อมูล 5 รายการล่าสุด
      statistics: {
        totalRequests: requestCount,
        dataCount: userData.length
      }
    }
  };

  return createJsonResponse(responseData);
}

/**
 * จัดการ POST request ที่ root path (/)
 */
function handleRootPost(e) {
  // Parse POST data
  let postData;
  try {
    postData = JSON.parse(e.postData.contents);
  } catch (parseError) {
    console.error('❌ Error parsing POST data:', parseError);
    return createErrorResponse('Invalid JSON data', parseError.message);
  }

  console.log('📋 POST Data:', postData);

  // ตรวจสอบและประมวลผลข้อมูล
  const processedData = processPostData(postData);

  // เพิ่มข้อมูลลงใน userData
  userData.push({
    id: Date.now(),
    timestamp: new Date().toISOString(),
    data: processedData,
    source: postData.source || 'root-endpoint',
    path: '/'
  });

  // จำกัดจำนวนข้อมูล (เก็บแค่ 100 รายการล่าสุด)
  if (userData.length > 100) {
    userData = userData.slice(-100);
  }

  const responseData = {
    success: true,
    method: 'POST',
    path: '/',
    timestamp: new Date().toISOString(),
    requestCount: requestCount,
    receivedData: postData,
    processedData: processedData,
    message: 'POST data processed successfully at root endpoint',
    data: {
      currentTime: new Date().toLocaleString('th-TH'),
      serverInfo: {
        platform: 'Google Apps Script',
        version: scriptInfo.version,
        environment: scriptInfo.environment
      },
      userData: userData.slice(-5),
      statistics: {
        totalRequests: requestCount,
        dataCount: userData.length
      }
    }
  };

  return createJsonResponse(responseData);
}

/**
 * จัดการ GET request ที่ /api path
 */
function handleApiGet(e) {
  const responseData = {
    success: true,
    method: 'GET',
    path: '/api',
    timestamp: new Date().toISOString(),
    requestCount: requestCount,
    parameters: e.parameter,
    message: 'API GET request processed successfully',
    data: {
      currentTime: new Date().toLocaleString('th-TH'),
      serverInfo: {
        platform: 'Google Apps Script',
        version: scriptInfo.version,
        environment: scriptInfo.environment
      },
      userData: userData.slice(-10), // ส่งข้อมูล 10 รายการล่าสุด
      statistics: {
        totalRequests: requestCount,
        dataCount: userData.length
      }
    }
  };

  return createJsonResponse(responseData);
}

/**
 * จัดการ POST request ที่ /api path
 */
function handleApiPost(e) {
  // Parse POST data
  let postData;
  try {
    postData = JSON.parse(e.postData.contents);
  } catch (parseError) {
    console.error('❌ Error parsing POST data:', parseError);
    return createErrorResponse('Invalid JSON data', parseError.message);
  }

  console.log('📋 POST Data:', postData);

  // ตรวจสอบและประมวลผลข้อมูล
  const processedData = processPostData(postData);

  // เพิ่มข้อมูลลงใน userData
  userData.push({
    id: Date.now(),
    timestamp: new Date().toISOString(),
    data: processedData,
    source: postData.source || 'api-endpoint',
    path: '/api'
  });

  // จำกัดจำนวนข้อมูล (เก็บแค่ 100 รายการล่าสุด)
  if (userData.length > 100) {
    userData = userData.slice(-100);
  }

  const responseData = {
    success: true,
    method: 'POST',
    path: '/api',
    timestamp: new Date().toISOString(),
    requestCount: requestCount,
    receivedData: postData,
    processedData: processedData,
    message: 'API POST data processed successfully',
    data: {
      currentTime: new Date().toLocaleString('th-TH'),
      serverInfo: {
        platform: 'Google Apps Script',
        version: scriptInfo.version,
        environment: scriptInfo.environment
      },
      userData: userData.slice(-10),
      statistics: {
        totalRequests: requestCount,
        dataCount: userData.length
      }
    }
  };

  return createJsonResponse(responseData);
}

/**
 * Health check endpoint
 */
function handleHealthCheck(e) {
  const responseData = {
    success: true,
    method: 'GET',
    path: '/health',
    timestamp: new Date().toISOString(),
    message: 'Server is healthy',
    data: {
      status: 'OK',
      uptime: new Date().toISOString(),
      serverInfo: {
        platform: 'Google Apps Script',
        version: scriptInfo.version,
        environment: scriptInfo.environment
      }
    }
  };

  return createJsonResponse(responseData);
}

/**
 * Stats endpoint
 */
function handleStatsGet(e) {
  const responseData = {
    success: true,
    method: 'GET',
    path: '/stats',
    timestamp: new Date().toISOString(),
    message: 'Server statistics',
    data: {
      statistics: {
        totalRequests: requestCount,
        dataCount: userData.length,
        lastRequest: userData.length > 0 ? userData[userData.length - 1].timestamp : null
      },
      serverInfo: {
        platform: 'Google Apps Script',
        version: scriptInfo.version,
        environment: scriptInfo.environment
      }
    }
  };

  return createJsonResponse(responseData);
}

/**
 * Test endpoint
 */
function handleTestGet(e) {
  const responseData = {
    success: true,
    method: 'GET',
    path: '/test',
    timestamp: new Date().toISOString(),
    message: 'Test endpoint working',
    data: {
      test: true,
      randomNumber: Math.floor(Math.random() * 1000),
      serverInfo: {
        platform: 'Google Apps Script',
        version: scriptInfo.version,
        environment: scriptInfo.environment
      }
    }
  };

  return createJsonResponse(responseData);
}

/**
 * Test POST endpoint
 */
function handleTestPost(e) {
  // Parse POST data
  let postData;
  try {
    postData = JSON.parse(e.postData.contents);
  } catch (parseError) {
    console.error('❌ Error parsing POST data:', parseError);
    return createErrorResponse('Invalid JSON data', parseError.message);
  }

  const responseData = {
    success: true,
    method: 'POST',
    path: '/test',
    timestamp: new Date().toISOString(),
    message: 'Test POST endpoint working',
    receivedData: postData,
    data: {
      test: true,
      echo: postData,
      randomNumber: Math.floor(Math.random() * 1000),
      serverInfo: {
        platform: 'Google Apps Script',
        version: scriptInfo.version,
        environment: scriptInfo.environment
      }
    }
  };

  return createJsonResponse(responseData);
}

/**
 * ประมวลผลข้อมูลที่ได้รับจาก POST request
 */
function processPostData(postData) {
  const processed = {
    original: postData,
    processed: {},
    validation: {
      isValid: true,
      errors: []
    },
    metadata: {
      processedAt: new Date().toISOString(),
      requestId: Date.now(),
      scriptVersion: scriptInfo.version
    }
  };

  // ตรวจสอบข้อมูลที่จำเป็น
  if (!postData.message) {
    processed.validation.isValid = false;
    processed.validation.errors.push('Missing message field');
  }

  // ประมวลผลข้อมูล
  if (postData.message) {
    processed.processed.message = postData.message.toString().toUpperCase();
  }

  if (postData.timestamp) {
    processed.processed.timestamp = new Date(postData.timestamp).toISOString();
  }

  // เพิ่มข้อมูลเพิ่มเติม
  processed.processed.serverProcessedAt = new Date().toISOString();
  processed.processed.requestId = Date.now();

  return processed;
}

/**
 * สร้าง JSON response พร้อม CORS headers ที่ครอบคลุม
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data, null, 2))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Origin, Accept')
    .setHeader('Access-Control-Max-Age', '86400')
    .setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    .setHeader('Pragma', 'no-cache')
    .setHeader('Expires', '0');
}

/**
 * สร้าง error response พร้อม CORS headers
 */
function createErrorResponse(message, error) {
  const errorData = {
    success: false,
    error: {
      message: message,
      details: error,
      timestamp: new Date().toISOString(),
      scriptVersion: scriptInfo.version
    }
  };

  return ContentService
    .createTextOutput(JSON.stringify(errorData, null, 2))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Origin, Accept')
    .setHeader('Access-Control-Max-Age', '86400')
    .setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    .setHeader('Pragma', 'no-cache')
    .setHeader('Expires', '0');
}

/**
 * ฟังก์ชันสำหรับล้างข้อมูลทั้งหมด (สำหรับการทดสอบ)
 */
function clearAllData() {
  userData = [];
  requestCount = 0;
  console.log('🗑️ All data cleared');
  return {
    success: true,
    message: 'All data cleared successfully',
    timestamp: new Date().toISOString(),
    scriptVersion: scriptInfo.version
  };
}

/**
 * ฟังก์ชันสำหรับดูข้อมูลทั้งหมด (สำหรับการทดสอบ)
 */
function getAllData() {
  return {
    success: true,
    data: {
      userData: userData,
      requestCount: requestCount,
      timestamp: new Date().toISOString(),
      scriptVersion: scriptInfo.version
    }
  };
}

/**
 * ฟังก์ชันสำหรับทดสอบการเชื่อมต่อ
 */
function testConnection() {
  return {
    success: true,
    message: 'Google Apps Script server is running',
    timestamp: new Date().toISOString(),
    scriptInfo: scriptInfo
  };
}

/**
 * ฟังก์ชันสำหรับเพิ่มข้อมูลทดสอบ
 */
function addTestData() {
  const testData = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    data: {
      message: 'Test data from server',
      source: 'server-test',
      randomNumber: Math.floor(Math.random() * 1000)
    },
    source: 'server-test',
    path: '/test'
  };

  userData.push(testData);

  return {
    success: true,
    message: 'Test data added successfully',
    data: testData,
    timestamp: new Date().toISOString(),
    scriptVersion: scriptInfo.version
  };
}

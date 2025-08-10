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

/**
 * ฟังก์ชันหลักที่ Google Apps Script จะเรียกเมื่อมี request เข้ามา
 * รองรับทั้ง GET และ POST requests
 */
function doGet(e) {
  console.log('📥 GET Request received');
  console.log('📋 Parameters:', e.parameter);

  try {
    // เพิ่ม request count
    requestCount++;

    // สร้าง response data
    const responseData = {
      success: true,
      method: 'GET',
      timestamp: new Date().toISOString(),
      requestCount: requestCount,
      parameters: e.parameter,
      message: 'GET request processed successfully',
      data: {
        currentTime: new Date().toLocaleString('th-TH'),
        serverInfo: {
          platform: 'Google Apps Script',
          version: '1.0.0',
          environment: 'Production'
        },
        userData: userData.slice(-10), // ส่งข้อมูล 10 รายการล่าสุด
        statistics: {
          totalRequests: requestCount,
          dataCount: userData.length
        }
      }
    };

    // ส่ง response กลับ
    return createJsonResponse(responseData);

  } catch (error) {
    console.error('❌ Error in doGet:', error);
    return createErrorResponse('GET request failed', error.message);
  }
}

/**
 * ฟังก์ชันสำหรับรับ POST requests
 */
function doPost(e) {
  console.log('📥 POST Request received');

  try {
    // เพิ่ม request count
    requestCount++;

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
      source: postData.source || 'unknown'
    });

    // จำกัดจำนวนข้อมูล (เก็บแค่ 100 รายการล่าสุด)
    if (userData.length > 100) {
      userData = userData.slice(-100);
    }

    // สร้าง response data
    const responseData = {
      success: true,
      method: 'POST',
      timestamp: new Date().toISOString(),
      requestCount: requestCount,
      receivedData: postData,
      processedData: processedData,
      message: 'POST data processed successfully',
      data: {
        currentTime: new Date().toLocaleString('th-TH'),
        serverInfo: {
          platform: 'Google Apps Script',
          version: '1.0.0',
          environment: 'Production'
        },
        userData: userData.slice(-10), // ส่งข้อมูล 10 รายการล่าสุด
        statistics: {
          totalRequests: requestCount,
          dataCount: userData.length
        }
      }
    };

    // ส่ง response กลับ
    return createJsonResponse(responseData);

  } catch (error) {
    console.error('❌ Error in doPost:', error);
    return createErrorResponse('POST request failed', error.message);
  }
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
      timestamp: new Date().toISOString()
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
    timestamp: new Date().toISOString()
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
      timestamp: new Date().toISOString()
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
    serverInfo: {
      platform: 'Google Apps Script',
      version: '1.0.0',
      environment: 'Production'
    }
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
    source: 'server-test'
  };

  userData.push(testData);

  return {
    success: true,
    message: 'Test data added successfully',
    data: testData,
    timestamp: new Date().toISOString()
  };
}

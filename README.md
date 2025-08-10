# 🚀 Google Apps Script Webapp Tester

โปรเจคทดสอบการเชื่อมต่อ GET/POST requests ไปยัง Google Apps Script webapp ที่สร้างด้วย **React** และ **TypeScript**

## ✨ คุณสมบัติ

- 🎯 **React Components**: แยก components เป็นส่วนๆ เพื่อการจัดการที่ดี
- 🔒 **TypeScript**: Type-safe code พร้อม interfaces และ types
- 🎨 **Tailwind CSS**: UI ที่สวยงามและ responsive
- 💾 **Local Storage**: บันทึกการตั้งค่าไว้ใน browser
- 📱 **Responsive Design**: รองรับทุกขนาดหน้าจอ
- ♿ **Accessibility**: รองรับ screen readers และ keyboard navigation

## 🏗️ โครงสร้างโปรเจค

```
simple-gs/
├── src/
│   ├── components/          # React components
│   │   ├── ConfigSection.tsx
│   │   ├── ButtonsSection.tsx
│   │   ├── ResultsSection.tsx
│   │   ├── ResultItem.tsx
│   │   └── Message.tsx
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   └── api.ts
│   ├── main.tsx            # Main React app
│   └── index.html          # HTML entry point
├── Code.gs                 # Google Apps Script server
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
└── vite.config.ts          # Vite build config
```

## 🚀 การติดตั้งและใช้งาน

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. รัน Development Server

```bash
npm run dev
```

### 3. Build สำหรับ Production

```bash
npm run build
```

### 4. Type Checking

```bash
npm run type-check
```

### 5. Deploy ไปยัง GitHub Pages

```bash
npm run deploy
```

## 🔧 การตั้งค่า Google Apps Script

### 1. อัปโหลด Code.gs ไปยัง Google Apps Script
### 2. Deploy เป็น webapp
### 3. ใช้ URL ที่ได้ในแอปพลิเคชัน

## 🎯 Components หลัก

### ConfigSection
- การตั้งค่า Google Apps Script URL
- POST Data (JSON format)
- GET Parameters

### ButtonsSection
- Test GET Request
- Test POST Request
- Test Both
- Clear Results

### ResultsSection
- แสดงผลลัพธ์การทดสอบ
- จัดการข้อมูลแบบ real-time

### Message
- แสดง error/success messages
- Auto-dismiss หลังจาก 5 วินาที

## 📊 TypeScript Interfaces

```typescript
interface AppConfig {
  scriptUrl: string;
  postData: string;
  getParams: string;
}

interface ServerResponse {
  success: boolean;
  method: 'GET' | 'POST';
  timestamp: string;
  // ... more properties
}

interface ResultItem {
  method: 'GET' | 'POST';
  success: boolean;
  statusCode?: number;
  duration?: number;
  // ... more properties
}
```

## 🎨 Styling

ใช้ **Tailwind CSS** สำหรับ styling ทั้งหมด:
- Responsive grid system
- Gradient backgrounds
- Smooth animations
- Modern UI components

## 🔒 Security Features

- Input validation
- Error handling
- CORS headers ใน Google Apps Script
- Safe JSON parsing

## 📱 Responsive Design

- Mobile-first approach
- Grid layout ที่ปรับตัวได้
- Touch-friendly buttons
- Optimized สำหรับทุกขนาดหน้าจอ

## 🚀 Performance

- React hooks optimization
- Memoized callbacks
- Efficient state management
- Lazy loading components

## 📝 License

MIT License - ใช้งานได้อย่างอิสระ

---

สร้างด้วย ❤️ โดยใช้ React + TypeScript + Tailwind CSS

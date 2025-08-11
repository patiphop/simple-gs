# Google Script Client

A modern React application for testing Google Apps Script endpoints with a beautiful, responsive UI built with Tailwind CSS v4.

## 🚀 **Latest Update: Tailwind CSS v4 Upgrade**

This project has been successfully upgraded to **Tailwind CSS v4.1.11** with the following improvements:

### **New Features & Enhancements:**
- ✨ **Glass Morphism Effects**: Added `glass-effect` utility class for modern UI
- 🎨 **Gradient Text**: New `gradient-text` utility for beautiful typography
- 📱 **Improved Responsiveness**: Better mobile-first design approach
- 🎭 **Enhanced Animations**: Smoother transitions and micro-interactions
- 🚀 **Performance Optimizations**: Faster build times and smaller CSS output
- 🎯 **Modern CSS Features**: Better support for latest CSS standards

### **New Utility Classes:**
```css
.glass-effect          /* Glass morphism with backdrop blur */
.gradient-text         /* Gradient text with background clip */
.text-balance          /* Balanced text wrapping */
.text-pretty          /* Pretty text formatting */
.scrollbar-hide       /* Hidden scrollbars */
```

## 🛠 **Tech Stack**

- **Frontend**: React 19.1.1 + Vite 7.1.0
- **Styling**: Tailwind CSS 4.1.11
- **Icons**: Heroicons 2.2.0
- **UI Components**: Headless UI 2.2.7
- **Build Tool**: Vite with PostCSS optimization

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone <your-repo-url>
cd simple-gs

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 **Tailwind CSS v4 Features**

### **Configuration**
The project uses the latest Tailwind v4 configuration with:
- Modern CSS-in-JS approach
- Optimized PostCSS pipeline
- Production-ready CSS minification
- Enhanced tree-shaking

### **Custom Components**
```css
/* Enhanced button styles with v4 features */
.btn-primary {
  @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-95;
}

/* Glass morphism cards */
.card {
  @apply bg-white rounded-xl shadow-sm border border-gray-200 p-6 backdrop-blur-sm;
}
```

## 🔧 **Development**

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### **Project Structure**
```
src/
├── App.jsx           # Main application component
├── index.css         # Tailwind CSS imports + custom styles
└── main.jsx         # Application entry point
```

## 🌟 **Key Features**

- **Real-time API Testing**: Test Google Apps Script endpoints
- **Beautiful UI**: Modern design with glass morphism effects
- **Responsive Design**: Mobile-first approach
- **Performance Monitoring**: Response time tracking
- **Error Handling**: Comprehensive error states
- **Data Visualization**: Structured response display

## 📱 **Responsive Design**

The application is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interactions
- Optimized for all screen sizes

## 🎯 **Performance**

- **Tailwind v4 Optimizations**: Faster builds and smaller CSS
- **CSS Minification**: Production-ready with cssnano
- **Tree Shaking**: Unused CSS removal
- **Lazy Loading**: Optimized component loading

## 🔮 **Future Enhancements**

- Dark mode support
- Custom theme builder
- Advanced animations
- Performance analytics
- Accessibility improvements

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using React + Vite + Tailwind CSS v4**

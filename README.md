# Premium Store - Static Product Showcase Website

A modern static product showcase website with responsive design, providing beautiful user interface and smooth interactive experience.

## 🌟 Features

### Main Features
- **Responsive Design** - Perfect adaptation for desktop, tablet and mobile devices
- **Product Display** - Beautiful product card layout with category filtering
- **Interactive Experience** - Smooth scrolling, animations and hover effects
- **Mobile Optimization** - Hamburger menu and touch-friendly interface
- **Contact Form** - Complete contact form functionality
- **Media Gallery** - Image and video carousel with swipe support

### Technical Features
- **Pure Static Website** - No server required, can be deployed to any static hosting service
- **Modern UI** - Using CSS Grid, Flexbox and modern CSS features
- **Performance Optimized** - Lightweight code with fast loading
- **SEO Friendly** - Semantic HTML structure
- **Accessibility** - Compliant with web accessibility standards

## 📁 Project Structure

```
good/
├── index.html          # Main page
├── styles.css          # Style file
├── script.js           # JavaScript functionality
├── customer-service.html # Customer service page
└── README.md           # Project documentation
```

## 🚀 Quick Start

### Local Development
1. Clone or download project files
2. Open `index.html` directly in browser
3. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

### Deploy to Web
- **GitHub Pages**: Push files to GitHub repository and enable Pages service
- **Netlify**: Drag and drop folder to Netlify for deployment
- **Vercel**: Connect GitHub repository for automatic deployment
- **Any Static Hosting Service**: Upload files directly

## 🎨 Customization

### Modify Product Data
Edit the `products` array in `script.js` file:

```javascript
const products = [
    {
        id: 1,
        name: "Product Name",
        description: "Product Description",
        price: "$Price",
        category: "Category",
        images: ["image1.jpg", "image2.jpg"],
        videos: ["video1.mp4"]
    },
    // Add more products...
];
```

### Modify Styles
- Main color: Change `#3498db` color value in CSS
- Font: Change `font-family` property of `body`
- Layout: Adjust `max-width` value of `.container`

### Add New Features
- Search function: Uncomment `searchProducts` function
- Shopping cart page: Extend shopping cart functionality
- Product detail page: Create new HTML pages

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 767px and below

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styles and animations
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icon library

## 📄 License

MIT License - Free to use and modify

## 🤝 Contributing

Welcome to submit Issues and Pull Requests to improve this project!

## 📞 Contact

For questions or suggestions, please contact us:
- Email: info@goodshop.com
- Phone: 400-123-4567

---

**Note**: This is a demo project with sample product data. Please replace with real product information when using in production.

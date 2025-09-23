# 📚 Digital E-Books Store

A simple, static React e-books selling website with Tailwind CSS styling. Perfect for selling e-books with easy manual management.

## 🚀 Live Development

The site is running at: http://localhost:5173/

## 📖 How to Manage Your Books

### Adding a New Book

1. Open `src/data/booksData.js`
2. Add a new book object to the `booksData` array:

```javascript
{
  id: 7, // Use the next available ID
  title: "Your Book Title",
  price: 25.99,
  cover: "https://your-main-cover-image-url.jpg", // Main cover for homepage
  images: [
    "https://your-main-cover-image-url.jpg",     // Same as cover
    "https://your-back-cover-image-url.jpg",     // Back cover
    "https://your-sample-page-1-url.jpg",        // Sample page 1
    "https://your-sample-page-2-url.jpg",        // Sample page 2
    "https://your-table-contents-url.jpg"        // Table of contents
  ],
  fullDescription: "Full detailed description for the book details page",
  pages: 300
}
```

**Note:** You can add as many images as you want in the `images` array. Customers will be able to scroll through all images when viewing the book details.

### Updating a Book

1. Find the book in `src/data/booksData.js`
2. Modify any properties you want to change
3. Save the file - changes will appear immediately!

### Deleting a Book

1. Find the book object in `src/data/booksData.js`
2. Remove the entire book object from the array
3. Save the file

### Updating Your Instagram Link

1. Open `src/data/booksData.js`
2. Change the `instagramUrl` at the bottom of the file:

```javascript
export const instagramUrl = "https://instagram.com/yourusername";
```

## 🎨 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Book grid layout on homepage
- ✅ Individual book detail pages
- ✅ **Multiple image gallery** with side scrolling
- ✅ Instagram integration for purchases
- ✅ Clean, professional design
- ✅ Easy book management through code
- ✅ Touch-friendly image navigation
- ✅ Search-friendly URLs

## 🛠 Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📁 Project Structure

```
src/
├── data/
│   └── booksData.js          # All book data - EDIT THIS FILE
├── components/
│   └── BookCard.jsx          # Book card component for homepage
├── pages/
│   ├── Homepage.jsx          # Main page showing all books
│   └── BookDetails.jsx       # Individual book details page
├── App.jsx                   # Main app with routing
└── index.css                 # Styles and Tailwind imports
```

## 🎯 For Quick Updates

**Most Common Tasks:**

1. **Add a new book**: Edit `src/data/booksData.js` and add to the array
2. **Change prices**: Edit the `price` field in `src/data/booksData.js`
3. **Update Instagram**: Change `instagramUrl` in `src/data/booksData.js`
4. **Change site title**: Edit the header in `src/pages/Homepage.jsx`

## 📸 Book Cover Images

For best results, use images that are:
- **Aspect ratio**: 3:4 (width:height)
- **Minimum size**: 300x400 pixels
- **Format**: JPG, PNG, or WebP
- **Hosting**: Upload to a service like Imgur, Cloudinary, or your own server

## 🚀 Deployment

This is a static site that can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Run `npm run build` to create the production files in the `dist/` folder.

---

**Happy selling! 📚✨**
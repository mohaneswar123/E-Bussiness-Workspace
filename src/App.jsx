import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
import Homepage from './pages/Homepage';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <CartProvider>
      {/* 👇 Add basename for GitHub Pages */}
      <Router basename={process.env.NODE_ENV === "production" ? "/E-Bussiness-Workspace" : "/"}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // CartProvider is in CartContext.jsx
import Homepage from './pages/Homepage';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

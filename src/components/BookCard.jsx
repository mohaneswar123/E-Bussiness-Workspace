import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const BookCard = ({ book, onAddToCart, onBuyNow }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    addToCart(book);
    
    // Call the notification callback if provided
    if (onAddToCart) {
      onAddToCart(book);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    
    // Call the buy now callback if provided
    if (onBuyNow) {
      onBuyNow(book);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100/50 overflow-hidden group">
      <Link to={`/book/${book.id}`} className="block">
        <div className="aspect-[3/4] overflow-hidden relative">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-800 leading-relaxed line-clamp-2 font-['Poppins',_sans-serif]">
            {book.title}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-light text-gray-700 font-['Montserrat',_sans-serif]">
              ₹{book.price}
            </span>
            <span className="text-xs font-medium text-purple-600 bg-gradient-to-r from-purple-100 to-indigo-100 px-3 py-1.5 rounded-full border border-purple-200">
              {book.category}
            </span>
          </div>
          <div className="flex justify-center">
            <span className="text-xs text-slate-500 bg-gradient-to-r from-slate-100 to-gray-100 px-4 py-1.5 rounded-full flex items-center space-x-1.5 border border-slate-200">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>{book.pages} pages</span>
            </span>
          </div>
        </div>
      </Link>
      
      {/* Action Buttons - Outside Link to prevent navigation */}
      <div className="px-6 pb-6 space-y-3">
        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3.5 px-6 rounded-lg font-semibold text-base hover:from-amber-600 hover:to-amber-700 transition-transform duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/30 font-['Montserrat',_sans-serif]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Order Now</span>
        </button>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-stone-800 text-white py-3.5 px-6 rounded-lg font-semibold text-base hover:bg-stone-900 transition-transform duration-300 transform hover:scale-105 font-['Montserrat',_sans-serif]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>

    </div>
  );
};

export default BookCard;
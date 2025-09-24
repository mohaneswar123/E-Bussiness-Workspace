import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { booksData } from '../data/booksData';
import { useCart } from '../hooks/useCart';
import ImageGallery from '../components/ImageGallery';
import CartIcon from '../components/CartIcon';
import Cart from '../components/Cart';
import CartNotification from '../components/CartNotification';
import RegistrationForm from '../components/RegistrationForm';

// This is the themed version of the BookDetails component.
// It aligns perfectly with the "Scholarly & Warm" theme of the Homepage.
// - Typography: Uses 'Playfair Display' for the book title.
// - Color Scheme: Employs 'stone' and 'amber' for a consistent, warm aesthetic.
// - UI Elements: Buttons and tags are restyled for a premium, cohesive feel.

const BookDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [notification, setNotification] = useState({ isVisible: false, item: null });
  const book = booksData.find(book => book.id === parseInt(id));

  const handleAddToCart = () => {
    addToCart(book);
    setNotification({ isVisible: true, item: book });
  };

  const hideNotification = () => {
    setNotification({ isVisible: false, item: null });
  };

  const handleBuyNow = () => {
    setShowRegistrationForm(true);
  };

  // Themed "Not Found" Page
  if (!book) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center text-center p-4">
        <div>
          <div className="text-7xl mb-6 opacity-40">📚</div>
          <h2 className="text-3xl font-['Playfair_Display',_serif] text-stone-900 mb-2">
            Book Not Found
          </h2>
          <p className="text-stone-600 mb-8">
            The title you're looking for doesn't seem to be in our library.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-stone-800 text-white rounded-lg hover:bg-stone-900 transition-colors font-['Montserrat',_sans-serif] text-sm font-medium"
          >
            ← Return to Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      {/* Header */}
      <header className="bg-stone-50/80 backdrop-blur-lg border-b border-stone-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium hidden sm:block"
              >
                ← Back to Library
              </Link>
              <span className="text-stone-300 hidden sm:block">|</span>
              <Link
                to="/"
                className="text-2xl font-medium text-stone-900 font-['Playfair_Display',_serif]"
              >
                InkɅura
              </Link>
            </div>
            <CartIcon onClick={() => setIsCartOpen(true)} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200/70 overflow-hidden">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            {/* Book Cover Gallery */}
            <div className="p-6 sm:p-8">
              <ImageGallery 
                images={book.images || [book.cover]} 
                title={book.title} 
              />
            </div>

            {/* Book Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <div className="space-y-6">
                {/* Category & Author */}
                <div>
                  <span className="bg-amber-50 text-amber-800 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-['Montserrat',_sans-serif] border border-amber-200/50">
                    {book.category}
                  </span>
                  <p className="text-stone-500 mt-3">by {book.author}</p>
                </div>
                
                {/* Book Title */}
                <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 font-['Playfair_Display',_serif] leading-tight">
                  {book.title}
                </h1>
                
                {/* Description */}
                <p className="text-stone-600 leading-relaxed text-base">
                  {book.fullDescription}
                </p>

                {/* Price and Pages */}
                <div className="flex items-baseline justify-between pt-2">
                  <span className="text-4xl font-bold text-amber-600 font-['Poppins',_sans-serif]">
                    ${book.price.toFixed(2)}
                  </span>
                  <span className="text-lg text-stone-500">
                    <span className="font-semibold text-stone-700">Pages:</span> {book.pages}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 space-y-3">
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-lg font-semibold text-base hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/30 font-['Montserrat',_sans-serif]"
                  >
                    Order Now
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-stone-800 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-stone-900 transition-colors flex items-center justify-center space-x-2 font-['Montserrat',_sans-serif] transform hover:scale-105 duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Cart Notification */}
      <CartNotification 
        isVisible={notification.isVisible}
        onHide={hideNotification}
        item={notification.item}
      />

      {/* Registration Form */}
      <RegistrationForm
        isOpen={showRegistrationForm}
        onClose={() => setShowRegistrationForm(false)}
        singleItem={book}
      />
    </div>
  );
};

export default BookDetails;
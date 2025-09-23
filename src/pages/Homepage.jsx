import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import CartIcon from '../components/CartIcon';
import Cart from '../components/Cart';
import CartNotification from '../components/CartNotification';
import RegistrationForm from '../components/RegistrationForm';
import { booksData } from '../data/booksData';

// This is a refactored version of the Homepage component with a new "Scholarly & Warm" theme.
// Theme highlights:
// - Color Palette: Warm tones using Tailwind's `stone` and `amber` colors.
// - Typography: Introduces 'Playfair Display' for an elegant, classic feel on the main header.
// - Styling: Uses gradients, softer shadows, and refined borders for a more premium look.
// - No functionality has been changed.

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState({ isVisible: false, item: null });
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedBookForPurchase, setSelectedBookForPurchase] = useState(null);

  // Get unique categories from books data
  const categories = ['All', ...new Set(booksData.map(book => book.category))];

  // Filter books based on selected category
  const filteredBooks = selectedCategory === 'All' 
    ? booksData 
    : booksData.filter(book => book.category === selectedCategory);

  const handleAddToCart = (book) => {
    // Show notification
    setNotification({ isVisible: true, item: book });
  };

  const handleBuyNow = (book) => {
    setSelectedBookForPurchase(book);
    setShowRegistrationForm(true);
  };

  const hideNotification = () => {
    setNotification({ isVisible: false, item: null });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      {/* Header */}
      <header className="bg-stone-50/80 backdrop-blur-lg border-b border-stone-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-stone-900 font-['Playfair_Display',_serif]">
                InkɅura
              </h1>
              <p className="text-sm sm:text-base text-stone-500 font-light font-['Lato',_sans-serif] mt-1">
                Curated collections for the discerning reader.
              </p>
            </div>
            <div className="flex-shrink-0">
              <CartIcon onClick={() => setIsCartOpen(true)} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Stats and Filter */}
        <div className="text-center mb-10">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-stone-200/50">
            <p className="text-stone-600 mb-5 text-base font-light font-['Lato',_sans-serif]">
              Explore our library of <span className="font-medium text-stone-800">{booksData.length}</span> hand-picked titles.
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 font-['Montserrat',_sans-serif] ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-stone-800 to-stone-900 text-white shadow-lg shadow-stone-800/20 transform scale-105'
                      : 'bg-white/80 text-stone-700 hover:bg-stone-100/80 border border-stone-200/70 hover:border-stone-400 shadow-sm'
                  }`}
                >
                  {category}
                  {category !== 'All' && (
                    <span className="ml-1.5 text-xs opacity-60">
                      ({booksData.filter(book => book.category === category).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Results count */}
            {selectedCategory !== 'All' && (
              <p className="text-stone-500 text-sm mt-6 font-light font-['Lato',_sans-serif]">
                Showing {filteredBooks.length} title{filteredBooks.length !== 1 ? 's' : ''} in "{selectedCategory}"
              </p>
            )}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
          ))}
        </div>

        {/* Empty state (if no books in selected category) */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 sm:p-16 shadow-sm border border-stone-200/50 max-w-md mx-auto">
              <div className="text-7xl sm:text-8xl mb-8 opacity-40">✒️</div>
              <h3 className="text-xl sm:text-2xl font-light text-stone-800 mb-4 font-['Poppins',_sans-serif]">
                No titles in {selectedCategory}
              </h3>
              <p className="text-stone-500 mb-8 text-sm sm:text-base font-light font-['Lato',_sans-serif]">
                Perhaps try another category or check back soon for new additions.
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/40 transform hover:scale-105 font-['Montserrat',_sans-serif]"
              >
                Browse All Titles
              </button>
            </div>
          </div>
        )}
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
        onClose={() => {
          setShowRegistrationForm(false);
          setSelectedBookForPurchase(null);
        }}
        singleItem={selectedBookForPurchase}
      />

      {/* Decorative Divider */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 mt-20">
        <hr className="border-t border-stone-200/80" />
      </div>

      {/* Footer */}
      <footer className="bg-transparent mt-12 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center text-stone-500">
            <p className="font-light text-sm font-['Lato',_sans-serif]">&copy; 2024 InkɅura. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
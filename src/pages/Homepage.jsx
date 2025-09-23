import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import CartIcon from '../components/CartIcon';
import Cart from '../components/Cart';
import CartNotification from '../components/CartNotification';
import RegistrationForm from '../components/RegistrationForm';
import { booksData } from '../data/booksData';

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
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50/30">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0">
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-1 font-['Poppins',_sans-serif]">
                InkɅura
              </h1>
              <p className="text-sm sm:text-base text-gray-500 font-light font-['Lato',_sans-serif]">
                Curated collection for every person
              </p>
            </div>
            <div className="flex-shrink-0">
              <CartIcon onClick={() => setIsCartOpen(true)} />
            </div>
          </div>
        </div>
      </header>



      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        {/* Stats and Filter */}
        <div className="text-center mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100/50">
            <p className="text-gray-500 mb-4 text-sm font-light font-['Lato',_sans-serif]">
              Explore our collection of <span className="font-medium text-gray-700">{booksData.length}</span> carefully selected items
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-500 font-['Montserrat',_sans-serif] ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-lavender-100 to-lavender-200 text-lavender-700 shadow-lg shadow-lavender-200/30'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200/50 hover:border-lavender-200 shadow-sm'
                  }`}
                >
                  {category}
                  {category !== 'All' && (
                    <span className="ml-1 text-xs opacity-75">
                      ({booksData.filter(book => book.category === category).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Results count */}
            {selectedCategory !== 'All' && (
              <p className="text-gray-400 text-sm mt-6 font-light font-['Lato',_sans-serif]">
                {filteredBooks.length} item{filteredBooks.length !== 1 ? 's' : ''} in {selectedCategory}
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
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 sm:p-16 shadow-sm border border-gray-100/50 max-w-md mx-auto">
              <div className="text-6xl sm:text-8xl mb-8 opacity-30">📚</div>
              <h3 className="text-xl sm:text-2xl font-light text-gray-700 mb-6 font-['Poppins',_sans-serif]">
                No items in {selectedCategory}
              </h3>
              <p className="text-gray-500 mb-8 text-sm sm:text-base font-light font-['Lato',_sans-serif]">
                Explore other categories or check back soon for new additions
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-8 py-4 bg-gradient-to-r from-peach-100 to-peach-200 text-peach-700 rounded-2xl font-medium hover:from-peach-200 hover:to-peach-300 transition-all duration-300 shadow-lg shadow-peach-200/30 font-['Montserrat',_sans-serif]"
              >
                View All Items
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

      {/* Footer */}
      <footer className="bg-white/50 border-t border-gray-100/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center text-gray-400">
            <p className="font-light font-['Lato',_sans-serif]">&copy; 2024 InkɅura. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
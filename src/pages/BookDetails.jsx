import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { booksData } from '../data/booksData';
import { useCart } from '../hooks/useCart';
import ImageGallery from '../components/ImageGallery';
import CartIcon from '../components/CartIcon';
import Cart from '../components/Cart';
import CartNotification from '../components/CartNotification';
import RegistrationForm from '../components/RegistrationForm';

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

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h2>
          <p className="text-gray-600 mb-6">The book you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    setShowRegistrationForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              ← Back to Books
            </Link>
            <CartIcon onClick={() => setIsCartOpen(true)} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Book Cover Gallery */}
            <div className="lg:p-8 p-6">
              <ImageGallery 
                images={book.images || [book.cover]} 
                title={book.title} 
              />
            </div>

            {/* Book Details */}
            <div className="p-6 lg:p-8">
              <div className="space-y-6">
                {/* Book Name (Heading) */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {book.title}
                  </h1>
                </div>

                {/* Price and Category */}
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-blue-600">
                    ${book.price}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {book.category}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {book.fullDescription}
                  </p>
                </div>

                {/* Pages */}
                <div>
                  <span className="text-lg text-gray-700">
                    <span className="font-semibold">Pages:</span> {book.pages}
                  </span>
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg mb-3"
                >
                  📱 Buy Now
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
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
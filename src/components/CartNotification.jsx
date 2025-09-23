import React, { useEffect } from 'react';

const CartNotification = ({ isVisible, onHide, item }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000); // Hide after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible || !item) return null;

  return (
    <div className="fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-200 p-4 max-w-sm w-full sm:w-80">
        <div className="flex items-start space-x-3">
          {/* Success Icon */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900">Added to Cart!</h4>
              <button
                onClick={onHide}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mt-2 flex items-center space-x-3">
              {/* Book Cover */}
              <div className="w-12 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Book Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.title}
                </p>
                <p className="text-lg font-bold text-green-600">
                  ${item.price}
                </p>
              </div>
            </div>

            {/* Cart Action */}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                🛒 Item added successfully
              </span>
              <div className="flex items-center space-x-1 text-xs text-blue-600 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span>View Cart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartNotification;
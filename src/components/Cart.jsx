import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import RegistrationForm from './RegistrationForm';

// This is the themed version of the Cart component.
// It features a smooth slide-in animation and styling that perfectly matches
// the "Scholarly & Warm" theme of the application.

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartItemCount } = useCart();
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  
  // Prevents scrolling on the body when the cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to reset the style when the component unmounts
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const handleCheckout = () => {
    setShowRegistrationForm(true);
  };

  return (
    // Main container for handling transitions
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-all duration-500 ${
        isOpen ? 'visible' : 'invisible'
      }`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      ></div>
      
      {/* Cart Panel with slide-in transition */}
      <div 
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-stone-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-stone-200">
            <h2 className="text-2xl font-medium text-stone-900 font-['Playfair_Display',_serif]">
              Your Cart ({cartItemCount})
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:bg-stone-200/70 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-6xl mb-4 opacity-30">📜</div>
                <p className="text-stone-700 text-lg font-medium">Your cart is empty</p>
                <p className="text-sm text-stone-500 mt-1">Find your next great read!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-3 bg-white rounded-lg border border-stone-200/80">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-16 h-24 object-cover rounded-md shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-stone-800 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-stone-500 mt-1">${item.price.toFixed(2)}</p>
                      <div className="flex items-center space-x-3 mt-3">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-md bg-stone-100 flex items-center justify-center text-lg text-stone-600 hover:bg-stone-200 transition-colors"> − </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-md bg-stone-100 flex items-center justify-center text-lg text-stone-600 hover:bg-stone-200 transition-colors"> + </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-semibold text-stone-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-stone-500 hover:text-stone-800 transition-colors mt-2">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-stone-200 p-5 bg-white/50 backdrop-blur-sm space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-stone-800">Total:</span>
                <span className="text-2xl font-bold text-amber-600 font-['Poppins',_sans-serif]">${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3.5 px-4 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/30 transform hover:scale-[1.02] font-['Montserrat',_sans-serif]"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-transparent text-stone-600 py-2.5 px-4 rounded-xl font-medium hover:bg-stone-200/50 transition-colors font-['Montserrat',_sans-serif]"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Registration Form Modal */}
      <RegistrationForm
        isOpen={showRegistrationForm}
        onClose={() => {
          setShowRegistrationForm(false);
          clearCart(); // Clear cart after successful checkout
          onClose(); // Close the main cart panel
        }}
        cartItems={cart}
      />
    </div>
  );
};

export default Cart;
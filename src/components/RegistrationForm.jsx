import React, { useState } from 'react';

const RegistrationForm = ({ isOpen, onClose, cartItems, singleItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    items: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [phoneError, setPhoneError] = useState('');

  // Auto-fill items when form opens
  React.useEffect(() => {
    if (isOpen) {
      let itemsText = '';
      if (singleItem) {
        itemsText = `${singleItem.title} - $${singleItem.price}`;
      } else if (cartItems && cartItems.length > 0) {
        itemsText = cartItems.map(item => 
          `${item.title} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
        ).join(', ');
      }
      
      setFormData(prev => ({
        ...prev,
        items: itemsText
      }));
    }
  }, [isOpen, cartItems, singleItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Remove all non-digit characters
      const phoneDigits = value.replace(/\D/g, '');
      
      // Validate phone number
      if (phoneDigits.length > 10) {
        setPhoneError('Phone number cannot exceed 10 digits');
        return; // Don't update if more than 10 digits
      } else if (phoneDigits.length < 10 && phoneDigits.length > 0) {
        setPhoneError('Phone number must be exactly 10 digits');
      } else if (phoneDigits.length === 10) {
        setPhoneError('');
      } else {
        setPhoneError('');
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: phoneDigits
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate phone number before submission
    if (formData.phone.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits');
      return;
    }
    
    setIsSubmitting(true);
    setPhoneError(''); // Clear any existing error

    try {
      // Using Google Apps Script Web App (free Google Sheets integration)
      // You'll need to replace this URL with your own Google Apps Script URL
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbx4FYt1nIrTiRuM5xMaSdIR8ya3kws-wZ9f8Bs_68joVstQCRagYlJ6p2o3naVaKb7d/exec';
      
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          items: formData.items,
          timestamp: new Date().toISOString(),
          totalAmount: singleItem ? singleItem.price : cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
        })
      });

      // Since we're using no-cors, we can't read the response
      // But we'll assume success if no error is thrown
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ name: '', phone: '', items: '' });
        setSubmitStatus(null);
        onClose();
      }, 6000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-md" onClick={onClose}></div>
      
      {/* Form Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-sm max-w-lg w-full max-h-[95vh] overflow-y-auto border border-gray-100/50">
          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-3 font-['Poppins',_sans-serif]">Complete Order</h2>
                <p className="text-gray-500 text-sm font-light font-['Lato',_sans-serif]">Please provide your details</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 rounded-full p-2 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-xl flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Order Submitted Successfully!</h4>
                  <p className="text-sm text-green-700">We'll contact you soon to confirm your order.</p>
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800 rounded-xl flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Error Submitting Order</h4>
                  <p className="text-sm text-red-700">Please try again or contact us directly.</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Items (Auto-filled, Read-only) */}
              <div className="space-y-2">
                <label htmlFor="items" className="block text-sm font-semibold text-gray-800">
                  📦 Items Ordered
                </label>
                <textarea
                  id="items"
                  name="items"
                  value={formData.items}
                  readOnly
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 text-sm text-gray-700 resize-none focus:outline-none"
                />
              </div>

              {/* Customer Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
                  👤 Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-blue-400 transition-all duration-200 text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-800">
                  📱 Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter 10-digit phone number"
                  maxLength="10"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-0 transition-all duration-200 text-gray-800 placeholder-gray-400 ${
                    phoneError 
                      ? 'border-red-400 focus:border-red-500 bg-red-50' 
                      : 'border-gray-200 focus:border-blue-400'
                  }`}
                />
                {phoneError && (
                  <p className="text-red-600 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{phoneError}</span>
                  </p>
                )}
                {!phoneError && formData.phone.length === 10 && (
                  <p className="text-green-600 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Valid phone number</span>
                  </p>
                )}
              </div>

              {/* Total Amount Display */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700 flex items-center">
                    💰 Total Amount:
                  </span>
                  <span className="text-2xl font-bold text-blue-600 bg-white px-3 py-1 rounded-lg shadow-sm">
                    ${singleItem 
                      ? singleItem.price.toFixed(2)
                      : cartItems ? cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2) : '0.00'
                    }
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200 border-2 border-gray-200 hover:border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.phone || formData.phone.length !== 10 || phoneError}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-[1.02] disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <span>Submitting...</span>
                    </span>
                  ) : (
                    '🚀 Submit Order'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
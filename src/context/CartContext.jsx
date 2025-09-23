import React, { createContext, useReducer, useEffect } from 'react';

// Create Cart Context
export const CartContext = createContext();

// Cart Actions
export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    }
    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    case CART_ACTIONS.CLEAR_CART:
      return { ...state, items: [] };
    case CART_ACTIONS.LOAD_CART:
      return { ...state, items: action.payload || [] };
    default:
      return state;
  }
};

// Initial State
const initialState = { items: [] };

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('ebooks-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ebooks-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (book) => dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: book });
  const removeFromCart = (bookId) => dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: bookId });
  const updateQuantity = (bookId, quantity) => dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: bookId, quantity } });
  const clearCart = () => dispatch({ type: CART_ACTIONS.CLEAR_CART });

  const cartTotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = state.items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartContext.js';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;

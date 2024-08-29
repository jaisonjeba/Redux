import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartContext';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;

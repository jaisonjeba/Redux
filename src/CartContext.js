import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch cart items
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
  const response = await fetch('https://run.mocky.io/v3/141074b0-00e3-4e46-8b59-5ff6491e7eaf');
  const data = await response.json();
  let products = data.products;
  products.forEach(element => {
    element.quantity = 0; // Initialize quantity to 0
  });
  return products;
});

const initialState = {
  items: [], 
  totalQuantity: 0,
  totalAmount: 0.00,
  status: 'idle', // Status for handling loading state
  error: null, // Error state
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity++;
        state.totalQuantity++;
        state.totalAmount += item.price;       
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 0) {
        item.quantity--;
        state.totalQuantity--;
        state.totalAmount -= item.price;
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload);
      if (itemIndex > -1) {
        const item = state.items[itemIndex];
        state.totalQuantity -= item.quantity;
        state.totalAmount -= item.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Set items once fetched
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;

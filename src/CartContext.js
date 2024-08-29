import { createSlice } from '@reduxjs/toolkit';
const fetchCartItems = async () => {
    const response = await fetch('https://run.mocky.io/v3/83a2f20e-c2f7-494b-9f6b-dbb5d2e2655d');
    const data = await response.json();
   let products = data.products;
   products.forEach(element => {
    element.quantity=0;
   });
    return products;
};
let products = await fetchCartItems();
const initialState = {
  items: products, 

  totalQuantity: 0,
  totalAmount: 0.00
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
  }
});

export const { increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;

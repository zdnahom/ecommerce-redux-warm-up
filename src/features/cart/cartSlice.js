import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
const url = 'https://course-api.com/react-useReducer-cart-project';
const initialState = {
  cartItems: [],
  amount: 10,
  total: 0,
  isLoading: true,
};

export const getCartItem = createAsyncThunk('cart/getCartItems',async()=>{
   const res = await fetch(url)
   const data =await res.json()
   console.log(data)
   return data
})
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increaseAmount: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount + 1;
    },
    decreaseAmount: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let total = 0;
      let amount = 0;
      state.cartItems.forEach((item) => {
        total += item.price * item.amount;
        amount += item.amount;
      });
      state.total = total;
      state.amount = amount;
    },
  },
  extraReducers:{
    [getCartItem.pending] : (state)=>{
      state.isLoading = true
    },
    [getCartItem.fulfilled] : (state,action)=>{
      state.isLoading = false
      state.cartItems = action.payload
    },
    [getCartItem.rejected] : (state)=>{
      state.isLoading = false
    },
  }
});
export const {
  clearCart,
  removeItem,
  increaseAmount,
  decreaseAmount,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;

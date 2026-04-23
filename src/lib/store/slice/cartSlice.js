import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = Cookies.get("cart")
  ? { ...JSON.parse(Cookies.get("cart")), loading: true }
  : {
      loading: true,
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "",
    };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      state.cartItems = [...state.cartItems, item];
      Cookies.set("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      state.cartItems.splice(item, 1);
      Cookies.set("cart", JSON.stringify(state));
    },
    removeAllFromCart: (state) => {
      state.cartItems = [];
      Cookies.set("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, removeAllFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;

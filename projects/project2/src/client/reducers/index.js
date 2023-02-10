import { combineReducers } from "redux";

import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  ADD_ONE,
  MINUS_ONE,
  INIT_PRODUCT,
  INIT_USER,
  RESET_USER,
  ADD_ONE_USER,
  MINUS_ONE_USER,
} from "../actions";

export const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case INIT_PRODUCT:
      return [...payload];

    case ADD_PRODUCT:
      return [...state, { ...payload }];

    case EDIT_PRODUCT:
      return state.map((product) => {
        if (payload.id !== product.id) {
          return product;
        }
        return {
          ...product,
          name: payload.name,
          description: payload.description,
          category: payload.category,
          price: payload.price,
          quantityInStock: payload.quantityInStock,
          imgSrc: payload.imgSrc,
        };
      });

    case ADD_ONE:
      return state.map((product) => {
        if (payload != product.id) {
          return product;
        }
        return { ...product, quantity: product.quantity + 1 };
      });

    case MINUS_ONE:
      return state.map((product) => {
        if (payload != product.id) {
          return product;
        }
        return { ...product, quantity: product.quantity - 1 };
      });

    default:
      return state;
  }
};

export const userReducer = (
  state = {
    id: "",
    userType: "guest",
    quantity: 0,
    totPrice: 0,
    cart: [],
  },
  { type, payload }
) => {
  switch (type) {
    case INIT_USER:
      return {
        ...state,
        id: payload.id,
        userType: payload.userType,
        quantity: payload.quantity,
        totPrice: payload.totPrice,
        cart: payload.cart,
      };
    case RESET_USER:
      return {
        id: "",
        userType: "guest",
        quantity: 0,
        totPrice: 0,
        cart: [],
      };
    case ADD_ONE_USER:
      let newCart = [];
      if (state.cart.find((pd) => pd.id === payload.id) !== undefined) {
        newCart = state.cart.map((pd) => {
          if (pd.id !== payload.id) return pd;
          return { ...pd, quantity: pd.quantity + 1 };
        });
      } else {
        newCart = [...state.cart, { id: payload.id, quantity: 1 }];
      }
      return {
        ...state,
        totPrice: state.totPrice + payload.price,
        quantity: state.quantity + 1,
        cart: newCart,
      };
    case MINUS_ONE_USER:
      const newCart2 = state.cart
        .map((pd) => {
          if (pd.id !== payload.id) return pd;
          return { ...pd, quantity: pd.quantity - 1 };
        })
        .filter((pd) => pd.quantity > 0);
      return {
        ...state,
        totPrice: state.totPrice - payload.price,
        quantity: state.quantity - 1,
        cart: newCart2,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  products: reducer,
  user: userReducer,
});

import { combineReducers } from "redux";

import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  ADD_ONE,
  MINUS_ONE,
  INIT_PRODUCT,
  INIT_USER,
  RESET_USER,
  REMOVE_PRODUCT,
  INIT_CART,
  RESET_CART,
} from "../actions";

export const productReducer = (state = [], { type, payload }) => {
  switch (type) {
    case INIT_PRODUCT:
        console.log("init products");
      return [...payload];

    case ADD_PRODUCT:
      return [{ ...payload }, ...state];

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
        if (payload.id != product.id) {
          return product;
        }
        return { ...product, quantity: product.quantity + 1 };
      });

    case MINUS_ONE:
      return state.map((product) => {
        if (payload.id != product.id) {
          return product;
        }
        return { ...product, quantity: product.quantity - 1 };
      });

    case REMOVE_PRODUCT:
      return state.map((product) => {
        if (product.id !== payload.id) return product;
        return { ...product, quantity: 0 };
      });

    case INIT_CART:
      return state.map((product) => {
        if (payload.find((item) => item.id === product.id)) {
          return {
            ...product,
            quantity: payload.find((item) => item.id === product.id).quantity,
          };
        }
        return product;
      });

    case RESET_CART:
      return state.map((product) => {
        return { ...product, quantity: 0 };
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
    case ADD_ONE:
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
        totPrice: state.totPrice + Number(payload.price),
        quantity: state.quantity + 1,
        cart: newCart,
      };
    case MINUS_ONE:
      const newCart2 = state.cart
        .map((pd) => {
          if (pd.id !== payload.id) return pd;
          return { ...pd, quantity: pd.quantity - 1 };
        })
        .filter((pd) => pd.quantity > 0);
      return {
        ...state,
        totPrice: state.totPrice - Number(payload.price),
        quantity: state.quantity - 1,
        cart: newCart2,
      };

    case REMOVE_PRODUCT:
      console.log("remove product");
      const newCart3 = state.cart.filter((pd) => {
        return pd.id !== payload.id;
      });
      return {
        ...state,
        cart: newCart3,
        totPrice: state.totPrice - payload.quantity * Number(payload.price),
        quantity: state.quantity - payload.quantity,
      };

    default:
      return state;
  }
};

// export const errorReducer = (state = {}, { type, payload }) => {
//   switch (type) {
//     case "SET_SIGN_ERROR":
//       return { ...state, ...payload };
//   }
// };

export const rootReducer = combineReducers({
  products: productReducer,
  user: userReducer,
  //   error: errorReducer,
});

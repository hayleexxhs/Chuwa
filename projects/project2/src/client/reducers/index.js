import { combineReducers } from "redux";

import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  ADD_TO_CART,
  INIT_PRODUCT,
  INIT_USER,
  RESET_USER,
  SHOW_DETAIL,
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

    case ADD_TO_CART:
      return state.map((product) => {
        if (payload != product.id) {
          return product;
        }
        return { quantityInCart: product.quantityInCart + 1 };
      });

    default:
      return state;
  }
};

export const userReducer = (
  state = {
    id: "",
    userType: "admin",
    quantity: 0,
    totPrice: 0,
    cart: {},
  },
  { type, payload }
) => {
  switch (type) {
    case INIT_USER:
      console.log(payload.userType);
      return { ...state, ...payload };
    case RESET_USER:
      return {
        id: "",
        userType: "guest",
        quantity: 0,
        totPrice: 0,
        cart: {},
      };
    default:
      return state;
  }
};

// export const detailReducer = (state = {}, { type, payload }) => {
//   switch (type) {
//     case SHOW_DETAIL:
//       return { ...state, ...payload };
//   }
// };

export const rootReducer = combineReducers({
  products: reducer,
  user: userReducer,
  //   detail: detailReducer,
});

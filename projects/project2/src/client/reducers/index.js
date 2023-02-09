import { combineReducers } from "redux";

import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  ADD_TO_CART,
  INIT_PRODUCT,
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
  state = { usertype: "guest", quantity: 0, totPrice: 0.0, cart: {} },
  { type, payload }
) => {
  switch (type) {
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  products: reducer,
  user: userReducer,
});

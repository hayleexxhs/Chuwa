import { combineReducers } from "redux";

import { ADD_PRODUCT, INIT_PRODUCT } from "../actions/index";

export const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case INIT_PRODUCT:
      return [...payload];

    case ADD_PRODUCT:
      return [...state, { ...payload }];

    case "EDIT_PRODUCT":
      return state.map((product, index) => {
        if (payload !== index) {
          return product;
        }
        return { ...product };
      });

    default:
      return state;
  }
};

import {
  showProductApi,
  addProductApi,
  editProductApi,
} from "../api/productApi";
import { addoneApi, subtractoneApi, removeoneApi } from "../api/userApi";

export const INIT_PRODUCT = "INIT_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const ADD_ONE = "ADD_ONE";
export const MINUS_ONE = "MINUS_ONE";
export const INIT_USER = "INIT_USER";
export const RESET_USER = "RESET_USER";
export const SHOW_DETAIL = "SHOW_DETAIL";
export const ADD_ONE_USER = "ADD_ONE_USER";
export const MINUS_ONE_USER = "MINUS_ONE_USER";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const INIT_CART = "INIT_CART";
export const RESET_CART = "RESET_CART";

export const initUser = (dispatch) => (content) => {
  dispatch({
    type: INIT_USER,
    payload: content,
  });
};

export const resetUser = (dispatch) => () => {
  dispatch({
    type: RESET_USER,
  });
};

export const initProduct = (dispatch) => async (content) => {
  try {
    const response = await showProductApi();
    const products = await response.json();
    dispatch({
      type: INIT_PRODUCT,
      payload: { products: products, user: content },
    });
  } catch (error) {
    // dispatch({
    //   type: ERROR,
    //   payload: { error: true, message: "init todos failed" },
    // });
    console.log(error);
  }
};

export const addProduct = (dispatch) => async (content) => {
  try {
    const response = await addProductApi(content);
    const { message, newProduct } = await response.json();
    console.log(message);
    dispatch({
      type: ADD_PRODUCT,
      payload: { ...newProduct },
    });
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = (dispatch) => async (content) => {
  try {
    const response = await editProductApi(content);
    const { message } = await response.json();
    console.log(message);
    dispatch({
      type: EDIT_PRODUCT,
      payload: content,
    });
  } catch (error) {
    console.log(error);
  }
};

export const initCart = (dispatch) => (content) => {
  dispatch({
    type: INIT_CART,
    payload: content,
  });
};

export const resetCart = (dispatch) => () => {
  dispatch({
    type: RESET_CART,
  });
};

export const addOne = (dispatch) => async (content) => {
  try {
    if (content.token) {
      const response = await addoneApi(content);
      const resJson = await response.json();
      if (resJson.message === "jwt expired") {
        localStorage.removeItem("userToken");
        dispatch({
          type: RESET_USER,
        });
        dispatch({
          type: RESET_CART,
        });
      } else {
        dispatch({
          type: ADD_ONE,
          payload: content,
        });
      }
    } else {
      dispatch({
        type: ADD_ONE,
        payload: content,
      });
    }
  } catch (error) {
    console.log("error");
  }
};

export const minusOne = (dispatch) => async (content) => {
  try {
    if (content.token) {
      const response = await subtractoneApi(content);
      const resJson = await response.json();
      if (resJson.message === "jwt expired") {
        localStorage.removeItem("userToken");
        dispatch({
          type: RESET_USER,
        });
        dispatch({
          type: RESET_CART,
        });
      } else {
        dispatch({
          type: MINUS_ONE,
          payload: content,
        });
      }
    } else {
      dispatch({
        type: MINUS_ONE,
        payload: content,
      });
    }
  } catch (error) {}
};

export const removeProduct = (dispatch) => async (content) => {
  try {
    if (content.token) {
      const response = await removeoneApi(content);
      const resJson = await response.json();
      if (resJson.message === "jwt expired") {
        localStorage.removeItem("userToken");
        dispatch({
          type: RESET_USER,
        });
        dispatch({
          type: RESET_CART,
        });
      } else {
        dispatch({
          type: REMOVE_PRODUCT,
          payload: content,
        });
      }
    } else {
      dispatch({
        type: REMOVE_PRODUCT,
        payload: content,
      });
    }
  } catch (error) {
    console.log("error");
  }
};
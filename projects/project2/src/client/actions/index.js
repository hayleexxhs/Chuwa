import {
  showProductApi,
  addProductApi,
  editProductApi,
} from "../api/productApi";

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

export const initUser = (dispatch) => (content) => {
  dispatch({
    type: INIT_USER,
    payload: content,
  });
  console.log(content);
};

export const resetUser = (dispatch) => () => {
  dispatch({
    type: RESET_USER,
  });
};

export const initProduct = (dispatch) => async () => {
  try {
    const response = await showProductApi();
    const products = await response.json();
    dispatch({
      type: INIT_PRODUCT,
      payload: products,
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
    const { message, newProduct } = await response.json();
    console.log(message);
    dispatch({
      type: EDIT_PRODUCT,
      payload: { ...newProduct },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addOne = (dispatch) => (id) => {
  dispatch({
    type: ADD_ONE,
    payload: id,
  });
};

export const minusOne = (dispatch) => (id) => {
  dispatch({
    type: MINUS_ONE,
    payload: id,
  });
};

export const addOneUser = (dispatch) => (content) => {
  dispatch({
    type: ADD_ONE_USER,
    payload: content,
  });
};

export const minusOneUser = (dispatch) => (content) => {
  dispatch({
    type: MINUS_ONE_USER,
    payload: content,
  });
};
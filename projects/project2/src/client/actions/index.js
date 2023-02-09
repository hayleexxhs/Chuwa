//1. add product
//2. edit product
import {
  showProductApi,
  addProductApi,
  editProductApi,
} from "../api/productApi";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const INIT_PRODUCT = "INIT_PRODUCT";
export const ERROR = "ERROR";

export const initProduct = (dispatch) => async () => {
  try {
    const response = await showProductApi();
    const products = await response.json();
    //setProductData(resJson);
    dispatch({
      type: INIT_PRODUCT,
      payload: products,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: { error: true, message: "init products failed" },
    });
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

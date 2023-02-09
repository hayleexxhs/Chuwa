export const showProductApi = async () => {
  const response = await fetch("/api/showproduct");
  return response;
};

export const addProductApi = async (signupInfo: any) => {
  const response = await fetch("/api/addproduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupInfo),
  });
  return response;
};

export const editProductApi = async (signupInfo: any) => {
  const response = await fetch("/api/editproduct", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupInfo),
  });
  return response;
};

export const getProductDetailApi = async (signupInfo: any) => {
  const response = await fetch("/api/getproductdetail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupInfo),
  });
  return response;
};

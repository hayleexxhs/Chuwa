export const showProductApi = async () => {
  const response = await fetch("/api/showproduct");
  return response;
};

export const addProductApi = async (addproductInfo: any) => {
  const response = await fetch("/api/addproduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addproductInfo),
  });
  return response;
};

export const editProductApi = async (editproductInfo: any) => {
  const response = await fetch("/api/editproduct", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editproductInfo),
  });
  return response;
};

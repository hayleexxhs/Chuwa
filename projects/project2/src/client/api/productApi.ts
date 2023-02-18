export const showProductApi = async () => {
  const response = await fetch("/api/showproduct");
  return response;
};

export const addProductApi = async (info: any) => {
  const response = await fetch("/api/addproduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  return response;
};

export const editProductApi = async (info: any) => {
  const response = await fetch("/api/editproduct", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  return response;
};

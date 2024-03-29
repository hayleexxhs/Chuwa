import { info } from "console";

export const updateuserApi = async (info: any) => {
  const response = await fetch("/api/updateuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  return response;
};

export const signinApi = async (info: any) => {
  const response = await fetch("/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  return response;
};

export const signoutApi = async () => {
  const response = await fetch("/api/signout", {
    method: "POST",
  });
  return response;
};

export const signupApi = async (info: any) => {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  return response;
};

export const addoneApi = async (info: any) => {
  const response = await fetch("/api/addone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  return response;
};

export const subtractoneApi = async (info: any) => {
  const response = await fetch("/api/subtractone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  return response;
};

export const removeoneApi = async (info: any) => {
  const response = await fetch("/api/removeone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  return response;
};

export const updatePasswordApi = async () => {};

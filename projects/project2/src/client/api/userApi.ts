import { info } from "console";

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

export const signoutApi = async (info: any) => {
  const response = await fetch("/api/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
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

export const updatePasswordApi = async () => {};

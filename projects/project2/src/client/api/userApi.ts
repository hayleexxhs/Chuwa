export const getCustomerApi = async () => {
  const response = await fetch("/api/customers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const signinApi = async (signinInfo: any) => {
  const response = await fetch("/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signinInfo),
  });
  return response;
};

export const signoutApi = async () => {
  const response = await fetch("/api/signout", {
    method: "POST",
  });
  return response;
};

export const signupApi = async (signupInfo: any) => {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupInfo),
  });
  return response;
};

export const updatePasswordApi = async () => {};

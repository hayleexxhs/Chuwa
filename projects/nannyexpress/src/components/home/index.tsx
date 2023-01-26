import React, { useEffect, useState } from "react";
import { StatusCodes } from "http-status-codes";

import api from "../../api/loginApi";

import Login from "../login";
import Logout from "../logout";
import HireForm from "../form/";

import "antd/dist/antd.css";

function Home() {
  const [isLoggdIn, setIsLoggedin] = useState(false);

  useEffect(() => {
    async function getCustomer() {
      try {
        const response = await api.getCustomerApi();
        if (response.status === StatusCodes.OK) {
          setIsLoggedin(true);
        } else if (response.status === StatusCodes.UNAUTHORIZED) {
          setIsLoggedin(false);
        } else {
          throw new Error(
            `Get customer API response status error: ${response.status}`
          );
        }
      } catch (error) {
        throw new Error(`Get customer API error: ${JSON.stringify(error)}`);
      }
    }
    getCustomer();
  }, []);

  return (
    <>
      {isLoggdIn ? (
        <Logout handleLogout={() => setIsLoggedin(false)} />
      ) : (
        <Login handleLogin={() => setIsLoggedin(true)} />
      )}
      <HireForm />
    </>
  );
}

export default Home;

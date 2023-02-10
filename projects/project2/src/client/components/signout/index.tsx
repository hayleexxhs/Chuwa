import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signoutApi } from "../../api/userApi";
import { resetUser } from "../../actions";

import "./index.css";

const Signout = ({ handleOnSignout = () => {} }) => {
  const dispatch = useDispatch();
  const handleSignout = async () => {
    // handleOnSignout();
    try {
      const response = await signoutApi();
      if (response.status !== 200) {
        throw new Error(
          `Logout API response status error: ${JSON.stringify(response)}`
        );
      } else {
        handleOnSignout();
        resetUser(dispatch)();
      }
    } catch (error) {
      throw new Error(`Logout API error: ${JSON.stringify(error)}`);
    }
  };

  return (
    <>
      <a onClick={handleSignout}>Sign Out</a>{" "}
    </>
  );
};

export default Signout;

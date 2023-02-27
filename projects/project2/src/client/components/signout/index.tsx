import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { signoutApi } from "../../api/userApi";
import { resetUser, resetCart } from "../../actions";

import "./index.css";

const Signout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleSignout = async () => {
    // handleOnSignout();
    try {
      const response = await signoutApi();
      if (response.status !== 200) {
        throw new Error(
          `Logout API response status error: ${JSON.stringify(response)}`
        );
      } else {
        // handleOnSignout();
        resetUser(dispatch)();
        resetCart(dispatch)();
        localStorage.removeItem("userToken");
      }
    } catch (error) {
      throw new Error(`Logout API error: ${JSON.stringify(error)}`);
    }
  };

  return (
    <>
      <a onClick={handleSignout}>Sign Out</a>
    </>
  );
};

export default Signout;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { signoutApi } from "../../api/userApi";
import { resetUser } from "../../actions";

import "./index.css";

const Signout = ({ handleOnSignout = () => {} }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleSignout = async () => {
    console.log("On Click Sign Out");
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
        console.log(user);
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

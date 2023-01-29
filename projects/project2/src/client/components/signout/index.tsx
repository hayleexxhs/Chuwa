import React, { useState } from "react";
import { signoutApi } from "../../api/userApi";

import "./index.css";

const Signout = () => {
  const handleSignout = async () => {
    console.log("onClick Sign Out");
    try {
      const response = await signoutApi();
      if (response.status !== 200) {
        throw new Error(
          `Logout API response status error: ${JSON.stringify(response)}`
        );
      } else {
        // setIsSignedIn(false);
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

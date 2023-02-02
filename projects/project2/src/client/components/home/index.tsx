import React, { useState, useEffect } from "react";

import { getCustomerApi } from "../../api/userApi";
import Signout from "../signout";
import SignContent from "../signcontent";

import "./index.css";

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignin = () => {
    setIsSignedIn(true);
  };

  const handleSignout = () => {
    setIsSignedIn(false);
  };

  // useEffect(() => {
  //   async function getCustomer() {
  //     try {
  //       const response = await getCustomerApi();
  //       if (response.status === 200) {
  //         setIsSignedIn(true);
  //       } else if (response.status === 401) {
  //         setIsSignedIn(false);
  //       } else {
  //         throw new Error(
  //           `Get customer API response status error: ${response.status}`
  //         );
  //       }
  //     } catch (error) {
  //       throw new Error(`Get customer API error: ${JSON.stringify(error)}`);
  //     }
  //   }
  //   getCustomer();
  // }, []);

  return (
    <>
      {isSignedIn ? (
        <Signout handleOnSignout={handleSignout} />
      ) : (
        <SignContent handleOnSignin={handleSignin} />
      )}
    </>
  );
};

export default Home;

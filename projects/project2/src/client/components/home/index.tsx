import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getCustomerApi } from "../../api/userApi";
import Signout from "../signout";
import SignContent from "../signcontent";

import "./index.css";

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  // const handleSignin = () => {
  //   setIsSignedIn(true);
  // };

  // const handleSignout = () => {
  //   setIsSignedIn(false);
  // };

  return (
    <>
      {user.isLog ? (
        // <Signout handleOnSignout={handleSignout} />
        <Signout />
      ) : (
        // <SignContent handleOnSignin={handleSignin} />
        <SignContent />
      )}
    </>
  );
};

export default Home;

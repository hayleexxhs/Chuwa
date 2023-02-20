import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Signout from "../signout";
import SignContent from "../signcontent";

import "./index.css";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);

  return <>{user.isLog ? <Signout /> : <SignContent />}</>;
};

export default Home;

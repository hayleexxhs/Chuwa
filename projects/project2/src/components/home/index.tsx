import React, { useState } from "react";
import Modal from "../../common/modal";

import Signin from "../signin";
import Signup from "../signup";
import ForgotPassword from "../forgotpassword";

import "./index.css";

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [visible, setVisible] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const onClickSignIn = () => {
    setVisible(true);
  };

  const handleTitleText = (title: string) => {
    setTitleText(title);
  };

  const handleShowSignIn = () => {
    setIsSignUp(false);
  };

  const handleShowSignUp = () => {
    setIsSignUp(true);
  };

  const handleShowForgotPassword = () => {
    setIsForgotPassword(true);
  };

  return (
    <>
      <a onClick={onClickSignIn}>{isSignedIn ? "Sign Out" : "Sign In"}</a>
      <Modal
        width={600}
        titleText={titleText}
        visible={visible}
        setVisible={setVisible}
        setIsSignUp={setIsSignUp}
        setIsForgotPassword={setIsForgotPassword}
      >
        {isSignUp ? (
          <Signup
            handleTitleText={handleTitleText}
            handleShowSignIn={handleShowSignIn}
          />
        ) : isForgotPassword ? (
          <ForgotPassword handleTitleText={handleTitleText} />
        ) : (
          <Signin
            handleTitleText={handleTitleText}
            handleShowSignUp={handleShowSignUp}
            handleShowForgotPassword={handleShowForgotPassword}
          />
        )}
      </Modal>
    </>
  );
};

export default Home;

import React, { useState } from "react";
import Modal from "../../common/modal";
import { SIGNIN_FORM } from "../../content/form/signin";
import { SIGNUP_FORM } from "../../content/form/signup";

import Signin from "../signin";
import Signup from "../signup";

import "./index.css";

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [visible, setVisible] = useState(false);

  const [titleText, setTitleText] = useState("");

  const onClickSignIn = () => {
    setVisible(true);
  };

  const handleTitleText = (title: string) => {
    setTitleText(title);
  };

  return (
    <>
      <a onClick={onClickSignIn}>{isSignedIn ? "Sign Out" : "Sign In"}</a>
      <Modal
        width={600}
        titleText={titleText}
        visible={visible}
        setVisible={setVisible}
      >
        {isSignUp ? (
          <Signup handleTitleText={handleTitleText} />
        ) : (
          <Signin handleTitleText={handleTitleText} />
        )}
      </Modal>
    </>
  );
};

export default Home;

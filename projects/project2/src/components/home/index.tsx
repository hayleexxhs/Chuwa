import React, { useState } from "react";
import Modal from "../../common/modal";
import { SIGNIN_FORM } from "../../content/form/signin";
import { SIGNUP_FORM } from "../../content/form/signup";

import Signin from "../signin";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [visible, setVisible] = useState(true);

  const [titleText, setTitleText] = useState("");

  return (
    <>
      <a>{isLoggedIn ? "Sign Out" : "Sign In"}</a>
      <Modal
        width={600}
        titleText={titleText}
        visible={visible}
        setVisible={setVisible}
      >
        <Signin />
      </Modal>
    </>
  );
};

export default Home;

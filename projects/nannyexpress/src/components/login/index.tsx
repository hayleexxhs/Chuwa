import React, { useState } from "react";
import { Button } from "antd";

import Modal from "../../common/modal";
import ModalContent from "./modalContent";
import DisclaimerModal from "./disclaimer";

import { LOGIN_FORM } from "../../content/form";
import "./index.css";

const Login = ({ handleLogin = () => {} }) => {
  const [visible, setVisible] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleShowDisclaimer = (isShow: boolean) => {
    console.log("App: handle show disclaimer");
    setShowDisclaimer(isShow);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        {LOGIN_FORM.LOGIN}
      </Button>
      <Modal
        width={showDisclaimer ? 761 : 393}
        titleText={showDisclaimer ? "Disclaimer" : LOGIN_FORM.LOGIN}
        visible={visible}
        setVisible={setVisible}
        setShowDisclaimer={setShowDisclaimer}
        isDisclaimer={showDisclaimer}
      >
        {showDisclaimer ? (
          <DisclaimerModal />
        ) : (
          <ModalContent
            handleOnLogin={handleLogin}
            handleLoginContent={handleShowDisclaimer}
          />
        )}
      </Modal>
    </>
  );
};

export default Login;

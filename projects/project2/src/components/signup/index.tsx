import React, { useState } from "react";
import { Button } from "antd";
import "antd/dist/reset.css";
import TextInput from "../../common/input/textInput";
import { SIGNUP_FORM } from "../../content/form/signup";
import CONSTANTS from "../../constants";

import "./index.css";

const Signup = ({
  handleTitleText = (title: string) => {},
  handleShowSignIn = () => {},
}) => {
  const [email, setEmail] = useState({
    value: "",
    errorMessage: "",
  });

  handleTitleText(SIGNUP_FORM.TITLE);

  return (
    <>
      <div className="signup-modal-div">
        <TextInput
          value={email.value}
          label={SIGNUP_FORM.EMAIL.LABEL}
          placeholder={SIGNUP_FORM.EMAIL.PLACE_HOLDER}
          errorMessage={SIGNUP_FORM.EMAIL.ERROR_MESSAGE}
          onChange={(e) => setEmail({ ...email, value: e.target.value })}
          // disabled={code.status !== CONSTANTS.VERFI_CODE_STATUS.SEND}
        />

        <Button className="customer-form-submit-button">
          {SIGNUP_FORM.SUBMIT_BUTTON}
        </Button>
        <div className="customer-form-message">
          {SIGNUP_FORM.MESSAGE} <a onClick={handleShowSignIn}> Sign In</a>
        </div>
      </div>
    </>
  );
};

export default Signup;


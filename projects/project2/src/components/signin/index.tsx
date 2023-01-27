import React, { useState } from "react";
import { Button } from "antd";
import "antd/dist/reset.css";
import TextInput from "../../common/input/textInput";
import VerfiCodeInput from "../../common/input/verificationInput";
import { SIGNIN_FORM } from "../../content/form/signin";
import CONSTANTS from "../../constants";

const Signin = () => {
  const [email, setEmail] = useState({
    value: "",
    errorMessage: "",
  });

  return (
    <>
      <TextInput
        value={email.value}
        label={SIGNIN_FORM.EMAIL.LABEL}
        placeholder={SIGNIN_FORM.EMAIL.PLACE_HOLDER}
        errorMessage={SIGNIN_FORM.EMAIL.ERROR_MESSAGE}
        onChange={(e) => setEmail({ ...email, value: e.target.value })}
        // disabled={code.status !== CONSTANTS.VERFI_CODE_STATUS.SEND}
      />

      <Button className="customer-form-submit-button">
        {SIGNIN_FORM.SUBMIT_BUTTON}
      </Button>
    </>
  );
};

export default Signin;

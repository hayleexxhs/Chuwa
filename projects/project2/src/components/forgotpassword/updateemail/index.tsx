import React, { useState } from "react";
import TextInput from "../../../common/input/textInput";
import { Button } from "antd";
import { FORGOT_PASSWORD } from "../../../content/form/forgotpassword";
import "./index.css";

const UpdateEmail = ({ handleSentEmail = () => {} }) => {
  const [email, setEmail] = useState({
    value: "",
    errorMessage: "",
  });

  const onClickUpdatePassword = () => {
    handleSentEmail();
  };

  return (
    <>
      <div className="updateemail-div">
        <div className="updateemail-msg">{FORGOT_PASSWORD.MESSAGE}</div>
        <TextInput
          value={email.value}
          label={FORGOT_PASSWORD.EMAIL.LABEL}
          errorMessage={FORGOT_PASSWORD.EMAIL.ERROR_MESSAGE}
          onChange={(e) => setEmail({ ...email, value: e.target.value })}
          // disabled={code.status !== CONSTANTS.VERFI_CODE_STATUS.SEND}
        />
        <Button
          className="customer-form-submit-button"
          onClick={onClickUpdatePassword}
        >
          {FORGOT_PASSWORD.SUBMIT_BUTTON}
        </Button>
      </div>
    </>
  );
};

export default UpdateEmail;

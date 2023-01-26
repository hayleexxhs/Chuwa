import React, { useState } from "react";
import { Checkbox, Button } from "antd";
import validator from "validator";
import { StatusCodes } from "http-status-codes";

import api from "../../../../api/loginApi";
import TextInput from "../../../../common/input/textInput";
import VerfiCodeInput from "../../../../common/input/verificationInput";

import { LOGIN_FORM as LOGIN_FORM_CONTENT } from "../../../../content/form";
import CONSTANTS from "../../../../constants";

import "antd/dist/antd.css";
import "./index.css";

// ---------------------------------------------------------- //
//npm i --save-dev @types/react-html-parser
//npm i --save-dev @types/validator
const Form = ({
  handleOnLogin = () => {},
  handleModalContent = (isShow: boolean) => {},
}) => {
  const [email, setEmail] = useState({
    value: "",
    errorMessage: "",
  });
  const [code, setCode] = useState({
    value: "",
    errorMessage: "",
    status: CONSTANTS.VERFI_CODE_STATUS.SEND,
  });

  const [check, setCheck] = useState(false);

  // Return emtpy stirng if there is no error
  const validateEmailFEAndSetErrorMessage = () => {
    let errorMessage = "";
    if (!validator.isEmail(email.value)) {
      errorMessage = LOGIN_FORM_CONTENT.EMAIL.ERROR_MESSAGE;
    }
    setEmail({
      ...email,
      errorMessage,
    });
    return errorMessage;
  };

  const validateCodeFEAndSetErrorMessage = () => {
    let errorMessage = "";
    if (code.value.length < 6) {
      errorMessage = LOGIN_FORM_CONTENT.CODE.ERROR_MESSAGE;
    }
    setCode({ ...code, errorMessage });
    return errorMessage;
  };

  const handleSubmit = async () => {
    const emailError = validateEmailFEAndSetErrorMessage();
    const codeError = validateCodeFEAndSetErrorMessage();
    if (!(emailError || codeError)) {
      const response = await api.loginApi({
        customerType: CONSTANTS.USER_TYPE.CUSTOMER,
        email: email.value,
        loginCode: parseInt(code.value),
        rememberMe: check,
      });
      if (response.status !== StatusCodes.OK) {
        throw new Error(
          `Login API response status error: ${JSON.stringify(response)}`
        );
      } else {
        handleOnLogin();
      }
    }
  };

  const generateCustomerCode = async () => {
    const emailError = validateEmailFEAndSetErrorMessage();
    if (!emailError) {
      try {
        const response = await api.generateCodeApi({
          customerType: CONSTANTS.USER_TYPE.CUSTOMER,
          email: email.value,
        });
        if (response.status !== StatusCodes.NO_CONTENT) {
          throw new Error(
            `GenerateCustomerCode API response status error: ${JSON.stringify(
              response
            )}`
          );
        }
      } catch (error) {
        throw new Error(
          `GenerateCustomerCode API error: ${JSON.stringify(error)}`
        );
      }
    }
  };

  const handleOnClickDisclaimer = () => {
    console.log("update showDisclaimer to be true");
    handleModalContent(true);
  };

  return (
    <>
      <TextInput
        value={email.value}
        label={LOGIN_FORM_CONTENT.EMAIL.LABEL}
        placeholder={LOGIN_FORM_CONTENT.EMAIL.PLACE_HOLDER}
        infoMessage={LOGIN_FORM_CONTENT.EMAIL.INFO_MESSAGE}
        errorMessage={email.errorMessage}
        onChange={(e) => setEmail({ ...email, value: e.target.value })}
        disabled={code.status !== CONSTANTS.VERFI_CODE_STATUS.SEND}
      />
      <VerfiCodeInput
        value={code.value}
        status={code.status}
        label={LOGIN_FORM_CONTENT.CODE.LABEL}
        placeholder={LOGIN_FORM_CONTENT.CODE.PLACE_HOLDER}
        sendText={LOGIN_FORM_CONTENT.CODE.SEND_CODE}
        freezeSendText={LOGIN_FORM_CONTENT.CODE.FREEZE_SEND_CODE}
        resendText={LOGIN_FORM_CONTENT.CODE.RESEND_CODE}
        errorMessage={code.errorMessage}
        onChange={(e) => setCode({ ...code, value: e.target.value })}
        setStatus={(status) => setCode({ ...code, status })}
        validateBeforeSendCode={validateEmailFEAndSetErrorMessage}
        generateCode={generateCustomerCode}
      />
      <Checkbox
        className="customer-form-checkbox"
        onChange={(e) => setCheck(e.target.checked)}
      >
        {LOGIN_FORM_CONTENT.REMEMBER_ME}
      </Checkbox>
      <Button className="customer-form-submit-button" onClick={handleSubmit}>
        {LOGIN_FORM_CONTENT.SUBMIT_BUTTON}
      </Button>
      {/* <div className={"customer-form-disclaimer"} dangerouslySetInnerHTML={{ __html: LOGIN_FORM_CONTENT.DISCLAIMER }} /> */}
      <div className={"customer-form-disclaimer"}>
        Please read the <a onClick={handleOnClickDisclaimer}>disclaimer</a>{" "}
        before log in
      </div>
    </>
  );
};

export default Form;

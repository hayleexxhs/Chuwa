import React, { useState } from "react";
import validator from "validator";
import PhoneInput from "../../../../common/input/phoneInput";
import VerfiCodeInput from "../../../../common/input/verificationInput";
import { LOGIN_FORM as LOGIN_FORM_CONTENT } from "../../../../content/form";
import CONSTANTS from "../../../../constants";
import "antd/dist/antd.css";
import { Checkbox, Button } from "antd";
import "./index.css";
import Login from "../..";

interface IProps {
  handleOnLogin: () => void;
  handleModalContent: (isShow: boolean) => void;
}

const Form = ({
  handleOnLogin = () => {},
  handleModalContent = (isShow) => {},
}: IProps) => {
  const [phone, setPhone] = useState({
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
  const validatePhoneFEAndSetErrorMessage = () => {
    let errorMessage = "";
    if (!validator.isMobilePhone(phone.value, "en-US")) {
      errorMessage = LOGIN_FORM_CONTENT.PHONE.ERROR_MESSAGE;
    }
    setPhone({
      ...phone,
      errorMessage,
    });
    return errorMessage;
  };

  const validateCodeFEAndSetErrorMessage = () => {
    let errorMessage = "";
    if (code.value.length < 7) {
      errorMessage = LOGIN_FORM_CONTENT.CODE.ERROR_MESSAGE;
    }
    setCode({ ...code, errorMessage });
    return errorMessage;
  };

  const handleSubmit = () => {
    validatePhoneFEAndSetErrorMessage();
    validateCodeFEAndSetErrorMessage();
    console.log({ phone, code, check });
  };

  const handleOnClickDisclaimer = () => {
    console.log("update showDisclaimer to be true");
    handleModalContent(true);
  };

  return (
    <>
      <PhoneInput
        value={phone.value}
        label={LOGIN_FORM_CONTENT.PHONE.LABEL}
        placeholder={LOGIN_FORM_CONTENT.PHONE.PLACE_HOLDER}
        infoMessage={LOGIN_FORM_CONTENT.PHONE.INFO_MESSAGE}
        errorMessage={phone.errorMessage}
        onChange={(value) => setPhone({ ...phone, value: value })}
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
        validateBeforeSendCode={validatePhoneFEAndSetErrorMessage}
        generateCode={() => {
          /*TBD*/
        }}
      />
      <Checkbox
        className="nanny-form-checkbox"
        onChange={(e) => setCheck(e.target.checked)}
      >
        {LOGIN_FORM_CONTENT.REMEMBER_ME}
      </Checkbox>
      <Button className="nanny-form-submit-button" onClick={handleSubmit}>
        {LOGIN_FORM_CONTENT.SUBMIT_BUTTON}
      </Button>
      <div className={"customer-form-disclaimer"}>
        Please read the <a onClick={handleOnClickDisclaimer}>disclaimer</a>{" "}
        before log in
      </div>
    </>
  );
};

export default Form;

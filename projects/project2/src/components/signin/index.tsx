import React, { useState } from "react";
import { Button, Row, Col } from "antd";
import "antd/dist/reset.css";
import TextInput from "../../common/input/textInput";
import { SIGNIN_FORM } from "../../content/form/signin";
import CONSTANTS from "../../constants";

import "./index.css";

const Signin = ({
  handleTitleText = (title: string) => {},
  handleShowSignUp = () => {},
  handleShowForgotPassword = () => {},
}) => {
  const [email, setEmail] = useState({
    value: "",
    errorMessage: "",
  });

  handleTitleText(SIGNIN_FORM.TITLE);

  return (
    <>
      <div className="signin-modal-div">
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
        <Row className="customer-form-message">
          <Col span={12}>
            {SIGNIN_FORM.MESSAGE} <a onClick={handleShowSignUp}> Sign Up</a>
          </Col>
          <Col span={12} className="forgot-password">
            <a onClick={handleShowForgotPassword}>Forgot password?</a>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Signin;

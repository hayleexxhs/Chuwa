import React, { useState } from "react";
import { Button, Row, Col, Form, Input } from "antd";
import "antd/dist/reset.css";
import TextInput from "../../common/input/textInput";
import { SIGNIN_FORM } from "../../content/form/signin";

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
        <Form layout="vertical">
          <Form.Item
            className="customer-form-item"
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "Invalid Email input!",
              },
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input className="customer-form-textinput" />
          </Form.Item>

          <Form.Item
            className="customer-form-item"
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Invalid password input!",
              },
            ]}
            hasFeedback
          >
            <Input.Password className="customer-form-textinput" />
          </Form.Item>
        </Form>

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

import React, { useState } from "react";
import { Button, Row, Col, Form, Input } from "antd";
import { SIGNIN_FORM } from "../../content/form/signin";
import { signinApi } from "../../api/userApi";

import "./index.css";

const Signin = ({
  handleOnSignin = () => {},
  handleTitleText = (title: string) => {},
  handleShowSignUp = () => {},
  handleShowForgotPassword = () => {},
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  handleTitleText(SIGNIN_FORM.TITLE);

  const handleSubmit = async () => {
    const response = await signinApi({
      email: email,
      password: password,
    });
    const resJson = await response.json();

    console.log(resJson.status);

    if (resJson.status !== "200") {
      console.log("frontend: Sign In failed");
      throw new Error(
        `Signin API response status error: ${JSON.stringify(resJson.message)}`
      );
    } else {
      console.log("succeed");
      handleOnSignin();
    }
  };

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
            <Input
              className="customer-form-textinput"
              onChange={(e) => setEmail(e.target.value)}
            />
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
            <Input.Password
              className="customer-form-textinput"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
        </Form>

        <Button className="customer-form-submit-button" onClick={handleSubmit}>
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

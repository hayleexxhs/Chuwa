import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { SIGNUP_FORM } from "../../content/form/signup";
import { signupApi } from "../../api/userApi";

import "./index.css";

const Signup = ({
  handleOnSignup = () => {},
  handleTitleText = (title: string) => {},
  handleShowSignIn = () => {},
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  handleTitleText(SIGNUP_FORM.TITLE);

  const handleSubmit = async () => {
    const response = await signupApi({
      email: email,
      password: password,
    });

    if (response.status !== 200) {
      throw new Error(
        `Signin API response status error: ${JSON.stringify(response)}`
      );
    } else {
      handleOnSignup();
    }
  };

  return (
    <>
      <div className="signup-modal-div">
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
            <Input className="customer-form-textinput" value={email} />
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
              value={password}
            />
          </Form.Item>
        </Form>

        <Button className="customer-form-submit-button" onClick={handleSubmit}>
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


import React, { useState } from "react";
import { Button, Form, Input } from "antd";
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


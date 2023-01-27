import React, { useState } from "react";
import TextInput from "../../../common/input/textInput";
import { Button, Form, Input } from "antd";
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
        </Form>
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

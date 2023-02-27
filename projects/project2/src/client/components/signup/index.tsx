import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Button, Form, Input, Alert } from "antd";
import { SIGNUP_FORM } from "../../content/form/signup";
import { signupApi } from "../../api/userApi";

import { initCart, initUser } from "../../actions";

import "./index.css";

const Signup = ({
  // handleOnSignup = () => {},
  handleTitleText = (title: string) => {},
  handleShowSignIn = () => {},
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleErrorClose = () => {
    setErrorVisible(false);
    setErrorMessage("");
  };

  handleTitleText(SIGNUP_FORM.TITLE);

  const handleSubmit = async () => {
    if (email && password) {
      const response = await signupApi({
        email: email,
        password: password,
        totPrice: user.totPrice,
        quantity: user.quantity,
        cart: user.cart,
      });
      const resJson = await response.json();

      if (resJson.status !== "200") {
        setErrorMessage(resJson.message);
        setErrorVisible(true);
        throw new Error(
          `Signup API response status error: ${JSON.stringify(resJson.message)}`
        );
      } else {
        // handleOnSignup();
        initUser(dispatch)({
          id: resJson.user.id,
          userType: resJson.user.userType,
          quantity: resJson.user.quantity,
          totPrice: resJson.user.totPrice,
          cart: resJson.user.cart,
        });
        initCart(dispatch)(resJson.user.cart);
        localStorage.setItem("userToken", resJson.token);
      }
    }
  };

  return (
    <>
      <div className="signup-modal-div">
        {errorVisible && (
          <Alert
            type="error"
            message={errorMessage}
            banner
            closable
            afterClose={handleErrorClose}
          />
        )}
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
          <Form.Item>
            <Button
              className="customer-form-submit-button"
              onClick={handleSubmit}
              htmlType="submit"
            >
              {SIGNUP_FORM.SUBMIT_BUTTON}
            </Button>
          </Form.Item>
        </Form>
        <div className="customer-form-message">
          {SIGNUP_FORM.MESSAGE} <a onClick={handleShowSignIn}> Sign In</a>
        </div>
      </div>
    </>
  );
};

export default Signup;


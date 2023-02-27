import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Button, Row, Col, Form, Input, Alert } from "antd";
import { SIGNIN_FORM } from "../../content/form/signin";
// import { useCookies } from "react-cookie";
import { signinApi } from "../../api/userApi";

import { initCart, initUser } from "../../actions";

import "./index.css";

// const token = "";

const Signin = ({
  // handleOnSignin = () => {},
  handleTitleText = (title: string) => {},
  handleShowSignUp = () => {},
  handleShowForgotPassword = () => {},
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const [token, setToken] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  // const error = useSelector((state: RootState) => state.error);

  handleTitleText(SIGNIN_FORM.TITLE);

  const handleErrorClose = () => {
    setErrorVisible(false);
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    if (email && password) {
      const response = await signinApi({
        email: email,
        password: password,
        totPrice: user.totPrice,
        quantity: user.quantity,
        cart: user.cart,
      });
      const resJson = await response.json();

      if (resJson.status !== "200") {
        // console.log("frontend: Sign In failed");
        setErrorMessage(resJson.message);
        setErrorVisible(true);
        throw new Error(
          `Signin API response status error: ${JSON.stringify(resJson.message)}`
        );
      } else {
        initUser(dispatch)({
          id: resJson.user.id,
          userType: resJson.user.userType,
          quantity: resJson.user.quantity,
          totPrice: resJson.user.totPrice,
          cart: resJson.user.cart,
        });
        initCart(dispatch)(resJson.user.cart);
        // handleOnSignin();
        console.log(resJson.token);
        localStorage.setItem('userToken', resJson.token);
      }
    }
  };
 
  return (
    <>
      <div className="signin-modal-div">
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
              {SIGNIN_FORM.SUBMIT_BUTTON}
            </Button>
          </Form.Item>
        </Form>

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

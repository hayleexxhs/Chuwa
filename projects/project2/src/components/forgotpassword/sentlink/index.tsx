import React, { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { FORGOT_PASSWORD } from "../../../content/form/forgotpassword";
import { Space, Row, Col } from "antd";
import "./index.css";

const SentLink = () => {
  return (
    <>
      <div className="sentlink-div">
        <div className="inner-div">
          <MailOutlined
            style={{
              fontSize: 55,
              color: "#5048E5",
              marginTop: -80,
            }}
          />
          <div className="sentlink-msg">{FORGOT_PASSWORD.SENT}</div>
        </div>
      </div>
    </>
  );
};

export default SentLink;

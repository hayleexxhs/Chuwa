import React, { useState } from "react";
import "antd/dist/reset.css";
import UpdateEmail from "./updateemail";
import SentLink from "./sentlink";
import { FORGOT_PASSWORD } from "../../content/form/forgotpassword";
import CONSTANTS from "../../constants";

import "./index.css";

const ForgotPassword = ({ handleTitleText = (title: string) => {} }) => {
  const [isSentLink, setIsSentLink] = useState(false);

  handleTitleText(isSentLink ? "" : FORGOT_PASSWORD.TITLE);

  const handleSentEmail = () => {
    setIsSentLink(true);
  };

  return (
    <>
      <div>
        {isSentLink ? (
          <SentLink />
        ) : (
          <UpdateEmail handleSentEmail={handleSentEmail} />
        )}
      </div>
    </>
  );
};

export default ForgotPassword;

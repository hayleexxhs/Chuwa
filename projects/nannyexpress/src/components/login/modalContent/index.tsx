import React, { useState } from "react";

import NannyForm from "../loginForm/nannyForm";
import CustomerForm from "../loginForm/customerForm";
import DisclaimerModal from "../disclaimer";

import { LOGIN_FORM } from "../../../content/form";
import "./index.css";

const ModalContent = ({
  handleOnLogin = () => {},
  handleLoginContent = (isShow: boolean) => {},
}) => {
  const [isFirstTabSelected, setIsFirstTabSelected] = useState(true);

  return (
    <>
      <div className={"modal-content-tabs"}>
        <div
          onClick={() => setIsFirstTabSelected(true)}
          className={
            isFirstTabSelected
              ? "modal-content-tab-selected"
              : "modal-content-tab"
          }
        >
          {LOGIN_FORM.NANNY_TAB}
        </div>
        <div
          onClick={() => setIsFirstTabSelected(false)}
          className={
            isFirstTabSelected
              ? "modal-content-tab"
              : "modal-content-tab-selected"
          }
        >
          {LOGIN_FORM.CUSTOMER_TAB}
        </div>
      </div>
      <div className={"modal-content-form"}>
        {isFirstTabSelected ? (
          <NannyForm
            handleOnLogin={handleOnLogin}
            handleModalContent={handleLoginContent}
          />
        ) : (
          <CustomerForm
            handleOnLogin={handleOnLogin}
            handleModalContent={handleLoginContent}
          />
        )}
      </div>
    </>
  );
};

export default ModalContent;

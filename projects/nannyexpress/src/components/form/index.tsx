import React from "react";
import Steps from "../../common/steps";
import Form from "./hireForm/index";
import "./index.css";

const HireForm = () => {
  return (
    <div className="hireform-container">
      <Steps stepTitle="基本信息" stepsTitles={["基本信息","招聘要求","工作时间","要求补充"]}/>
      <Form />
    </div>
  );
};

export default HireForm;

import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import "../common.css";
import { Select } from "antd";

const SelectInput = ({
  label = "",
  defaultValue = "工作地点",
  optionsDisplay = ["加州", "德州"],
  optionsValue = ["加州", "德州"],
  onChange = () => { },
  errorMessage = "",
  infoMessage = "",
}) => {
  const { Option } = Select;

  const handleChange = (value: string) => {
    console.log(value);
  };

  return (
    <div className="input-container">
      {label ? <div className={"input-label"}>{label}</div> : null}
      <Select
        placeholder={defaultValue}
        onChange={handleChange}
        className={errorMessage ? "input-comp-error" : "input-comp"}
      >
        {optionsValue.map((optionValue, key) => (
          <Option key={key} value={optionValue}>
            {optionsDisplay[key]}
          </Option>
        ))}
      </Select>
      {!errorMessage && infoMessage ? (
        <div className={"input-info-message"}>{infoMessage}</div>
      ) : null}
      {errorMessage ? (
        <div className={"input-error-message"}>{errorMessage}</div>
      ) : null}
    </div>
  );
};

export default SelectInput;

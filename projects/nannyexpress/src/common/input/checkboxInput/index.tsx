import React from "react";
import "antd/dist/antd.css";
import { Checkbox } from "antd";
import "./index.css";
import "../common.css";

interface IProps {
  label?: string,
  errorMessage?: string,
  infoMessage?: string,
  value?: boolean,
  onChange: (e: any) => void
}

const CheckboxInput = ({
  value = false,
  label = "",
  onChange = () => { },
  errorMessage = "",
  infoMessage = "",
}: IProps) => {
  function handleOnChange(e: any) {
    onChange(e.target.checked);
  }
  return (
    <div className="checkbox-container">
      {label ? <div className={"input-label"}>{label}</div> : null}
      <Checkbox
        checked={value}
        onChange={handleOnChange}
        className={errorMessage ? "input-comp-error" : "input-comp"}
      >
        {label}
      </Checkbox>
      {!errorMessage && infoMessage ? (
        <div className={"input-info-message"}>{infoMessage}</div>
      ) : null}
      {errorMessage ? (
        <div className={"input-error-message"}>{errorMessage}</div>
      ) : null}
    </div>
  );
};

export default CheckboxInput;

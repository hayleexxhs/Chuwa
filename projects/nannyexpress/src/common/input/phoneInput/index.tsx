import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./index.css";
import "../common.css";

interface IProps {
  label?: string,
  value?: string,
  placeholder?: string,
  errorMessage?: string,
  infoMessage?: string,
  disabled?: boolean,
  onChange: (value: any) => void
}

const MyPhoneInput = ({
  label = "",
  value = "",
  disabled = false,
  onChange = () => { },
  placeholder = "",
  errorMessage = "",
  infoMessage = "",
}: IProps) => {
  return (
    <div className={"phone-input-container"}>
      {label ? <div className={"input-label"}>{label}</div> : null}
      <PhoneInput
        disabled={disabled}
        countryCodeEditable={false}
        disableDropdown={true}
        onlyCountries={["us"]}
        country={"us"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        containerClass={errorMessage ? "phone-input-container-error" : ""}
        inputClass={disabled ? "phone-input-disabled" : "phone-input"}
      />
      {!errorMessage && infoMessage ? (
        <div className={"phone-input-info-message"}>{infoMessage}</div>
      ) : null}
      {errorMessage ? (
        <div className={"phone-input-error-message"}>{errorMessage}</div>
      ) : null}
    </div>
  );
};

export default MyPhoneInput;

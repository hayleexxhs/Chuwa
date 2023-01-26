import React, { useState, useEffect, useRef } from "react";
import TextInput from "../textInput";
import "./index.css";
import CONSTANTS from "../../../constants";

interface IProps {
  label?: string,
  value?: string,
  placeholder?: string,
  errorMessage?: string,
  infoMessage?: string,
  sendText?: string,
  freezeSendText?: string,
  resendText?: string,
  status: string,
  maxLength?: number,
  onChange: (e: any) => void,
  setStatus: (status: string) => void,
  generateCode: () => void,
  validateBeforeSendCode: () => string
}

const VerfiCodeInput = ({
  label = "",
  value = "",
  status = CONSTANTS.VERFI_CODE_STATUS.SEND,
  placeholder = "",
  errorMessage = "",
  infoMessage = "",
  sendText = "",
  freezeSendText = "",
  resendText = "",
  maxLength = 6,
  onChange = () => { },
  setStatus = () => { },
  generateCode = async () => { },
  validateBeforeSendCode = () => { return "" },
}: IProps) => {

  // useRef typescript https://www.designcise.com/web/tutorial/how-to-fix-useref-react-hook-cannot-assign-to-read-only-property-typescript-error
  const timerToClear = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [freezeTime, setFreezeTime] = useState(-1);


  // custom hooks
  useEffect(() => {
    if (freezeTime <= 60 && freezeTime > 0) {
      timerToClear.current = setTimeout(() => {
        setFreezeTime(freezeTime - 1);
      }, 1000);
    } else if (freezeTime === 0) {
      setStatus(CONSTANTS.VERFI_CODE_STATUS.RESEND);
      setFreezeTime(-1);
    }
    // eslint-disable-next-line
  }, [freezeTime]);

  // Clear setTimeout when component is ummount
  useEffect(() => {
    return () => {
      clearTimeout(Number(timerToClear.current)); // typescript https://stackoverflow.com/questions/51040703/what-return-type-should-be-used-for-settimeout-in-typescript
    };
  }, []);

  const getInputButtonText = () => {
    switch (status) {
      case CONSTANTS.VERFI_CODE_STATUS.RESEND:
        return resendText;
      case CONSTANTS.VERFI_CODE_STATUS.FREEZE:
        return `${freezeTime} ${freezeSendText}`;
      default:
        return sendText;
    }
  };

  const getVerfiCode = () => {
    if (!validateBeforeSendCode()) {
      try {
        // Trigger get code api
        setStatus(CONSTANTS.VERFI_CODE_STATUS.FREEZE);
        setFreezeTime(60);
      } catch (err) {
        console.log()
      }
    }
  };

  const handleOnClick = async () => {
    switch (status) {
      case CONSTANTS.VERFI_CODE_STATUS.SEND:
      case CONSTANTS.VERFI_CODE_STATUS.RESEND:
        getVerfiCode();
        await generateCode();
        break;
      default:
        return;
    }
  };

  return (
    <div className="verfi-code-input-container">
      <TextInput
        label={label}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        placeholder={placeholder}
        errorMessage={errorMessage}
        infoMessage={infoMessage}
      />
      <div
        className={
          status === CONSTANTS.VERFI_CODE_STATUS.FREEZE
            ? "verfi-code-input-button-disable"
            : "verfi-code-input-button"
        }
        onClick={handleOnClick}
      >
        {getInputButtonText()}
      </div>
    </div>
  );
};

export default VerfiCodeInput;

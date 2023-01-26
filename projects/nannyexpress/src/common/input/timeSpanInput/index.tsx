import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import "./index.css";
import "../common.css";

const TimeSpanInput = ({ label = "", errorMessage = "", infoMessage = "" }) => {
  function disabledDate(current: any) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY/MM/DD";
  return (
    <div className="input-container">
      {label ? <div className={"input-label"}>{label}</div> : null}
      <RangePicker
        format={dateFormat}
        disabledDate={disabledDate}
        placeholder={["上工时间", "下工时间"]}
        className={errorMessage ? "input-comp-error" : "input-comp"}
      />
      {!errorMessage && infoMessage ? (
        <div className={"input-info-message"}>{infoMessage}</div>
      ) : null}
      {errorMessage ? (
        <div className={"input-error-message"}>{errorMessage}</div>
      ) : null}
    </div>
  );
};

export default TimeSpanInput;

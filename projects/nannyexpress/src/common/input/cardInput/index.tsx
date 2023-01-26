import React, { useState } from "react";
import "./index.css";
import "../common.css";

const CardInput = ({
  onClick = () => {},
  isSelected = false,
  displayContent = "月子餐",
}) => {
  const [checked, setChecked] = useState(false);
  const handleOnClick = () => {
    //   onClick(!isSelected);
    setChecked(!checked);
  };
  return (
    <div
      onClick={handleOnClick}
      className={checked ? "card-input-selected" : "card-input"}
    >
      {displayContent}
    </div>
  );
};

export default CardInput;

import React from "react";
import "./index.css";

interface IProps {
  stepTitle?: string,
  stepsTitles: Array<string>
}

const Steps = ({ stepTitle = "", stepsTitles = [] }: IProps) => {
  const stepIdx = stepsTitles.indexOf(stepTitle);
  return (
    <>
      <div className="steps-title">{stepTitle}</div>
      <div className="steps-progress-wrapper">
        {stepsTitles.map((step, key) => (
          <div
            key={key}
            className={
              key === stepsTitles.length - 1
                ? "steps-progress-todo steps-progress-last"
                : key <= stepIdx
                  ? "steps-progress-done"
                  : "steps-progress-todo"
            }
          ></div>
        ))}
      </div>
    </>
  );
};

export default Steps;

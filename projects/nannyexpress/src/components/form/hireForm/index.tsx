import React, { useState } from "react";
import "./index.css";
import AssembleInput from "../../../common/input/assembleInput/";
import SelectInput from "../../../common/input/selectInput/";
import CheckboxInput from "../../../common/input/checkboxInput/";
import TimeSpanInput from "../../../common/input/timeSpanInput/";
import CardInput from "../../../common/input/cardInput/";

const Form = () => {
  const [jobType, setJobType] = useState([]);

  const getJobTypeNode = (displayJobType: string) => {
    return <CardInput displayContent={displayJobType} />
  }

  return (
    <div className="hireform-wrapper">
      <div className="hireform-content-wrapper">
        <AssembleInput
          label={"工作类型(可多选)*"}
          gutter={16}
          components={[{ node: getJobTypeNode("Tesdafdaafdat"), span: 6 }, { node: getJobTypeNode("Test1"), span: 6 }, { node: getJobTypeNode("Test2"), span: 6 }]}
        />
      </div>
    </div>
  );
};

export default Form;

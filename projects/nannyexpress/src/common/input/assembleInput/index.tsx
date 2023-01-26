import React from "react";
import { Row, Col } from 'antd';
import "./index.css";
import "../common.css";

interface IProps {
  label?: string,
  gutter?: number | object,
  components: Array<{ node: JSX.Element | null, span: number }>
}

const AssembleInput = ({
  label = "",
  gutter = 16,
  components = [{ node: null, span: 0 }],
}: IProps) => {
  return (
    <>
      {label ? <div className={"input-label"}>{label}</div> : null}
      <Row gutter={gutter}>
        {components.map((component, key) => (
          <Col span={component.span}>
            {component.node}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AssembleInput;

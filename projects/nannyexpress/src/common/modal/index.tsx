import React from "react";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./index.css";

interface IProps {
  width?: number;
  titleText?: string;
  visible?: boolean;
  children?: JSX.Element;
  setVisible: (isVisible: boolean) => void;
  setShowDisclaimer: (isShow: boolean) => void;
  isDisclaimer: boolean;
}

const MyModal = (props: IProps) => {
  const {
    children,
    width,
    titleText,
    visible,
    setVisible = () => {},
    setShowDisclaimer = () => {},
    isDisclaimer,
  } = props;

  return (
    <>
      <Modal
        width={width}
        closeIcon={<CloseCircleOutlined />}
        title={<div className="modal-title">{titleText}</div>}
        visible={visible}
        footer={null}
        onCancel={() => {
          isDisclaimer ? setShowDisclaimer(false) : setVisible(false);
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default MyModal;

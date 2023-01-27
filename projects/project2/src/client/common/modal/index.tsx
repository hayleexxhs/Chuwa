import React from "react";
import { Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./index.css";

interface IProps {
  width?: number;
  titleText?: string;
  visible?: boolean;
  children?: JSX.Element;
  setVisible: (isVisible: boolean) => void;
  setIsSignUp: (isSignUp: boolean) => void;
  setIsForgotPassword: (isForgotPassword: boolean) => void;
}

const MyModal = (props: IProps) => {
  const {
    children,
    titleText,
    visible,
    setVisible = () => {},
    setIsSignUp = () => {},
    setIsForgotPassword = () => {},
  } = props;

  return (
    <>
      <Modal
        width={600}
        closeIcon={<CloseCircleOutlined />}
        title={<div className="modal-title">{titleText}</div>}
        visible={visible}
        footer={null}
        onCancel={() => {
          setVisible(false);
          setIsSignUp(false);
          setIsForgotPassword(false);
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default MyModal;

import "./index.css";
import { Col, Row, Space } from "antd";
import {
  YoutubeOutlined,
  TwitterOutlined,
  FacebookFilled,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <>
      <Row className="footer-div" align={"middle"}>
        <Col span={6}>&copy; 2022 All Rights Reserved.</Col>
        <Col span={12}>
          <a className="footer-icon">
            <YoutubeOutlined />
          </a>
          <a className="footer-icon">
            <TwitterOutlined />
          </a>
          <a className="footer-icon">
            <FacebookFilled />
          </a>
        </Col>
        <Col span={6}>
          <a className="footer-text">Contact us</a>
          <a className="footer-text">Privacy Policies</a>
          <a className="footer-text">Help</a>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
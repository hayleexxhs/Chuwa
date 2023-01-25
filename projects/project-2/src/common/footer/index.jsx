import "./index.css";
import { Col, Row, Space } from "antd";
import {
  YoutubeOutlined,
  TwitterOutlined,
  FacebookFilled,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <div className="footer-div">
      <Row align={"middle"}>
        <Col span={6}>&copy; 2022 All Rights Reserved.</Col>
        <Col span={12}>
          <a href="" className="footer-icon">
            <YoutubeOutlined />
          </a>
          <a href="" className="footer-icon">
            <TwitterOutlined />
          </a>
          <a href="" className="footer-icon">
            <FacebookFilled />
          </a>
        </Col>
        <Col span={6}>
          <a href="">Contact us</a>
          <a href="">Privacy Policies</a>
          <a href="">Help</a>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
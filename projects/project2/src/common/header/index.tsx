import React from "react";
import "./index.css";
import { Col, Row, Input, Space } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Home from "../../components/home";

const Header = () => {
  const onSearch = (value: string) => console.log(value);
  const suffix = (
    <SearchOutlined
      style={{
        fontSize: 18,
        color: "#979797",
      }}
    />
  );

  const handleSignIn = () => {
    console.log("Onclick Sign In!");
  };

  return (
    <>
      <div>
        <Row className="header-div" align={"middle"}>
          <Col span={6} style={{ fontSize: "12px" }}>
            <b>Management </b>Chuwa
          </Col>
          <Col span={8}>
            <Input
              className="header-input"
              placeholder="Search"
              suffix={suffix}
            />
          </Col>
          <Col span={10}>
            <Space align="center" style={{ textAlign: "right" }}>
              <span>
                <UserOutlined style={{ fontSize: 28 }} />
              </span>
              <a onClick={handleSignIn}>
                <Home />
              </a>
              <a>
                <ShoppingCartOutlined style={{ fontSize: 28 }} />
              </a>
              <span>$0.00</span>
            </Space>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Header;

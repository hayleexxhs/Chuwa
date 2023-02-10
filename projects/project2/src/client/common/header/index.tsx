import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Col, Row, Input, Space } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import Home from "../../components/home";

import "./index.css";

const Header = () => {
  const suffix = (
    <SearchOutlined
      style={{
        fontSize: 18,
        color: "#979797",
      }}
    />
  );

  const user = useSelector((state: RootState) => state.user);

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
              <Home />
              <a>
                <ShoppingCartOutlined style={{ fontSize: 28 }} />
              </a>
              <span>{`$${user.totPrice.toFixed(2)}`}</span>
            </Space>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Header;

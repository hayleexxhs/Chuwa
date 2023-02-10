import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Col, Row, Input, Space, Drawer, List, Button } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import Home from "../../components/home";
import CartItem from "../cartItem";

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

  const [isShowCart, setIsShowCart] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  const [discount, setDiscount] = useState(20);

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
              <a
                onClick={() => {
                  setOpen(true);
                }}
              >
                <ShoppingCartOutlined style={{ fontSize: 28 }} />
              </a>
              <span>{`$${user.totPrice.toFixed(2)}`}</span>
            </Space>
          </Col>
        </Row>
      </div>

      <Drawer title="Cart  " placement="right" onClose={onClose} open={open}>
        <div>
          <List
            dataSource={user.cart}
            renderItem={(item: any) => (
              <List.Item>
                <CartItem id={item.id} />
              </List.Item>
            )}
          />
          <div>
            <span>Apply Discount Code</span>
            <Row>
              <Col span={18}>
                <Input></Input>
              </Col>
              <Col span={6}>
                <Button>Apply</Button>
              </Col>
            </Row>
          </div>
          <hr />
          <div>
            <Row>
              <Col span={18}>Subtotal</Col>
              <Col span={6}>{`$${user.totPrice.toFixed(2)}`}</Col>
            </Row>
            <Row>
              <Col span={18}>Tax</Col>
              <Col span={6}>
                {user.totPrice > discount
                  ? `$${((user.totPrice - discount) * 0.095).toFixed(2)}`
                  : "$0.00"}
              </Col>
            </Row>
            <Row>
              <Col span={18}>Discount</Col>
              <Col span={6}>{`-$${discount.toFixed(2)}`}</Col>
            </Row>
            <Row>
              <Col span={18}>Estimated Total</Col>
              <Col span={6}>
                {user.totPrice > discount
                  ? `$${((user.totPrice - discount) * 1.095).toFixed(2)}`
                  : "$0.00"}
              </Col>
            </Row>
          </div>
          <Button>Countinue to checkout</Button>
        </div>
      </Drawer>
    </>
  );
};

export default Header;

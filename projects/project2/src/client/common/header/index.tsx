import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Col, Row, Input, Space, Drawer, List, Button, Badge } from "antd";
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

  const user = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");

  const applyDiscount = () => {
    if (discountCode === "20 DOLLAR OFF") {
      setDiscount(20);
    }
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
              <Home />
              <a
                onClick={() => {
                  setOpen(true);
                }}
              >
                <Badge size="small" count={user.quantity}>
                  <ShoppingCartOutlined
                    style={{ fontSize: 28, color: "white" }}
                  />
                </Badge>
              </a>
              <span>{`$${user.totPrice.toFixed(2)}`}</span>
            </Space>
          </Col>
        </Row>
      </div>

      <Drawer
        title={`Cart (${user.quantity})`}
        placement="right"
        onClose={onClose}
        open={open}
        width={500}
        headerStyle={{ backgroundColor: "#5048E5", color: "white" }}
      >
        <div>
          <List
            dataSource={user.cart}
            renderItem={(item: any) => (
              <List.Item>
                <CartItem id={item.id} />
              </List.Item>
            )}
          />
          <div style={{ marginTop: "20px" }}>
            <span className="discount-title">Apply Discount Code</span>
            <Row style={{ margin: "10px 15px 35px 15px" }}>
              <Col span={18}>
                <Input
                  className="discount-input"
                  size="large"
                  onChange={(e) => setDiscountCode(e.target.value)}
                ></Input>
              </Col>
              <Col span={6} style={{ textAlign: "right" }}>
                <Button onClick={applyDiscount} className="cart-apply">
                  Apply
                </Button>
              </Col>
            </Row>
          </div>
          <hr />
          <div style={{ marginTop: "20px", marginBottom: "15px" }}>
            <Row className="cart-footer-text">
              <Col span={18}>Subtotal</Col>
              <Col span={6}>{`$${user.totPrice.toFixed(2)}`}</Col>
            </Row>
            <Row className="cart-footer-text">
              <Col span={18}>Tax</Col>
              <Col span={6}>
                {user.totPrice > discount
                  ? `$${((user.totPrice - discount) * 0.095).toFixed(2)}`
                  : "$0.00"}
              </Col>
            </Row>
            <Row className="cart-footer-text">
              <Col span={18}>Discount</Col>
              <Col span={6}>{`-$${discount.toFixed(2)}`}</Col>
            </Row>
            <Row className="cart-footer-text">
              <Col span={18}>Estimated Total</Col>
              <Col span={6}>
                {user.totPrice > discount
                  ? `$${((user.totPrice - discount) * 1.095).toFixed(2)}`
                  : "$0.00"}
              </Col>
            </Row>
          </div>
          <Button className="cart-checkout-btn">Countinue to checkout</Button>
        </div>
      </Drawer>
    </>
  );
};

export default Header;

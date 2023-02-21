import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, Image, Input, List, Drawer } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { RootState } from "../../store";
import { addOne, minusOne, removeProduct } from "../../actions";

import "./index.css";

interface IProps {
  id: string;
}

const CartItem = ({ id }: IProps) => {
  const products = useSelector((state: RootState) => state.products);
  const pd = products.filter((p) => p.id === id)[0];

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    addOne(dispatch)({ id: id, price: pd.price });
  };

  const handleMinus = () => {
    minusOne(dispatch)({ id: id, price: pd.price });
  };

  const addtoCart = (
    <button disabled className="cart-quantity-button" style={{ height: 26 }}>
      <Row>
        <Col span={8}>
          <a style={{ color: "#cccccc" }} onClick={handleMinus}>
            <MinusOutlined />
          </a>
        </Col>
        <Col span={8}>{pd.quantity}</Col>
        <Col span={8}>
          <a style={{ color: "#cccccc" }} onClick={handleAddToCart}>
            <PlusOutlined />
          </a>
        </Col>
      </Row>
    </button>
  );

  return (
    <Row>
      <Col span={8}>
        <Image
          width={120}
          height={120}
          src={`https://${pd.imgSrc}`}
          preview={false}
        ></Image>
      </Col>
      <Col
        span={16}
        style={{ paddingLeft: "3px", display: "flex", flexDirection: "column" }}
      >
        <Row>
          <Col span={18} className="cart-title">
            {pd.name}
          </Col>
          <Col span={6} className="cart-price">{`$${pd.price}`}</Col>
        </Row>
        <Row className="cart-quantity-row">
          <Col span={12}>{addtoCart}</Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <a
              className="cart-remove"
              onClick={() => {
                removeProduct(dispatch)({
                  id: pd.id,
                  price: pd.price,
                  quantity: pd.quantity,
                });
              }}
            >
              Remove
            </a>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CartItem;

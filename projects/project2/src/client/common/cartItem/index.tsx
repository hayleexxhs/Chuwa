import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, Image, Input, List, Drawer } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { RootState } from "../../store";
import { addOne, minusOne, addOneUser, minusOneUser } from "../../actions";

interface IProps {
  id: string;
}

const CartItem = ({ id }: IProps) => {
  const products = useSelector((state: RootState) => state.products);
  const pd = products.filter((p) => p.id === id)[0];

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    addOne(dispatch)(id);
    addOneUser(dispatch)({ id: id, price: pd.price });
  };

  const handleMinus = () => {
    minusOne(dispatch)(id);
    minusOneUser(dispatch)({ id: id, price: pd.price });
  };

  const addtoCart = (
    <button disabled className="product-add-button" style={{ height: 34 }}>
      <Row>
        <Col span={8}>
          <a style={{ color: "white" }} onClick={handleMinus}>
            <MinusOutlined />
          </a>
        </Col>
        <Col span={8}>{pd.quantity}</Col>
        <Col span={8}>
          <a style={{ color: "white" }} onClick={handleAddToCart}>
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
      <Col span={16}>
        <Row>
          <Col>{pd.name}</Col>
          <Col>{`$${pd.price}`}</Col>
        </Row>
        <Row>
          <Col>
            {pd.quantity === 0 ? (
              <Button className="product-add-button" onClick={handleAddToCart}>
                Add
              </Button>
            ) : (
              addtoCart
            )}
          </Col>
          <Col>
            <a>Remove</a>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CartItem;

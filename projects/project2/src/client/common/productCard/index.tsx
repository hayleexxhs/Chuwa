import { Button, Row, Col, Card } from "antd";
import "./index.css";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { addOne, minusOne, addOneUser, minusOneUser } from "../../actions";

interface IProps {
  id: string;
  setIsShowDetail: (isShow: boolean) => void;
  setDetailId: (id: string) => void;
}

const ProductCard = (props: IProps) => {
  const { id, setIsShowDetail, setDetailId } = props;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.products);
  const pd = products.filter((p) => p.id === id)[0];

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
    <>
      <div
        style={{
          margin: "9px",
          width: "240px",
        }}
      >
        <Card className="product-card">
          <img src={`https://${pd.imgSrc}`} />
          <div
            className="product-name"
            onClick={() => {
              // showDetail(dispatch)(id);
              setDetailId(id);
              setIsShowDetail(true);
            }}
          >
            {pd.name}
          </div>
          <div className="product-price">{`$${pd.price}`}</div>
          <Row>
            <Col className="product-gutter-left" span={12}>
              {pd.quantity === 0 ? (
                <Button
                  className="product-add-button"
                  onClick={handleAddToCart}
                >
                  Add
                </Button>
              ) : (
                addtoCart
              )}
            </Col>
            <Col className="product-gutter-right" span={12}>
              <Button
                className="product-edit-button"
                style={
                  user.userType === "admin"
                    ? { display: "visible" }
                    : { display: "none" }
                }
              >
                Edit
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default ProductCard;

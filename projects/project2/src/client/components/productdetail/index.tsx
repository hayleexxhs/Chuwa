import { Col, Row, Button, Image } from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MinusOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { RootState } from "../../store";
import { addOne, minusOne } from "../../actions";

import "./index.css";

interface IProps {
  id: string;
  handleShowDetail: (isShow: boolean) => void;
  handleShowEdit: (isShow: boolean) => void;
}

const ProductDetail = ({ id, handleShowDetail, handleShowEdit }: IProps) => {
  console.log(id);
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  const user = useSelector((state: RootState) => state.user);

  const pd = products.filter((p) => p.id === id)[0];

  const handleAddToCart = () => {
    // addOne(dispatch)({ uid: user.id, id: id, price: pd.price });
    addOne(dispatch)({
      token: localStorage.getItem("userToken"),
      id: id,
      price: pd.price,
    });
  };

  const handleMinus = () => {
    // minusOne(dispatch)({ uid: user.id, id: id, price: pd.price });
    minusOne(dispatch)({
      token: localStorage.getItem("userToken"),
      id: id,
      price: pd.price,
    });
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
      <div className="products-title">Product Detail</div>
      <div className="products-content">
        <a
          onClick={() => {
            handleShowDetail(false);
          }}
        >
          <CloseOutlined />
        </a>
        <Row>
          <Col span={12} style={{ padding: "20px" }}>
            <Image
              width={600}
              height={600}
              src={`https://${pd.imgSrc}`}
              preview={false}
            />
          </Col>
          <Col span={12} style={{ padding: "20px" }}>
            <div className="product-detail-category">{pd.category}</div>
            <div className="product-detail-name">{pd.name}</div>
            <div className="product-detail-price">{`$${pd.price}`}</div>
            <div className="product-detail-description">{pd.description}</div>
            <Row>
              <Col className="" span={4}>
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
              <Col className="product-gutter-right" span={4}>
                <Button
                  className="product-edit-button"
                  onClick={() => {
                    handleShowEdit(true);
                  }}
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
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductDetail;

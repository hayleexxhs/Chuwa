import { Button, Row, Col, Card } from "antd";
import "./index.css";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

interface IProps {
  imgSrc: string;
  productName: string;
  price: number;
  quantity: number;
  setIsShowDetail: (isShow: boolean) => void;
  setProductName: (pName: string) => void;
}

const ProductCard = (props: IProps) => {
  const {
    imgSrc,
    productName,
    price,
    quantity,
    setIsShowDetail,
    setProductName,
  } = props;

  const [quantityInCart, setQuantityInCart] = useState(quantity);

  const handleAddToCart = () => {
    setQuantityInCart(quantityInCart + 1);
  };

  const handleMinus = () => {
    setQuantityInCart(quantityInCart - 1);
  };

  const addtoCart = (
    <button disabled className="product-add-button">
      <Row>
        <Col span={8}>
          <a style={{ color: "white" }} onClick={handleMinus}>
            <MinusOutlined />
          </a>
        </Col>
        <Col span={8}>{quantityInCart}</Col>
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
      <a
        onClick={() => {
          setIsShowDetail(true);
          setProductName(productName);
        }}
      >
        <Card className="product-card">
          <img src={imgSrc} />
          <div className="product-name">{productName}</div>
          <div className="product-price">{`$${price}`}</div>
          <Row>
            <Col className="product-gutter-left" span={12}>
              {quantityInCart === 0 ? (
                <button
                  className="product-add-button"
                  onClick={handleAddToCart}
                >
                  Add
                </button>
              ) : (
                addtoCart
              )}
            </Col>
            <Col className="product-gutter-right" span={12}>
              <Button className="product-edit-button">Edit</Button>
            </Col>
          </Row>
        </Card>
      </a>
    </>
  );
};

export default ProductCard;

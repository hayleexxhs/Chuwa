import { Button, Row, Col, Card } from "antd";
import "./index.css";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

interface IProps {
  imgSrc: string;
  productName: string;
  price: number;
  quantity: number;
}

const ProductCard = (props: IProps) => {
  const { imgSrc, productName, price, quantity } = props;

  const addtoCart = (
    <button disabled className="product-add-button">
      <Row>
        <Col span={8}>
          <a style={{ color: "white" }}>
            <MinusOutlined />
          </a>
        </Col>
        <Col span={8}>{quantity}</Col>
        <Col span={8}>
          <a style={{ color: "white" }}>
            <PlusOutlined />
          </a>
        </Col>
      </Row>
    </button>
  );

  return (
    <>
      <Card className="product-card">
        <img src={imgSrc} />
        <div className="product-name">{productName}</div>
        <div className="product-price">{`$${price}`}</div>
        <Row>
          <Col className="product-gutter-left" span={12}>
            {quantity === 0 ? (
              <button className="product-add-button">Add</button>
            ) : (
              addtoCart
            )}
          </Col>
          <Col className="product-gutter-right" span={12}>
            <Button className="product-edit-button">Edit</Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ProductCard;

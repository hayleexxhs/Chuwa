import { Col, Row, Button, Image } from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { RootState } from "../../store";
import { addOne, minusOne, addOneUser, minusOneUser } from "../../actions";

import "./index.css";

interface IProps {
  id: string;
}

const ProductDetail = ({ id }: IProps) => {
  // const [productData, setProductData] = useState([]);
  console.log(id);
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  const user = useSelector((state: RootState) => state.user);

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
      <div></div>
      <div className="products-title">Product Detail</div>
      <div className="products-content">
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

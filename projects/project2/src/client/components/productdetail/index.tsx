import { Col, Row, Button, Image } from "antd";
import { useState, useEffect } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import "./index.css";

interface IProps {
  pName: string;
}

const ProductDetail = ({ pName }: IProps) => {
  const [productData, setProductData] = useState([]);

  // useEffect(() => {
  //   async function showProductDetail(pName: string) {
  //     try {
  //       const response = await getProductDetailApi({ name: pName });
  //       const resJson = await response.json();
  //       setProductData(resJson);
  //     } catch (error) {
  //       throw new Error(
  //         `Get ProductDetail API error: ${JSON.stringify(error)}`
  //       );
  //     }
  //   }
  //   showProductDetail(pName);
  // }, []);

  const [quantity, setQuantity] = useState(0);

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
      <div className="products-title">Product Detail</div>
      <div className="products-content">
        <Row>
          <Col span={12} style={{ padding: "20px" }}>
            <Image
              width={600}
              height={600}
              src="https://images.evo.com/imgp/700/220021/912632/capita-paradise-snowboard-women-s-2023-.jpg"
              preview={false}
            />
          </Col>
          <Col span={12} style={{ padding: "20px" }}>
            <div className="product-detail-category">Snowboard</div>
            <div className="product-detail-name">CAPiTA Paradise Snowboard</div>
            <div className="product-detail-price">$299</div>
            <div className="product-detail-description">
              Multitech™ Level 6 DeepSpace™ Silkscreen – The DEEPSPACE™ Design
              Theory takes advantage of the thickness of a transparent topsheet.
              Strategically layering ink on multiple levels from the top and the
              bottom imbues graphics with a sense of life through depth.
            </div>
            <Row>
              <Col className="" span={4}>
                {quantity === 0 ? (
                  <button className="product-add-button">Add</button>
                ) : (
                  addtoCart
                )}
              </Col>
              <Col className="product-gutter-right" span={4}>
                <Button
                  className="product-edit-button"
                  style={{ height: "40px" }}
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

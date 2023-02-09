import React, { useState, useEffect } from "react";
import { Button, Row, Col, Select } from "antd";
import ProductCard from "../../common/productCard";

import { showProductApi } from "../../api/productApi";

import "./index.css";

const Products = ({
  handleShowCreate = (isShow: boolean) => {},
  handleShowDetail = (isShow: boolean) => {},
  getProductName = (pName: string) => {},
}) => {
  const sortOptions = [
    { value: "lastadded", label: "Last Added" },
    { value: "lowtohigh", label: "Price: low to high" },
    { value: "hightolow", label: "Price: high to low" },
  ];

  const [productsData, setProductData] = useState([]);

  useEffect(() => {
    async function showProducts() {
      try {
        const response = await showProductApi();
        const resJson = await response.json();
        setProductData(resJson);
      } catch (error) {
        throw new Error(`Get customer API error: ${JSON.stringify(error)}`);
      }
    }
    showProducts();
  }, []);

  const handleOnclickAdd = () => {
    handleShowCreate(true);
  };

  return (
    <>
      <Row>
        <Col span={12} className="products-title">
          Products
        </Col>
        <Col span={12} className="products-header">
          <Select
            className="products-header-select"
            defaultValue={sortOptions[1].value}
            options={sortOptions}
            size={"large"}
          ></Select>
          <Button className="products-header-button" onClick={handleOnclickAdd}>
            Add Product
          </Button>
        </Col>
      </Row>
      <div className="products-content">
        {productsData.map(({ imgSrc, productName, price, quantity }: any) => {
          return (
            <ProductCard
              setIsShowDetail={handleShowDetail}
              setProductName={getProductName}
              imgSrc={`https://${imgSrc}`}
              productName={productName}
              price={price}
              quantity={quantity}
            />
          );
        })}
      </div>
    </>
  );
};

export default Products;

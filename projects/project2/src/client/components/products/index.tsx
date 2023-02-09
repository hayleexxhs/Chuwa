import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Row, Col, Select } from "antd";
import ProductCard from "../../common/productCard";
import { RootState } from "../../store";

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

  const products = useSelector((state: RootState) => state.products);

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
        {products.map(({ id, imgSrc, name, price, quantity }: any) => {
          return (
            <ProductCard
              id={id}
              setIsShowDetail={handleShowDetail}
              setProductName={getProductName}
              imgSrc={`https://${imgSrc}`}
              productName={name}
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

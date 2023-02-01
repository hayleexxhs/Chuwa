import React, { useState } from "react";
import { Button, Row, Col, Form, Input, Alert, Select } from "antd";
import ProductCard from "../../common/productCard";

import "./index.css";

const Products = () => {
  const sortOptions = [
    { value: "lastadded", label: "Last Added" },
    { value: "lowtohigh", label: "Price: low to high" },
    { value: "hightolow", label: "Price: high to low" },
  ];

  //mock product data
  const productsData = [
    {
      imgSrc:
        "https://images.evo.com/imgp/700/220021/912632/capita-paradise-snowboard-women-s-2023-.jpg",
      productName: "CAPiTA Paradise Snowboard",
      price: 449.95,
      quantity: 2,
    },
    {
      imgSrc:
        "https://images.evo.com/imgp/700/220021/912632/capita-paradise-snowboard-women-s-2023-.jpg",
      productName: "CAPiTA Paradise Snowboard",
      price: 449.95,
      quantity: 2,
    },
    {
      imgSrc:
        "https://images.evo.com/imgp/700/220021/912632/capita-paradise-snowboard-women-s-2023-.jpg",
      productName: "CAPiTA Paradise Snowboard",
      price: 449.95,
      quantity: 2,
    },
    {
      imgSrc:
        "https://images.evo.com/imgp/700/220021/912632/capita-paradise-snowboard-women-s-2023-.jpg",
      productName: "CAPiTA Paradise Snowboard",
      price: 449.95,
      quantity: 2,
    },
    {
      imgSrc:
        "https://images.evo.com/imgp/700/220021/912632/capita-paradise-snowboard-women-s-2023-.jpg",
      productName: "CAPiTA Paradise Snowboard",
      price: 449.95,
      quantity: 2,
    },
  ];

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
          ></Select>
          <Button className="products-header-button">Add Product</Button>
        </Col>
      </Row>
      <div className="products-content">
        {/* <ProductCard
          imgSrc="https://images.evo.com/imgp/700/220021/912632/capita-paradise-snowboard-women-s-2023-.jpg"
          productName="CAPiTA Paradise Snowboard"
          price={449.95}
          quantity={2}
        ></ProductCard> */}
        <ProductCard
          imgSrc="https://images.evo.com/imgp/700/220021/912632/capita-paradise-snowboard-women-s-2023-.jpg"
          productName="CAPiTA Paradise Snowboard"
          price={449.95}
          quantity={2}
        ></ProductCard>
        {productsData.map(({ imgSrc, productName, price, quantity }) => {
          return (
            <ProductCard
              imgSrc={imgSrc}
              productName={productName}
              price={price}
              quantity={quantity}
            ></ProductCard>
          );
        })}
      </div>
    </>
  );
};

export default Products;

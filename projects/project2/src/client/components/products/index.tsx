import React, { useState } from "react";
import { Button, Row, Col, Select } from "antd";
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

  const showProducts = (array: any, subGroupLength: number) => {
    const productArray1 = [];
    let index = 0;

    while (index < array.length) {
      productArray1.push(
        array
          .map(({ imgSrc, productName, price, quantity }: any) => {
            return (
              <Col flex={1} style={{ margin: "9px" }}>
                <ProductCard
                  imgSrc={imgSrc}
                  productName={productName}
                  price={price}
                  quantity={quantity}
                />
              </Col>
            );
          })
          .slice(index, (index += subGroupLength))
      );
    }

    return productArray1.map((ele) => {
      return <Row style={{ margin: "9px" }}>{ele}</Row>;
    });
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
          ></Select>
          <Button className="products-header-button">Add Product</Button>
        </Col>
      </Row>
      <div className="products-content">{showProducts(productsData, 5)}</div>
    </>
  );
};

export default Products;

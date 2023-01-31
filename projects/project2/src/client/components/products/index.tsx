import React, { useState } from "react";
import { Button, Row, Col, Form, Input, Alert, Select } from "antd";

import "./index.css";

const Products = () => {
  const sortOptions = [
    { value: "lastadded", label: "Last Added" },
    { value: "lowtohigh", label: "Price: low to high" },
    { value: "hightolow", label: "Price: high to low" },
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
      <div className="products-content"></div>
    </>
  );
};

export default Products;

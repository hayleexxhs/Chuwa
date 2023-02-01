import React, { useState } from "react";
import { Button, Row, Col, Form, Input, Alert } from "antd";

import "./index.css";

const CreateProduct = () => {
  return (
    <>
      <div>Create Product</div>
      <div>
        <Form layout="vertical">
          <Form.Item name="productname" label="Product Name">
            <Input />
          </Form.Item>
          <Form.Item name="productdescription" label="Product Description">
            <Input />
          </Form.Item>
          <Form.Item name="productcategory" label="Category">
            <Input />
          </Form.Item>
          <Form.Item name="productprice" label="Price">
            <Input />
          </Form.Item>
          <Form.Item name="productinstock" label="In Stock Quantity">
            <Input />
          </Form.Item>
          <Form.Item name="productimg" label="Add Image Link">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Add Product</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateProduct;

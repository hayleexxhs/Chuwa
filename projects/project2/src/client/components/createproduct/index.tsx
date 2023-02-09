import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Row, Col, Form, Input, Select, Image } from "antd";
import { PictureFilled } from "@ant-design/icons";
import { addProduct, editProduct } from "../../actions";
import { addProductApi, editProductApi } from "../../api/productApi";

import "./index.css";

interface Iprops {
  title: string;
  pName?: string;
  pDiscription?: string;
  pPrice?: string;
  pQuantity?: string;
  imglink?: string;
  setIsShowCreate: (isShow: boolean) => void;
}

const CreateProduct = (props: Iprops) => {
  const {
    title,
    pName,
    pDiscription,
    pPrice,
    pQuantity,
    imglink,
    setIsShowCreate = () => {},
  } = props;

  const dispatch = useDispatch();

  let imgSrcImput = "";

  const [productName, setProductName] = useState(String);
  const [productdescription, setProductDescription] = useState(String);
  const [productCategory, setProductCategory] = useState(String);
  const [price, setPrice] = useState(String);
  const [quantity, setQuantity] = useState(String);
  const [imgSrc, setImgSrc] = useState(String);

  if (pName) setProductName(pName);
  if (pDiscription) setProductDescription(pDiscription);
  if (pPrice) setPrice(pPrice);
  if (pQuantity) setQuantity(pQuantity);
  if (imglink) setImgSrc(imglink);

  const categoryOptions = [
    { value: "snowboards", label: "Snowboards" },
    { value: "boots", label: "Boots" },
    { value: "bindings", label: "Bindings" },
  ];

  const imgPlaceholder = (
    <div className="img-placeholder-div">
      <PictureFilled style={{ fontSize: "40px", color: "#E5E5E5" }} />
      <div className="img-placeholder-text">Image preview!</div>
    </div>
  );

  const handleOnClickUpload = () => {
    setImgSrc(imgSrcImput);
  };

  const handleAddProduct = () => {
    addProduct(dispatch)({
      name: productName,
      description: productdescription,
      category: productCategory,
      price: price,
      quantityInStock: quantity,
      imgSrc: imgSrc,
    });
    setIsShowCreate(false);
    // const response = await addProductApi({
    //   name: productName,
    //   description: productdescription,
    //   category: productCategory,
    //   price: price,
    //   quantityInStock: quantity,
    //   imgSrc: imgSrc,
    // });
    // const resJson = await response.json();
    // if (resJson.status !== "200") {
    //   // setErrorMessage(resJson.message);
    //   // setErrorVisible(true);
    //   throw new Error(
    //     `Signup API response status error: ${JSON.stringify(resJson.message)}`
    //   );
    // } else {
    //   console.log("Add Product Succeed");
    //   setIsShowCreate(false);
    // }
  };

  const handleEditProduct = () => {};

  return (
    <>
      <div className="div1">
        <div className="products-title">{title}</div>
        <div className="products-create-content">
          <Form layout="vertical">
            <Form.Item name="productname" label="Product Name">
              <Input
                size="large"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="productdescription" label="Product Description">
              <Input.TextArea
                rows={4}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </Form.Item>
            <Row>
              <Col flex={2} style={{ marginRight: "5px" }}>
                <Form.Item name="productcategory" label="Category">
                  <Select
                    size="large"
                    value={productCategory}
                    options={categoryOptions}
                    onChange={(e) => {
                      console.log(e);
                      setProductCategory(e);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col flex={1}>
                <Form.Item name="productprice" label="Price">
                  <Input
                    size="large"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col flex={1} style={{ marginRight: "5px" }}>
                <Form.Item name="productinstock" label="In Stock Quantity">
                  <Input
                    size="large"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col flex={6}>
                <Form.Item name="productimg" label="Add Image Link">
                  <Input
                    onChange={(e) => (imgSrcImput = e.target.value)}
                    prefix={"http://"}
                    suffix={
                      <Button
                        style={{ backgroundColor: "#5048E5", color: "white" }}
                        onClick={handleOnClickUpload}
                      >
                        Upload
                      </Button>
                    }
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
            <div className="img-preview-div">
              {imgSrc === "" ? (
                imgPlaceholder
              ) : (
                <Image
                  width={190}
                  height={190}
                  src={`https://${imgSrc}`}
                  preview={false}
                />
              )}
            </div>
            <Form.Item style={{ textAlign: "left" }}>
              <Button
                htmlType="submit"
                className="submit-button"
                onClick={
                  title === "Create Product"
                    ? handleAddProduct
                    : handleEditProduct
                }
              >
                {title === "Create Product" ? "Add Product" : "Edit Product"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;

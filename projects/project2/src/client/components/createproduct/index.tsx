import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, Form, Input, Select, Image } from "antd";
import { PictureFilled, CloseOutlined } from "@ant-design/icons";
import { addProduct, editProduct } from "../../actions";
import { RootState } from "../../store";

import "./index.css";

interface Iprops {
  title: string;
  id?: string;
  setIsShowCreate: (isShow: boolean) => void;
  setIsShowEdit: (isShow: boolean) => void;
}

const CreateProduct = (props: Iprops) => {
  const {
    title,
    id,
    setIsShowCreate = () => {},
    setIsShowEdit = () => {},
  } = props;
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  const pd = products.filter((p) => p.id === id)[0];
  // if (pd) console.log(pd);

  const [productName, setProductName] = useState(pd ? pd.name : String);
  const [productdescription, setProductDescription] = useState(
    pd ? pd.description : String
  );
  const [productCategory, setProductCategory] = useState(
    pd ? pd.category : String
  );
  const [price, setPrice] = useState(pd ? pd.price : String);
  const [quantity, setQuantity] = useState(pd ? pd.quantityInStock : String);
  const [imgSrc, setImgSrc] = useState(pd ? pd.imgSrc : String);

  let imgSrcImput = "";

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
  };

  const handleEditProduct = () => {
    editProduct(dispatch)({
      id: id,
      name: productName,
      description: productdescription,
      category: productCategory,
      price: price,
      quantityInStock: quantity,
      imgSrc: imgSrc,
    });
    setIsShowEdit(false);
  };

  return (
    <>
      <div className="div1">
        <div className="products-title">{title}</div>
        <div className="products-create-content">
          <a
            onClick={() => {
              title === "Create Product"
                ? setIsShowCreate(false)
                : setIsShowEdit(false);
            }}
          >
            <CloseOutlined />
          </a>
          <Form
            layout="vertical"
            initialValues={
              pd
                ? {
                    productname: pd.name,
                    productdescription: pd.description,
                    productcategory: pd.category,
                    productprice: pd.price,
                    productinstock: pd.quantityInStock,
                    productimg: pd.imgSrc,
                  }
                : {}
            }
          >
            <Form.Item name="productname" label="Product Name">
              <Input
                size="large"
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

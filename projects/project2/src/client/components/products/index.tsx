import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Select } from "antd";
import ProductCard from "../../common/productCard";
import { initProduct } from "../../actions";

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

  // const [productsData, setProductData] = useState([]);
  const products = useSelector((state: any) => state.products);

  // useEffect(() => {
  //   async function showProducts() {
  //     try {
  //       const response = await showProductApi();
  //       const resJson = await response.json();
  //       setProductData(resJson);
  //     } catch (error) {
  //       throw new Error(`Get customer API error: ${JSON.stringify(error)}`);
  //     }
  //   }
  //   showProducts();
  // }, []);

  // const showProducts = (array: any, subGroupLength: number) => {
  //   const productArray1 = [];
  //   let index = 0;

  //   while (index < array.length) {
  //     productArray1.push(
  //       array
  //         .map(({ imgSrc, productName, price, quantity }: any) => {
  //           return (
  //             <Col style={{ margin: "9px", width: "240px", height: "300px" }}>
  //               <ProductCard
  //                 setIsShowDetail={handleShowDetail}
  //                 setProductName={getProductName}
  //                 imgSrc={`https://${imgSrc}`}
  //                 productName={productName}
  //                 price={price}
  //                 quantity={quantity}
  //               />
  //             </Col>
  //           );
  //         })
  //         .slice(index, (index += subGroupLength))
  //     );
  //   }

  //   return productArray1.map((ele) => {
  //     return <Row style={{ margin: "9px" }}>{ele}</Row>;
  //   });
  // };

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
        <ul>
          {products.map(({ imgSrc, productName, price, quantity }: any) => {
            return (
              <li style={{ margin: "9px", width: "240px", height: "300px" }}>
                <ProductCard
                  setIsShowDetail={handleShowDetail}
                  setProductName={getProductName}
                  imgSrc={`https://${imgSrc}`}
                  productName={productName}
                  price={price}
                  quantity={quantity}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Products;

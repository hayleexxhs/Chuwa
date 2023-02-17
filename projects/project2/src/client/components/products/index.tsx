import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Row, Col, Select, List } from "antd";
import ProductCard from "../../common/productCard";
import { RootState } from "../../store";

import "./index.css";

const Products = ({
  handleShowCreate = (isShow: boolean) => {},
  handleShowEdit = (isShow: boolean) => {},
  handleShowDetail = (isShow: boolean) => {},
  getDetailId = (id: string) => {},
}) => {
  const sortOptions = [
    { value: "lastadded", label: "Last Added" },
    { value: "lowtohigh", label: "Price: low to high" },
    { value: "hightolow", label: "Price: high to low" },
  ];

  const products = useSelector((state: RootState) => state.products);
  const user = useSelector((state: RootState) => state.user);

  const [isSetData, setIsSetData] = useState(false);
  const [data, setData] = useState(
    products.map(({ id, price }) => ({ id: id, price: price }))
  );

  const initdata = products
    .map(({ id, price }) => ({ id: id, price: price }))
    .sort((a, b) => a.price - b.price);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handleOnclickAdd = () => {
    handleShowCreate(true);
  };

  const handleSortOrderChange = (value: string) => {
    if (!isSetData) setIsSetData(true);
    if (value === "lastadded") {
      setData(products.map(({ id, price }) => ({ id: id, price: price })));
    } else if (value === "lowtohigh") {
      setData(
        products
          .map(({ id, price }) => ({ id: id, price: price }))
          .sort((a, b) => a.price - b.price)
      );
    } else {
      setData(
        products
          .map(({ id, price }) => ({ id: id, price: price }))
          .sort((a, b) => b.price - a.price)
      );
    }
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
            onChange={handleSortOrderChange}
          ></Select>
          <Button
            className="products-header-button"
            onClick={handleOnclickAdd}
            style={
              user.userType === "admin"
                ? { display: "visible" }
                : { display: "none" }
            }
          >
            Add Product
          </Button>
        </Col>
      </Row>
      <div className="products-content">
        <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5,
          }}
          dataSource={isSetData ? data : initdata}
          pagination={{
            // onChange: (page) => {
            //   console.log(page);
            // },
            pageSize: 10,
          }}
          renderItem={(item) => (
            <List.Item>
              <ProductCard
                id={item.id}
                setIsShowEdit={handleShowEdit}
                setIsShowDetail={handleShowDetail}
                setDetailId={getDetailId}
              />
            </List.Item>
          )}
        ></List>
      </div>
    </>
  );
};

export default Products;

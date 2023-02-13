import { useSelector } from "react-redux";
import { Button, Row, Col, Select } from "antd";
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
        {products.map(({ id, imgSrc, name, price, quantity }: any) => {
          return (
            <ProductCard
              id={id}
              setIsShowEdit={handleShowEdit}
              setIsShowDetail={handleShowDetail}
              setDetailId={getDetailId}
              // imgSrc={`https://${imgSrc}`}
              // productName={name}
              // price={Number(price)}
              // quantity={Number(quantity)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Products;

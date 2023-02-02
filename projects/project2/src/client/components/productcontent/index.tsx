import { useState } from "react";
import "./index.css";

import Products from "../products";
import CreateProduct from "../createproduct";
import ProductDetail from "../productdetail";

const ProductContent = () => {
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [productName, setProductName] = useState(String);

  return (
    <>
      {isShowCreate || isShowEdit ? (
        <CreateProduct
          title={isShowCreate ? "Create Product" : "Edit Product"}
          setIsShowCreate={setIsShowCreate}
        />
      ) : isShowDetail ? (
        <ProductDetail pName={productName} />
      ) : (
        <Products
          handleShowCreate={setIsShowCreate}
          handleShowDetail={setIsShowDetail}
          getProductName={setProductName}
        />
      )}
    </>
  );
};

export default ProductContent;

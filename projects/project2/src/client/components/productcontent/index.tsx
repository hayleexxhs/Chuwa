import { useState } from "react";
import "./index.css";

import Products from "../products";
import CreateProduct from "../createproduct";
import ProductDetail from "../productdetail";

const ProductContent = () => {
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [productId, setProductId] = useState(String);

  return (
    <>
      {isShowCreate || isShowEdit ? (
        <CreateProduct
          title={isShowCreate ? "Create Product" : "Edit Product"}
          setIsShowCreate={setIsShowCreate}
        />
      ) : isShowDetail ? (
        <ProductDetail id={productId} />
      ) : (
        <Products
          handleShowCreate={setIsShowCreate}
          handleShowDetail={setIsShowDetail}
          getDetailId={setProductId}
        />
      )}
    </>
  );
};

export default ProductContent;

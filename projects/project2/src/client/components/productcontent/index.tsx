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
      <div className="product-content">
        {isShowCreate || isShowEdit ? (
          <CreateProduct
            title={isShowCreate ? "Create Product" : "Edit Product"}
            id={isShowEdit ? productId : undefined}
            setIsShowCreate={setIsShowCreate}
            setIsShowEdit={setIsShowEdit}
          />
        ) : isShowDetail ? (
          <ProductDetail
            id={productId}
            handleShowDetail={setIsShowDetail}
            handleShowEdit={setIsShowEdit}
          />
        ) : (
          <Products
            handleShowCreate={setIsShowCreate}
            handleShowEdit={setIsShowEdit}
            handleShowDetail={setIsShowDetail}
            getDetailId={setProductId}
          />
        )}
      </div>
    </>
  );
};

export default ProductContent;

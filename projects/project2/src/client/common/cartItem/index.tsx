import { useSelector } from "react-redux";
import { Button, Row, Col, Image, Input, List, Drawer } from "antd";
import { RootState } from "../../store";

interface IProps {
  id: string;
}

const CartItem = ({ id }: IProps) => {
  const products = useSelector((state: RootState) => state.products);
  const pd = products.filter((p) => p.id === id)[0];

  return (
    <Row>
      <Col span={8}>
        <Image
          width={120}
          height={120}
          src={`https://${pd.imgSrc}`}
          preview={false}
        ></Image>
      </Col>
      <Col span={16}>
        <Row>
          <Col>{pd.name}</Col>
          <Col>{`$${pd.price}`}</Col>
        </Row>
        <Row>
          <Col>
            <Button></Button>
          </Col>
          <Col>
            <a>Remove</a>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CartItem;

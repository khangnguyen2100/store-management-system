import { Col, Row } from 'antd';

import { productsFake } from 'src/mocks/products';
import useCart from 'src/hooks/useCart';

import CartContainer from './CartContainer';
import ProductsContainer from './ProductsContainer';

type Props = {
  label: string;
};
const SaleTabItem = (props: Props) => {
  const {
    handleAddToCart,
    cartList,
    handleDecrementProduct,
    handleIncrementProduct,
    totalItems,
    totalPrice,
  } = useCart([]);
  return (
    <div className='flex h-full bg-gray-200 p-2'>
      <Row className='!mx-0 w-full mdd:flex-col-reverse' gutter={[8, 8]}>
        <Col sm={24} md={13} className='!pl-0'>
          <CartContainer
            data={cartList}
            onDecrement={handleDecrementProduct}
            onIncrement={handleIncrementProduct}
            totalItems={totalItems}
            totalPrice={totalPrice}
          />
        </Col>
        <Col sm={24} md={11} className='!pr-0'>
          <ProductsContainer
            data={productsFake}
            onAddToCart={handleAddToCart}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SaleTabItem;

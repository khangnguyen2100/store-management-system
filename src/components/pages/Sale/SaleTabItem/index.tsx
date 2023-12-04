import { Col, Modal, Row } from 'antd';
import { useState } from 'react';

import useCart from 'src/hooks/useCart';
import { CartStatus } from 'src/constants/types/cart';

import CartContainer from './CartContainer';
import ProductsContainer from './ProductsContainer';
import PaymentStepModal from './PaymentStepModal';

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
    setCartList,
    totalPrice,
    handleDelete,
    noteValue,
    setNoteValue,
    discountPrice,
    setDiscountPrice,
  } = useCart([]);
  const [cartStatus, setCartStatus] = useState<CartStatus>('pending');
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  const handleOpenPaymentModal = () => {
    setOpenPaymentModal(true);
  };
  return (
    <div className='flex h-full bg-gray-200 p-2'>
      <Row className='!mx-0 w-full mdd:flex-col-reverse' gutter={[8, 8]}>
        <Col sm={24} md={12} className='!pl-0'>
          <CartContainer
            data={cartList}
            onDecrement={handleDecrementProduct}
            onIncrement={handleIncrementProduct}
            totalItems={totalItems}
            totalPrice={totalPrice}
            onDelete={handleDelete}
            noteValue={noteValue}
            setNoteValue={setNoteValue}
          />
        </Col>
        <Col sm={24} md={12} className='!pr-0'>
          <ProductsContainer
            onPayment={handleOpenPaymentModal}
            onAddToCart={handleAddToCart}
            cartList={cartList}
          />
        </Col>
      </Row>
      <Modal
        open={openPaymentModal}
        onCancel={() => setOpenPaymentModal(false)}
        title='Thanh toán'
        footer={null}
        width={700}
      >
        <PaymentStepModal
          cartList={cartList}
          setCartList={setCartList}
          status={cartStatus}
          totalItems={totalItems}
          onClose={() => setOpenPaymentModal(false)}
          totalPrice={totalPrice}
          setStatus={setCartStatus}
          noteValue={noteValue}
          setNoteValue={setNoteValue}
          discountPrice={discountPrice}
          setDiscountPrice={setDiscountPrice}
        />
      </Modal>
    </div>
  );
};

export default SaleTabItem;

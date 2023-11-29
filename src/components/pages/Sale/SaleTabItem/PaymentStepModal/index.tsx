import { Button, message, Steps, theme } from 'antd';
import React, { useEffect, useState } from 'react';

import billApi from 'src/api/billApi';
import { CartStatus, CartType } from 'src/constants/types/cart';

import CartInfo from './CartInfo';
import PaymentMethod from './PaymentMethod/PaymentMethod';
type Props = {
  cartList: CartType[];
  setCartList: (cartList: CartType[]) => void;
  status: CartStatus;
  onClose: () => void;
  setStatus: (status: CartStatus) => void;
  totalItems: number;
  totalPrice: number;
  noteValue: string;
  setNoteValue: (value: string) => void;
  discountPrice: number;
  setDiscountPrice: (value: number) => void;
};

const transformStatusToCurrentNum = (status: CartStatus) => {
  switch (status) {
    case 'pending':
      return 0;
    case 'confirmCart':
      return 1;
    case 'confirmInfo':
      return 2;
    case 'payment':
      return 3;
    case 'success':
      return 4;
    case 'cancel':
      return 5;
    default:
      return 0;
  }
};
const PaymentStepModal = (props: Props) => {
  const {
    cartList,
    status,
    setStatus,
    totalItems,
    totalPrice,
    onClose,
    setCartList,
    noteValue,
    setNoteValue,
    discountPrice,
    setDiscountPrice,
  } = props;
  const { token } = theme.useToken();
  const statusList: string[] = [
    'pending',
    'confirmCart',
    'confirmInfo',
    'payment',
    'success',
    'cancel',
  ];

  const steps = [
    {
      title: 'Thông tin đơn hàng',
      content: (
        <CartInfo
          cartList={cartList}
          totalItems={totalItems}
          totalPrice={totalPrice}
          noteValue={noteValue}
          setNoteValue={setNoteValue}
        />
      ),
    },
    {
      title: 'Thanh toán',
      content: (
        <PaymentMethod
          totalPrice={totalPrice}
          setDiscountPrice={setDiscountPrice}
        />
      ),
    },
  ];
  const [current, setCurrent] = useState(transformStatusToCurrentNum(status));

  const next = () => {
    setCurrent(current + 1);
    setStatus(statusList[current + 1] as CartStatus);
  };
  const prev = () => {
    setCurrent(current - 1);
    setStatus(statusList[current - 1] as CartStatus);
  };
  const handleStepChange = (current: number) => {
    setCurrent(current);
    setStatus(statusList[current] as CartStatus);
  };
  const handleSubmitCard = async () => {
    try {
      const transformData = {
        Sp: cartList.map(item => ({
          idSp: item.id,
          soLuong: item.quantity,
          tong: Number(item.giaBan) * Number(item.quantity),
        })),
        tongTien: totalPrice,
        idCh: 4,
        tongGiamGia: discountPrice,
        ghiChu: noteValue,
      };
      const res = await billApi.createBill(transformData);
      console.log('res:', res);
      if (res.status === 201) {
        message.success(res.data.message || 'Đặt hàng thành công');
        onClose();
        setCartList([]);
        setStatus('success');
      } else {
        message.error('Đặt hàng thất bại');
      }
    } catch (error) {
      console.log('error:', error);
    }
  };

  const items = steps.map(item => ({ key: item.title, title: item.title }));
  const contentStyle: React.CSSProperties = {
    color: '#333',
    backgroundColor: '#FBFBFB',
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    minHeight: '500px',
  };

  useEffect(() => {
    setCurrent(transformStatusToCurrentNum(status));
  }, [status]);

  return (
    <>
      <Steps
        current={current}
        status={
          status === 'payment'
            ? 'process'
            : status === 'success'
            ? 'finish'
            : status === 'cancel'
            ? 'error'
            : 'wait'
        }
        items={items}
        onChange={handleStepChange}
      />
      <div className='shadow-sm' style={contentStyle}>
        {steps[current].content}
      </div>
      <div className='mt-6 flex justify-end'>
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Quay lại
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type='primary' onClick={() => next()}>
            Bước tiếp theo
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type='primary' onClick={handleSubmitCard}>
            Hoàn thành
          </Button>
        )}
      </div>
    </>
  );
};

export default PaymentStepModal;

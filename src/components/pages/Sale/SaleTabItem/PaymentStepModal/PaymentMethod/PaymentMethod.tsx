import { Radio, Row, Space } from 'antd';
import { useState } from 'react';

import CardMethod from './CardMethod';
import CashMethod from './CashMethod';

type Props = {
  totalPrice: number;
  setDiscountPrice: (value: number) => void;
};

const PaymentMethod = (props: Props) => {
  const { totalPrice, setDiscountPrice } = props;
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  return (
    <Space direction='vertical' className='w-full p-2'>
      <Radio.Group
        value={paymentMethod}
        buttonStyle='solid'
        onChange={e => setPaymentMethod(e.target.value)}
        className='w-full'
        size='large'
      >
        <Radio.Button
          className='w-1/2 text-center text-base font-medium'
          value='cash'
        >
          Trả tiền mặt
        </Radio.Button>
        <Radio.Button
          className='w-1/2 text-center text-base font-medium'
          value='card'
          disabled
        >
          Thanh toán online
        </Radio.Button>
      </Radio.Group>
      <Row className='mt-2'>
        {paymentMethod === 'card' ? (
          <CardMethod totalPrice={totalPrice} />
        ) : (
          <CashMethod
            totalPrice={totalPrice}
            setDiscountPrice={setDiscountPrice}
          />
        )}
      </Row>
    </Space>
  );
};

export default PaymentMethod;

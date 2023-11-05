import { Col, Form, InputNumber, Space } from 'antd';
import { useEffect } from 'react';

import { formatPriceInput } from 'src/utils/format';
import './style.scss';

type Props = {
  totalPrice: number;
  setDiscountPrice: (value: number) => void;
};
const CashMethod = (props: Props) => {
  const { totalPrice, setDiscountPrice } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('totalPrice:', totalPrice);
    if (!totalPrice) return;
    const newTotalPrice =
      totalPrice % 1000 >= 500
        ? Math.ceil(totalPrice / 1000) * 1000
        : Math.floor(totalPrice / 1000) * 1000;
    const newPay =
      newTotalPrice % 1000 >= 500
        ? Math.ceil(newTotalPrice / 1000) * 1000
        : Math.floor(newTotalPrice / 1000) * 1000;

    form.setFieldsValue({
      discount: 0,
      customerChange: 0,
      totalPrice: totalPrice,
      priceAfterDiscount: newTotalPrice.toFixed(4),
      customerPay: newPay.toFixed(4),
    });
  }, []);
  return (
    <Space direction='vertical' className='w-full'>
      <Form
        className='w-full p-2'
        layout='horizontal'
        labelAlign='left'
        labelWrap={true}
        form={form}
      >
        <Col xs={24} className='w-full'>
          <Form.Item
            name='totalPrice'
            label={<h3>Giá trị đơn hàng</h3>}
            className='flex w-full justify-between'
            labelCol={{ xs: 24, sm: 8 }}
            wrapperCol={{ xs: 24, sm: 16 }}
          >
            <InputNumber
              width={'100%'}
              size='large'
              step={1000}
              formatter={value => formatPriceInput(value)}
              className='w-full'
              addonAfter='VNĐ'
              disabled
            />
          </Form.Item>
        </Col>
        <Col xs={24} className='w-full'>
          <Form.Item
            name='discount'
            label={<h3>Giảm giá</h3>}
            className='flex w-full justify-between'
            labelCol={{ xs: 24, sm: 8 }}
            wrapperCol={{ xs: 24, sm: 16 }}
          >
            <InputNumber
              width={'100%'}
              size='large'
              min={0}
              placeholder='Giảm giá'
              max={100}
              formatter={value => formatPriceInput(value)}
              className='w-full'
              addonAfter='%'
              onChange={(value: number | null) => {
                if (!value) return;
                let newTotalPrice = totalPrice - totalPrice * (value / 100);
                newTotalPrice =
                  newTotalPrice % 1000 >= 500
                    ? Math.ceil(newTotalPrice / 1000) * 1000
                    : Math.floor(newTotalPrice / 1000) * 1000;
                form.setFieldsValue({
                  priceAfterDiscount: newTotalPrice.toFixed(4),
                });

                const discountPrice =
                  totalPrice - Number(newTotalPrice.toFixed(4));
                console.log('discountPrice:', discountPrice);
                setDiscountPrice(discountPrice);
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} className='w-full'>
          <Form.Item
            name='priceAfterDiscount'
            label={<h3>Số tiền phải trả</h3>}
            className='flex w-full justify-between'
            labelCol={{ xs: 24, sm: 8 }}
            wrapperCol={{ xs: 24, sm: 16 }}
          >
            <InputNumber
              width={'100%'}
              size='large'
              step={1000}
              formatter={value => formatPriceInput(value)}
              className='w-full'
              addonAfter='VNĐ'
              disabled
            />
          </Form.Item>
        </Col>
        <Col xs={24} className='w-full'>
          <Form.Item
            className='flex w-full justify-between'
            labelCol={{ xs: 24, sm: 8 }}
            wrapperCol={{ xs: 24, sm: 16 }}
            rules={[{ required: true, message: 'Vui lòng nhập số tiền' }]}
            name='customerPay'
            label={<h3>Khách đưa</h3>}
          >
            <InputNumber
              placeholder='Số tiền khách đưa'
              formatter={value => formatPriceInput(value)}
              className='w-full'
              size='large'
              step={1000}
              width={'100%'}
              addonAfter='VNĐ'
              min={totalPrice}
              onChange={(value: number | null) => {
                if (!value) return;
                let newCustomerChange = value - totalPrice;
                newCustomerChange =
                  newCustomerChange % 1000 >= 500
                    ? Math.ceil(newCustomerChange / 1000) * 1000
                    : Math.floor(newCustomerChange / 1000) * 1000;
                form.setFieldsValue({
                  customerChange: newCustomerChange.toFixed(4),
                  customerPay: value,
                });
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} className='w-full'>
          <Form.Item
            name='customerChange'
            label={<h3>Tiền thừa</h3>}
            className='flex w-full justify-between'
            labelCol={{ xs: 24, sm: 8 }}
            wrapperCol={{ xs: 24, sm: 16 }}
          >
            <InputNumber
              placeholder='Giá bán'
              width={'100%'}
              size='large'
              step={1000}
              formatter={value => formatPriceInput(value)}
              className='w-full'
              addonAfter='VNĐ'
              disabled
            />
          </Form.Item>
        </Col>
      </Form>
    </Space>
  );
};

export default CashMethod;

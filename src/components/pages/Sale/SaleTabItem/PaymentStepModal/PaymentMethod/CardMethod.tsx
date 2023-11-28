import { Button, Form, Input, Space } from 'antd';

import { randomString } from 'src/utils/randomString';

type Props = {
  totalPrice: number;
};

const CardMethod = (props: Props) => {
  const { totalPrice } = props;
  const [form] = Form.useForm();
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : null;
  const handleSubmitForm = async () => {
    const values = await form.getFieldsValue();
    console.log('values:', values);
  };

  return (
    <Space direction='vertical' className='w-full'>
      <h3 className='mt-4 w-full text-center text-xl font-semibold'>
        Thanh toán VNPay
      </h3>
      <Form form={form} className='w-full' onFinish={handleSubmitForm}>
        <Input type='hidden' name='MaDH' value={randomString('HD')} />
        <Input
          type='hidden'
          name='order_desc'
          value={`${userInfo?.email || 'null'} nâng cấp ${
            userInfo?.loai || 'null'
          }`}
        />
        <Input type='hidden' name='order_type' value={'bill payment'} />
        <Input type='hidden' name='total' value={totalPrice} />
        <Input type='hidden' name='language' value={'vn'} />
        <Input type='hidden' name='bank_code' value={'NCB'} />
        <Button
          type='primary'
          htmlType='submit'
          size='large'
          className='flex-center mx-auto mt-6 w-1/2'
        >
          Thanh toán
        </Button>
      </Form>
    </Space>
  );
};

export default CardMethod;

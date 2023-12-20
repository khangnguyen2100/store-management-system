import { Card, Col, Input, Row, Form } from 'antd';
import { FormInstance } from 'antd/lib';
import { useEffect } from 'react';

type Props = {
  form: FormInstance;
  type:string;
};
function BrandForm({ form }: Props) {
  return (
    <Form form={form} layout='vertical' className='flex flex-col gap-y-4'>
      <Card size='small' title='Thông tin chung'>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <Form.Item
              label='Tên thương hiệu'
              rules={[
                { required: true, message: 'Vui lòng nhập tên thương hiệu' },
              ]}
              name={'ten'}
            >
              <Input placeholder='Tên thương hiệu' tabIndex={1} />
            </Form.Item>
            <Form.Item name={'id'} hidden>
              <Input placeholder='id' tabIndex={1} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
}

export default BrandForm;

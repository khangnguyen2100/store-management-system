import { Card, Col, Input, Row, Form } from 'antd';
import { FormInstance } from 'antd/lib';

import { getIdCh } from 'src/utils/common';
type Props = {
  form: FormInstance;
};
function ProductTypeForm({ form }: Props) {
  return (
    <Form form={form} layout='vertical' className='flex flex-col gap-y-4'>
      <Card size='small' title='Thông tin chung'>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <Form.Item
              label='Tên loại sản phẩm'
              rules={[
                { required: true, message: 'Vui lòng nhập tên thương hiệu' },
              ]}
              name={'ten'}
            >
              <Input placeholder='Tên loại sản phẩm' tabIndex={1} />
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

export default ProductTypeForm;

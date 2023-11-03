import { Card, Col, Input, Row, Form } from 'antd';
import { FormInstance } from 'antd/lib';
type Props = {
  form: FormInstance;
};
function BrandForm({ form }: Props) {
  return (
    <Form form={form} layout='vertical' className='flex flex-col gap-y-4'>
      <Card size='small' title='Thông tin chung'>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <Form.Item label='Id thương hiệu' name={'id'}>
              <Input placeholder='Id thương hiệu' disabled={true} />
            </Form.Item>

            <Form.Item
              label='Tên thương hiệu'
              rules={[
                { required: true, message: 'Vui lòng nhập tên thương hiệu' },
              ]}
              name={'ten'}
            >
              <Input placeholder='Tên thương hiệu' tabIndex={1} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
}

export default BrandForm;

import { Card, Col, Input, Row, Form } from 'antd';
import { FormInstance } from 'antd/lib';
type Props = {
  form: FormInstance;
};
function SupplierForm({ form }: Props) {
  return (
    <Form form={form} layout='vertical' className='flex flex-col gap-y-4'>
      <Card size='small' title='Thông tin chung'>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item label='Id nhà cung cấp' name={'id'}>
              <Input placeholder='Id nhà cung cấp' disabled={true} />
            </Form.Item>

            <Form.Item
              label='Tên nhà cung cấp'
              rules={[
                { required: true, message: 'Vui lòng nhập tên nhà cung cấp' },
              ]}
              name={'ten'}
            >
              <Input placeholder='Tên nhà cung cấp' tabIndex={1} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label='Số điện thoại nhà cung cấp'
              name={'sdt'}
              rules={[
                { required: true, message: 'Vui lòng nhập tên nhà cung cấp' },
              ]}
            >
              <Input placeholder='Số điện thoại nhà cung cấp' tabIndex={2} />
            </Form.Item>

            <Form.Item
              label='Mã số thuế'
              rules={[{ required: true, message: 'Vui lòng nhập mã số thuế' }]}
              name={'MST'}
            >
              <Input placeholder='Mã số thuế' tabIndex={3} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label='Email nhà cung cấp' name={'email'}>
              <Input placeholder='Email nhà cung cấp' tabIndex={4} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label='Địa chỉ nhà cung cấp' name={'diaChi'}>
              <Input placeholder='Địa chỉ nhà cung cấp' tabIndex={5} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
}

export default SupplierForm;

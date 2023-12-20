import { Card, Col, Input, Row, Form } from 'antd';
import { FormInstance } from 'antd/lib';
import { useEffect } from 'react';

type Props = {
  form: FormInstance;
  type: string;
};
function CategoryForm({ form, type }: Props) {
  useEffect(() => {
    if (type === 'add') form.resetFields();
  }, []);
  return (
    <Form form={form} layout='vertical' className='flex flex-col gap-y-4'>
      <Card size='small' title='Thông tin chung'>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <Form.Item
              label='Tên danh mục sản phẩm'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên danh mục sản phẩm',
                },
              ]}
              name={'ten'}
            >
              <Input placeholder='Tên danh mục sản phẩm' tabIndex={1} />
            </Form.Item>
            <Form.Item label='id' hidden name={'id'}>
              <Input placeholder='Tên danh mục sản phẩm' tabIndex={1} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
}

export default CategoryForm;

import { Col, Form, Input, Modal, Row } from 'antd';

type Props = {
  isOpen: boolean;
  onSuccess: () => void;
  onCancel: () => void;
};

const AddModal = (props: Props) => {
  const { isOpen, onCancel, onSuccess } = props;
  const [addForm] = Form.useForm();

  return (
    <Modal
      title='Basic Modal'
      open={isOpen}
      onOk={onSuccess}
      onCancel={onCancel}
    >
      <Form form={addForm}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Input placeholder='Tên hàng' />
          </Col>
          <Col xs={24} md={12}>
            <Input placeholder='Mã hàng' />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Input placeholder='Giá bán' />
          </Col>
          <Col xs={24} md={12}>
            <Input placeholder='Giá vốn' />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Input placeholder='Tồn kho' />
          </Col>
          <Col xs={24} md={12}>
            <Input placeholder='Danh mục' />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddModal;

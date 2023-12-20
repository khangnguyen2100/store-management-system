import { Form, Input, Modal, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import { shopApi } from 'src/api/shopApi';
import { ShopProp } from 'src/constants/types/shop';
import { shopTypes } from 'src/mocks/shopType';

type Props = {
  type: 'add' | 'edit';
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  selectedShop?: ShopProp;
};

const ShopFormModal = (props: Props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const { visible, selectedShop, onCancel, onSuccess, type } = props;
  const handleOk = async () => {
    setLoading(true);
    if (type === 'add') {
      try {
        await form.validateFields();
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) return;
        const data = JSON.parse(userInfo);
        const values = await form.validateFields();
        const res = await shopApi.createShop({
          tenCh: values.tenCh,
          diaChi: values.diaChi,
          idLoaiCh: values.idLoaiCh,
          idUsers: data.id,
        });
        if (res.data.status) {
          message.success(res.data.message);
          onSuccess();
          form.resetFields();
        } else {
          message.error(res.data.message);
        }
        console.log('res:', res);
      } catch (error: any) {
        console.error('da co loi: ', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (type === 'edit' && selectedShop) {
      form.setFieldsValue({
        tenCh: selectedShop.tenCh,
        diaChi: selectedShop.diaChi,
        idLoaiCh: selectedShop.idLoaiCh,
      });
    }
  }, [type]);

  return (
    <Modal
      title={
        type === 'add' ? 'Thêm cửa hàng' : type === 'edit' ? 'Sửa cửa hàng' : ''
      }
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      width={350}
      okText='Xác nhận'
      cancelText='Huỷ'
      confirmLoading={loading}
    >
      <Form form={form} labelAlign='left' layout='vertical'>
        <Form.Item
          label='Tên cửa hàng'
          name='tenCh'
          rules={[{ required: true, message: 'Vui lòng nhập tên cửa hàng' }]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name='idLoaiCh'
          label='Loại cửa hàng'
          rules={[{ required: true, message: 'Vui lòng nhập loại cửa hàng' }]}
        >
          <Select options={shopTypes} placeholder='Chọn loại cửa hàng' />
        </Form.Item>
        <Form.Item
          label='Địa chỉ'
          name='diaChi'
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ShopFormModal;

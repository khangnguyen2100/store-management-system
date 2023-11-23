import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
  message,
} from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { BrandProps } from 'src/constants/types/brand';
import { CategoryProp } from 'src/constants/types/category';
import { ProductProps } from 'src/constants/types/product';
import { formatPrice, formatPriceInput } from 'src/utils/format';
import { randomString } from 'src/utils/randomString';
import { DeleteAPI } from 'src/api/config';

import BrandForm from '../Forms/BrandForm';
import SupplierForm from '../Forms/SupplierForm';
import CategoryForm from '../Forms/categoryForm';
import ProductTypeForm from '../Forms/productTypeForm';

type Props = {
  isOpen: boolean;
  onSuccess: (values: any) => void;
  onCancel: () => void;
  onDelete: (values: any) => void;
  editingItem: CategoryProp | BrandProps | null;
  modalType: string;
  modalFor?: string;
};

const ChangeModal = (props: Props) => {
  const {
    isOpen,
    onCancel,
    onSuccess,
    modalType,
    editingItem,
    modalFor,
    onDelete,
  } = props;
  const [form] = Form.useForm();
  const handleSubmitForm = async () => {
    try {
      const values = await form.validateFields();
      onSuccess({ ...values });
    } catch (error) {}
  };
  const handleDeleteForm = async () => {
    const values = await form.validateFields();
    onDelete(values);
  };
  useEffect(() => {
    form.resetFields();
    if (modalType === 'add') form.setFieldValue('code', randomString('SP'));
    if (modalType === 'edit' && editingItem) {
      form.setFieldsValue(editingItem);
    }
  }, [modalType, editingItem?.id]);
  return (
    <Modal
      title={`${modalType === 'edit' ? 'Sửa' : 'Thêm'} ${modalFor}`}
      okText={`${modalType === 'edit' ? 'Lưu' : 'Thêm mới'} ${modalFor}`}
      cancelText='Hủy'
      open={isOpen}
      onOk={handleSubmitForm}
      onCancel={onCancel}
      width={800}
      destroyOnClose
      className='add-product-modal'
      footer={() => {
        return (
          <div className='flex justify-end gap-x-3'>
            <Button
              icon={<i className='fa-regular fa-floppy-disk'></i>}
              size='large'
              className='bg-btn_bg_green text-white opacity-80 hover:!opacity-100'
              onClick={handleSubmitForm}
            >
              Lưu
            </Button>
            <Button
              icon={<i className='fa-regular fa-ban'></i>}
              size='large'
              className='bg-btn_bg_gray text-white opacity-80 hover:!opacity-100'
              onClick={onCancel}
            >
              Hủy
            </Button>
            <Button
              icon={<i className='fa-regular fa-trash'></i>}
              size='large'
              className='bg-danger text-white opacity-80 hover:!opacity-100'
              onClick={handleDeleteForm}
            >
              Xóa
            </Button>
          </div>
        );
      }}
    >
      {modalFor === 'Thương hiệu' && <BrandForm form={form}></BrandForm>}
      {modalFor === 'Nhà cung cấp' && <SupplierForm form={form}></SupplierForm>}
      {modalFor === 'Danh mục' && <CategoryForm form={form}></CategoryForm>}
      {modalFor === 'Loại sản phẩm' && (
        <ProductTypeForm form={form}></ProductTypeForm>
      )}
    </Modal>
  );
};

export default ChangeModal;

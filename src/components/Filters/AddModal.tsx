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

type Props = {
  isOpen: boolean;
  onSuccess: (values: any) => void;
  onCancel: () => void;
  modalFor?: string;
  apiUrl: string;
};

const AddModal = (props: Props) => {
  const { isOpen, onCancel, onSuccess, modalFor, apiUrl } = props;
  const [form] = Form.useForm();
  const handleSubmitForm = async () => {
    try {
      const values = await form.validateFields();
      onSuccess({ ...values, apiUrl: apiUrl, idCh: 4 });
    } catch (error) {}
  };
  return (
    <Modal
      title={`Thêm ${modalFor}`}
      okText={`Thêm mới ${modalFor}`}
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
              Thêm
            </Button>
            <Button
              icon={<i className='fa-regular fa-ban'></i>}
              size='large'
              className='bg-btn_bg_gray text-white opacity-80 hover:!opacity-100'
              onClick={onCancel}
            >
              Hủy
            </Button>
          </div>
        );
      }}
    >
      {modalFor === 'Thương Hiệu' && (
        <BrandForm form={form} type='add'></BrandForm>
      )}
      {modalFor === 'Nhà cung cấp' && (
        <SupplierForm form={form} type='add'></SupplierForm>
      )}
      {/* {modalFor === 'Thương Hiệu' && <BrandForm form={form}></BrandForm>} */}
    </Modal>
  );
};

export default AddModal;

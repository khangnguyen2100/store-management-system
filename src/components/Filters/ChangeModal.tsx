import { Button, Form, Modal } from 'antd';
import { useEffect } from 'react';

import { BrandProps } from 'src/constants/types/brand';
import { CategoryProp } from 'src/constants/types/category';
import { randomString } from 'src/utils/randomString';

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
  isLoading: boolean;
  isDeleting: boolean;
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
    isLoading,
    isDeleting,
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
      getContainer={false}
      footer={() => {
        return (
          <div className='flex justify-end gap-x-3'>
            <Button
              icon={<i className='fa-regular fa-floppy-disk'></i>}
              size='large'
              className='bg-btn_bg_green text-white opacity-80 hover:!opacity-100'
              onClick={handleSubmitForm}
              loading={isLoading}
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
            {modalType === 'edit' && (
              <Button
                icon={<i className='fa-regular fa-trash'></i>}
                size='large'
                className='bg-danger text-white opacity-80 hover:!opacity-100'
                onClick={handleDeleteForm}
                loading={isDeleting}
              >
                Xóa
              </Button>
            )}
          </div>
        );
      }}
    >
      {modalFor === 'Thương hiệu' && (
        <BrandForm form={form} type={modalType}></BrandForm>
      )}
      {modalFor === 'Nhà cung cấp' && (
        <SupplierForm form={form} type={modalType}></SupplierForm>
      )}
      {modalFor === 'Danh mục' && (
        <CategoryForm form={form} type={modalType}></CategoryForm>
      )}
      {modalFor === 'Loại sản phẩm' && (
        <ProductTypeForm form={form}></ProductTypeForm>
      )}
    </Modal>
  );
};

export default ChangeModal;

/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, Image, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import BasicTable from 'src/components/BasicTable/BasicTable';
import { formatPrice } from 'src/utils/format';
import { SupplierProps } from 'src/pages/Suppliers';

import TableAction from '../../GroupButton/TableAction';

// import AddModal from './AddModal';

type Props = {
  data: SupplierProps[];
}; 

const SupplierList = (props: Props) => {
  const [productsData, setProductsData] = useState<SupplierProps[]>(props.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null);
  const [editingProduct, setEditingProduct] = useState<SupplierProps | null>(
    null,
  );
  const columns: ColumnsType<SupplierProps> = [
    {
      key: 1,
      title: 'STT',
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      key: 2,
      title: 'ID',
      dataIndex: 'id',
      width: 50,
    },
    {
      key: 3,
      title: 'Tên nhà cung cấp',
      dataIndex: 'name',
      width: 100,
    },
    {
      key: 4,
      title: 'Địa chỉ',
      dataIndex: 'address',
      width: 100,
    },
    {
      key: 5,
      title: 'Email',
      dataIndex: 'email',
      width: 100,
    },
    {
      key: 6,
      title: 'Mã số thuế',
      dataIndex: 'TaxCode',
      width: 80,
    },
    {
      key: 7,
      title: 'Ảnh',
      dataIndex: 'thumbnail',
      width: 70,
      render: (thumbnail: string) => (
        <Image
          src={thumbnail}
          alt='product thumbnail'
          width={50}
          height={50}
          className='rounded-md'
        />
      ),
      align: 'center',
    },
    {
      key: 8,
      title: 'Số điện thoại',
      dataIndex: 'phonenumber',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      render: (record: SupplierProps) => {
        return (
          <TableAction
            onDelete={() => handleDeleteProduct(record.id)}
            onEdit={() => handleEditProduct(record)}
          />
        );
      },
      align: 'center',
    },
  ];

  const handleDeleteProduct = (id: string) => {
    const newProducts = productsData.filter(product => product.id !== id);
    setProductsData(newProducts);
  };
  const handleEditProduct = (record: SupplierProps) => {
    setModalType('edit');
    setEditingProduct(record);
    setIsModalOpen(true);
  };
  const handleAddProduct = () => {
    console.log('add product');
    setModalType('add');
    setIsModalOpen(true);
  };

  const handleModalOk = async (values: any) => {
    try {
      if (modalType === 'add') {
        console.log('newProduct', values);
        enqueueSnackbar('Thêm sản phẩm thành công', { variant: 'success' });
        return;
      }
      if (modalType === 'edit') {
        console.log('newProduct', values);
        enqueueSnackbar('Sửa sản phẩm thành công', { variant: 'success' });
        return;
      }
    } catch (error) {
      console.log('error:', error);
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
    }
    setIsModalOpen(false);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleTableChange = (pagination: any) => {
    console.log('product list call');
  };

  return (
    <Space className='w-full' direction='vertical'>
      <BasicTable
        columns={columns}
        data={productsData}
        extra={
          <>
            <Button type='default'>Export</Button>
            <Button>Import</Button>
            <Button type='primary' onClick={handleAddProduct}>
              Thêm hàng
            </Button>
          </>
        }
        onChange={handleTableChange}
        pagination={{
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '15', '20'],
          total: 48,
        }}
      />
      {/* <AddModal
        isOpen={isModalOpen}
        onSuccess={handleModalOk}
        onCancel={handleModalCancel}
        modalType={modalType}
        editingProduct={editingProduct}
      /> */}
    </Space>
  );
};

export default SupplierList;

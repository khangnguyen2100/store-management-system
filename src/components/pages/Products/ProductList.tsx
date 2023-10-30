/* eslint-disable @typescript-eslint/no-empty-function */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Image, Space, Upload, UploadProps, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import * as xlsx from 'xlsx';

import { postAPI } from 'src/api/config';
import BasicTable from 'src/components/BasicTable/BasicTable';
import { formatPrice } from 'src/utils/format';
import { ProductProps } from 'src/constants/types/product';

import TableAction from '../../GroupButton/TableAction';

import AddModal from './AddModal';

type Props = {
  productsFake: ProductProps[];
};

const ProductList = (props: Props) => {
  const [productsData, setProductsData] = useState<ProductProps[]>(
    props.productsFake,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductProps | null>(
    null,
  );
  const columns: ColumnsType<ProductProps> = [
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
      title: 'Danh mục',
      dataIndex: 'category',
      width: 100,
    },
    {
      key: 4,
      title: 'Thương hiệu',
      dataIndex: 'brand',
      width: 100,
    },
    {
      key: 5,
      title: 'Mã hàng',
      dataIndex: 'code',
      width: 80,
    },
    {
      key: 6,
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
      key: 7,
      title: 'Tên hàng',
      dataIndex: 'name',
      width: 150,
    },
    {
      key: 8,
      title: 'Giá bán',
      dataIndex: 'salePrice',
      width: 120,
      sorter: (a, b) => Number(a.sellPrice) - Number(b.sellPrice),
      render: (salePrice: string) => (
        <span className='text-red-500'>{formatPrice(salePrice)}</span>
      ),
    },
    {
      key: 9,
      title: 'Giá vốn',
      dataIndex: 'costPrice',
      width: 120,
      sorter: (a, b) => Number(a.costPrice) - Number(b.costPrice),
      render: (costPrice: string) => (
        <span className='text-blue-500'>{formatPrice(costPrice)}</span>
      ),
    },
    {
      key: 10,
      title: 'Tồn kho',
      dataIndex: 'availableItem',
      width: 80,
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      render: (record: ProductProps) => {
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

  const handleDeleteProduct = (id: number) => {
    const newProducts = productsData.filter(product => product.id !== id);
    setProductsData(newProducts);
  };
  const handleEditProduct = (record: ProductProps) => {
    setModalType('edit');
    setEditingProduct(record);
    setIsModalOpen(true);
  };
  const handleAddProduct = () => {
    console.log('add product');
    setModalType('add');
    setIsModalOpen(true);
  };
  const handleModalOk = async (values: ProductProps) => {
    try {
      if (modalType === 'add') {
        console.log('newProduct', values);
        await postAPI<ProductProps>('san-pham', values);
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

  const [uploading, setUploading] = useState(false);

  const handleUpload = (json: any) => {
    setUploading(true);
    fetch('https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188', {
      method: 'POST',
      body: JSON.stringify(json),
    })
      .then(res => res.json())
      .then(() => {
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const uploadProps: UploadProps = {
    name: 'excel-file',
    accept: '.xlsx, .xls',
    showUploadList: false,
    multiple: false,

    onChange(info) {
      if (info.file.status !== 'uploading') {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target?.result;
          const workbook = xlsx.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = xlsx.utils.sheet_to_json(worksheet);
          handleUpload(json);
        };
        reader.readAsArrayBuffer(info.fileList[0].originFileObj as Blob);
      }
    },
    beforeUpload(file: any) {
      console.log('file:', file);
      const isExcel =
        file.type === 'application/vnd.ms-excel' ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const isSize = file.size / 1024 / 1024 < 100;
      if (!isExcel) {
        message.error('Vui lòng chỉ nhập file Excel (định dạng XLS/XLSX)!');
        return false;
      }
      if (!isSize) {
        message.error('Nhập file dung lượng nhỏ hơn 100MB!');
        return false;
      }
      return false;
    },
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
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} loading={uploading}>
                Import
              </Button>
            </Upload>
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
      <AddModal
        isOpen={isModalOpen}
        onSuccess={handleModalOk}
        onCancel={handleModalCancel}
        modalType={modalType}
        editingProduct={editingProduct}
      />
    </Space>
  );
};

export default ProductList;

/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, Image, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import BasicTable from 'src/components/BasicTable/BasicTable';
import { ProductProps } from 'src/pages/Products';
import { formatPrice } from 'src/utils/format';

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
      sorter: (a, b) => Number(a.salePrice) - Number(b.salePrice),
      render: (salePrice: string) => (
        <span className='text-red-500'>{formatPrice(salePrice)}</span>
      ),
    },
    {
      key: 9,
      title: 'Giá vốn',
      dataIndex: 'costPrice',
      width: 120,
      sorter: (a, b) => Number(a.salePrice) - Number(b.salePrice),
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
        return <TableAction onDelete={() => handleDeleteProduct(record.id)} />;
      },
      align: 'center',
    },
  ];

  const handleDeleteProduct = (id: string) => {
    const newProducts = productsData.filter(product => product.id !== id);
    setProductsData(newProducts);
  };
  const handleAddProduct = () => {
    console.log('add product');
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
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
      <AddModal
        isOpen={isModalOpen}
        onSuccess={handleModalOk}
        onCancel={handleModalCancel}
      />
    </Space>
  );
};

export default ProductList;

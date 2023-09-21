/* eslint-disable @typescript-eslint/no-empty-function */
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Image } from 'antd';

import { ProductProps } from 'src/pages/Products';
import { formatPrice } from 'src/utils/format';

import TableAction from '../GroupButton/TableAction';
import ResizeTable from '../Resizable/ResizeTable';

type Props = {
  productsFake: ProductProps[];
};

const ProductList = (props: Props) => {
  const [productsData, setProductsData] = useState<ProductProps[]>(
    props.productsFake,
  );
  const columnsData: ColumnsType<ProductProps> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      width: 100,
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      width: 100,
    },
    {
      title: 'Mã hàng',
      dataIndex: 'code',
      width: 80,
    },
    {
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
      title: 'Tên hàng',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Giá bán',
      dataIndex: 'salePrice',
      width: 120,
      sorter: (a, b) => Number(a.salePrice) - Number(b.salePrice),
      render: (salePrice: string) => (
        <span className='text-red-500'>{formatPrice(salePrice)}</span>
      ),
    },
    {
      title: 'Giá vốn',
      dataIndex: 'costPrice',
      width: 120,
      sorter: (a, b) => Number(a.salePrice) - Number(b.salePrice),
      render: (costPrice: string) => (
        <span className='text-blue-500'>{formatPrice(costPrice)}</span>
      ),
    },
    {
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
    const newProducts = props.productsFake.filter(product => product.id !== id);
    setProductsData(newProducts);
  };
  return (
    <div className='w-full'>
      <ResizeTable columns={columnsData} data={productsData} />
    </div>
  );
};

export default ProductList;

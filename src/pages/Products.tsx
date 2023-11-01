import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Spin } from 'antd';

import { getAPI } from 'src/api/config';
import Filters, { FilterProps } from 'src/components/Filters/Filters';
import ProductList from 'src/components/pages/Products/ProductList';
import { ProductProps } from 'src/constants/types/product';

const filters: FilterProps[] = [
  {
    title: 'Loại hàng',
    type: 'checkbox',
    name: 'category',
    options: [
      {
        label: 'Hàng hóa',
        value: '1',
      },
      {
        label: 'Dịch vụ',
        value: '2',
      },
      {
        label: 'Combo - Đóng gói',
        value: '3',
      },
    ],
  },
  {
    title: 'Tồn kho',
    type: 'radio',
    name: 'availableItem',
    options: [
      {
        label: 'Dưới định mức tồn',
        value: '1',
      },
      {
        label: 'Vượt định mức tồn',
        value: '2',
      },
      {
        label: 'Còn hàng trong kho',
        value: '3',
      },
      {
        label: 'Hết hàng trong kho',
        value: '4',
      },
    ],
  },
  {
    title: 'Thương hiệu',
    type: 'select',
    name: 'brand',
    options: [
      {
        label: 'Indomie',
        value: '1',
      },
      {
        label: 'Monster Energy',
        value: '2',
      },
    ],
  },
  {
    title: 'Nhà cung cấp',
    type: 'text',
    name: 'supplier',
  },
  {
    title: 'Thời gian',
    type: 'pick-time',
    name: 'date',
  },
];
const URLENDPOINT = 'san-pham?idCh=1';
const Products = () => {
  const { data: productsData, mutate, error } = useSWR(URLENDPOINT, getAPI);
  const handleFilterChange = (filters: any) => {
    console.log('filters:', filters);
    // call filter api
  };
  console.log(productsData);

  if (productsData)
    return (
      <div className='flex w-full items-start gap-5'>
        <Filters
          title='Hàng hóa'
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <ProductList productsFake={productsData.datalink} />
      </div>
    );
  return <Spin size='large' />;
};

export default Products;

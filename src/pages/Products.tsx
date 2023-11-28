import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Empty, Spin } from 'antd';

import ProductList from 'src/components/pages/Products/ProductList';
import MyFilters, { MyFilterProps } from 'src/components/Filters/MyFilters';
import useProducts from 'src/api/productApi';
import { CategoryProp } from 'src/constants/types/category';
import { productTypeProps } from 'src/constants/types/productType';
import { serialize } from 'src/utils/format';
import { getIdCh } from 'src/utils/common';
import { SupplierProps } from 'src/constants/types/supplier';
const filters: MyFilterProps[] = [
  // {
  //   title: 'Loại hàng',
  //   type: 'checkbox',
  //   name: 'category',
  //   options: [
  //     {
  //       label: 'Hàng hóa',
  //       value: '1',
  //     },
  //     {
  //       label: 'Dịch vụ',
  //       value: '2',
  //     },
  //     {
  //       label: 'Combo - Đóng gói',
  //       value: '3',
  //     },
  //   ],
  // },
  // {
  //   title: 'Tồn kho',
  //   type: 'radio',
  //   name: 'availableItem',
  //   options: [
  //     {
  //       label: 'Dưới định mức tồn',
  //       value: '1',
  //     },
  //     {
  //       label: 'Vượt định mức tồn',
  //       value: '2',
  //     },
  //     {
  //       label: 'Còn hàng trong kho',
  //       value: '3',
  //     },
  //     {
  //       label: 'Hết hàng trong kho',
  //       value: '4',
  //     },
  //   ],
  // },
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
];

const Products = () => {
  const [url, setURL] = useState(`/api/sort_search?idCh=${getIdCh()}`);
  const { data: productsData, error, mutate } = useSWR(url);
  const { data: brandData } = useSWR(`/api/thuong-hieu?idCh=${getIdCh()}`);
  const { data: productTypeData } = useSWR(
    `/api/loai-san-pham?idCh=${getIdCh()}`,
  );
  const { data: categoryData } = useSWR(`/api/thuong-hieu?idCh=${getIdCh()}`);
  const { data: supplierData } = useSWR(`api/nha-cung-cap?idCh=${getIdCh()}`);
  const [filters, setFilters] = useState<object>({});
  const filtersProp: MyFilterProps[] = [
    {
      title: 'Thương hiệu',
      type: 'select',
      name: 'th',
      apiURL: '/api/thuong-hieu',
      options:
        brandData &&
        brandData.data?.map((item: CategoryProp) => {
          return {
            value: item.id,
            label: item.ten,
            item: item,
          };
        }),
    },
    {
      title: 'Loại sản phẩm',
      type: 'select',
      name: 'loai',
      options:
        productTypeData &&
        productTypeData?.data?.map((item: productTypeProps) => {
          return {
            value: item.id,
            label: item.ten,
            item: item,
          };
        }),
      apiURL: '/api/loai-san-pham',
    },
    {
      title: 'Danh mục',
      type: 'select',
      name: 'dm',
      options:
        categoryData &&
        categoryData.data &&
        categoryData.data?.map((item: CategoryProp) => {
          return {
            value: item.id,
            label: item.ten,
            item: item,
          };
        }),
      apiURL: '/api/danh-muc-san-pham',
    },
    {
      title: 'Nhà cung cấp',
      type: 'select',
      name: 'ncc',
      options:
        supplierData &&
        supplierData.data &&
        supplierData.data?.map((item: SupplierProps) => {
          return {
            value: item.id,
            label: item.ten,
            item: item,
          };
        }),
      apiURL: '/api/nha-cung-cap',
    },
  ];
  const loading = !productsData && !error;
  const handleFilterChange = (filters: any) => {
    console.log(filters);

    setFilters(filters);
  };
  useEffect(() => {
    setURL(`/api/sort_search?idCh=${getIdCh()}&${serialize(filters)}`);
  }, [filters]);
  return (
    <div className='flex w-full items-start gap-5'>
      <MyFilters
        title='Hàng hóa'
        filters={filtersProp}
        onFilterChange={handleFilterChange}
      />

      <div className='flex-1'>
        {loading && <Spin size='large' className='mx-auto block' />}
        {productsData &&
        productsData?.data &&
        productsData?.data?.length == 0 ? (
          <Empty description='Không tìm thấy sản phẩm' />
        ) : (
          productsData &&
          productsData?.data && (
            <ProductList products={productsData.data} mutate={mutate} />
          )
        )}
      </div>
    </div>
  );
};

export default Products;

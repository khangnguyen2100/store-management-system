import { useState } from 'react';

import Filters, { FilterProps } from 'src/components/pages/Products/Filters';
import ProductList from 'src/components/pages/Products/ProductList';
import { productsFake } from 'src/mocks/products';

export type ProductProps = {
  id: string;
  category: string;
  brand: string;
  code: string;
  thumbnail: string;
  name: string;
  salePrice: string;
  costPrice: string;
  availableItem: string;
  description: string;
};
const filters: FilterProps[] = [
  {
    title: 'Loại hàng',
    type: 'checkbox',
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
  const [products, setProducts] = useState<ProductProps[]>(productsFake);

  const handleFilterChange = (newProducts: ProductProps[]) => {
    setProducts(newProducts);
  };

  return (
    <div className='flex items-start gap-5'>
      <Filters
        title='Hàng hóa'
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <ProductList productsFake={products} />
    </div>
  );
};

export default Products;

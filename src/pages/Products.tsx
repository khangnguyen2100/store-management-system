import { Empty, Spin } from 'antd';
import { useEffect, useState } from 'react';

import useProducts from 'src/api/productApi';
import MyFilters from 'src/components/Filters/MyFilters';
import ProductList from 'src/components/pages/Products/ProductList';
import { getIdCh } from 'src/utils/common';
import { serialize } from 'src/utils/format';

export type ProductFilter = {
  th: string;
  loai: string;
  dm: string;
  ncc: string;
};
const filterInit: ProductFilter = {
  th: '',
  loai: '',
  dm: '',
  ncc: '',
};

const Products = () => {
  const idCh = getIdCh();
  const [searchUrl, setSearchURL] = useState(`/api/sort_search?idCh=${idCh}`);
  const [filters, setFilters] = useState<ProductFilter>(filterInit);

  const handleFilterChange = (filters: ProductFilter) => {
    setFilters(filters);
  };
  useEffect(() => {
    setSearchURL(`/api/sort_search?idCh=${idCh}&${serialize(filters)}`);
  }, [filters]);
  return (
    <div className='flex w-full items-start gap-5'>
      <MyFilters
        filters={filters}
        title='Hàng hóa'
        onFilterChange={handleFilterChange}
      />

      <div className='flex-1'>
        <ProductList searchUrl={searchUrl} />
      </div>
    </div>
  );
};

export default Products;

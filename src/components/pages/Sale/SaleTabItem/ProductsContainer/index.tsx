import { Button, Card } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

import { ProductProps } from 'src/constants/types/product';

import ProductItem from './ProductItem';

type Props = {
  data: ProductProps[];
  onAddToCart: (product: ProductProps) => void;
};
const {} = Card;
const ProductsContainer = (props: Props) => {
  const { data, onAddToCart } = props;
  return (
    <Card
      title='Danh sách sản phẩm'
      className='product-list-container relative w-full'
      size='small'
    >
      <div className='h-[calc(100vh-50px-16px-38px-12px)] overflow-y-auto'>
        <div className='grid h-full w-full grid-cols-1 gap-2 px-2 sm:grid-cols-2 lg:grid-cols-3'>
          {data.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              onAdd={onAddToCart}
            />
          ))}
        </div>
      </div>
      <div className='absolute inset-x-0 bottom-0 h-[80px] rounded-b-md border border-primary/40 bg-white px-4 py-2'>
        <div className='flex h-full items-center justify-between'>
          <div></div>
          <div className='flex items-center justify-end'>
            <Button type='primary' icon={<ArrowRightOutlined />}>
              Thanh toán
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductsContainer;

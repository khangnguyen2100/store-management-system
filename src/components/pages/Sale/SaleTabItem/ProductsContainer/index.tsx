import { Card, Image } from 'antd';

import { ProductProps } from 'src/constants/types/product';
import { formatPrice } from 'src/utils/format';

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
      className='product-list-container w-full'
      size='small'
    >
      <div className='h-[calc(100vh-50px-16px-38px-12px)] overflow-y-auto'>
        <div className='grid h-full w-full grid-cols-1 gap-2 px-2 sm:grid-cols-2 lg:grid-cols-3'>
          {data.map(product => (
            <div
              key={product.id}
              className='transition-sm col-span-1 flex w-full cursor-pointer items-center gap-x-2 rounded-md border border-transparent p-1 shadow-sm hover:border-primary'
              onClick={() => onAddToCart(product)}
            >
              <div className='overflow-hidden rounded-md'>
                <Image
                  src={product.thumbnail}
                  width={70}
                  height={50}
                  className='object-cover'
                  alt={product.name}
                />
              </div>
              <div className='flex flex-col'>
                <h4 className='text-sm font-bold'>{product.name}</h4>
                <p className='font-medium text-red-600'>
                  {formatPrice(product.salePrice)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProductsContainer;

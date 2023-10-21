import { Image } from 'antd';

import { ProductProps } from 'src/constants/types/product';
import { formatPrice } from 'src/utils/format';

type Props = {
  product: ProductProps;
  onAdd: (product: ProductProps) => void;
};

const ProductItem = (props: Props) => {
  const { onAdd, product } = props;
  return (
    <div
      key={product.id}
      className='transition-sm col-span-1 flex w-full cursor-pointer items-center gap-x-2 rounded-md border border-transparent p-1 shadow-sm hover:border-primary'
      onClick={() => onAdd(product)}
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
  );
};

export default ProductItem;

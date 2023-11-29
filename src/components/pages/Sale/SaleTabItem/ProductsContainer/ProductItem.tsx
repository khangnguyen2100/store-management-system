import { Image } from 'antd';
import clsx from 'clsx';

import { ProductProps } from 'src/constants/types/product';
import { getImage } from 'src/utils/common';
import { formatPrice } from 'src/utils/format';

type Props = {
  product: ProductProps;
  onAdd: (product: ProductProps) => void;
};

const ProductItem = (props: Props) => {
  const { onAdd, product } = props;
  if (!product) return null;
  return (
    <div
      key={product.id}
      className={clsx(
        'transition-sm col-span-1 flex h-fit w-full cursor-pointer items-center gap-x-2 rounded-md border border-transparent p-1 shadow-sm hover:border-primary',
        Number(product.soLuong) === 0 && 'cursor-not-allowed opacity-50',
      )}
      onClick={Number(product.soLuong) > 0 ? () => onAdd(product) : () => {}}
    >
      {product?.img && (
        <div className='overflow-hidden rounded-md'>
          <Image
            src={getImage(product.img)}
            width={70}
            height={50}
            className='object-cover'
            alt={product.ten}
          />
        </div>
      )}

      <div className='flex flex-col'>
        <h4 className='text-sm font-bold'>{product.ten}</h4>
        <p className='font-medium text-red-600'>
          {formatPrice(product.giaBan)}
        </p>
        <p>
          SL: <span className='font-semibold'>{product.soLuong}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductItem;

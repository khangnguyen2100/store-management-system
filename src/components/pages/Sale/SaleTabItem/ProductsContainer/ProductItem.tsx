import { Image, Tooltip } from 'antd';
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
      style={{
        boxShadow:
          'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
      }}
      onClick={Number(product.soLuong) > 0 ? () => onAdd(product) : () => {}}
    >
      {product?.img && (
        <div className='overflow-hidden rounded-sm w-[75px] h-[50px] object-cover shrink-0'>
          <Image
            src={getImage(product.img)}
            width={75}
            height={50}
            className='object-cover'
            alt={product.ten}
          />
        </div>
      )}

      <div className='flex flex-col overflow-hidden'>
        <Tooltip title={product.ten}>
          <h4 className='overflow-clip text-ellipsis whitespace-nowrap text-sm font-bold'>
            {product.ten}
          </h4>
        </Tooltip>
        <p className='font-bold text-red-600'>{formatPrice(product.giaBan)}</p>
        <p>
          Số lượng:{' '}
          <span className='font-bold text-typo-1'>{product.soLuong}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductItem;

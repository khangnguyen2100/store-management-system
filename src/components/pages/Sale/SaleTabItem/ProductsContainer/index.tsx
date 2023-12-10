import { Button, Card } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

import { ProductProps } from 'src/constants/types/product';
import useProducts from 'src/api/productApi';
import Loading from 'src/components/Loading/Loading';
import { CartType } from 'src/constants/types/cart';
import { getIdCh } from 'src/utils/common';
import useSaleSlice from 'src/store/slices/saleSlice';

import ProductItem from './ProductItem';

type Props = {
  cartList: CartType[];
  onAddToCart: (product: ProductProps) => void;
  onPayment: () => void;
};
const {} = Card;
const ProductsContainer = (props: Props) => {
  const { onAddToCart, onPayment, cartList } = props;
  const { searchText } = useSaleSlice();
  const { data, error, isLoading } = useProducts({
    idCh: getIdCh(),
    keyword: searchText,
    tinhTrang: '2',
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <Card
      title='Danh sách sản phẩm'
      className='product-list-container relative w-full'
      size='small'
    >
      <div className='h-[calc(100vh-50px-16px-38px-12px)] overflow-y-auto'>
        <div className='grid w-full grid-cols-1 items-start justify-start gap-2 px-2 py-1 sm:grid-cols-2 lg:grid-cols-3'>
          {data?.data
            ?.filter((item: ProductProps) => Number(item.soLuong) >= 0)
            .map((product: ProductProps) =>
              product ? (
                <ProductItem
                  key={product.id}
                  product={product}
                  onAdd={onAddToCart}
                />
              ) : null,
            )}
        </div>
      </div>
      <div className='absolute inset-x-0 bottom-0 h-[80px] rounded-b-md border border-primary/20 bg-white px-4 py-2 shadow-md'>
        <div className='flex h-full items-center justify-between'>
          <div></div>
          <div className='flex items-center justify-end'>
            <Button
              type='primary'
              icon={<ArrowRightOutlined />}
              onClick={onPayment}
              disabled={cartList.length === 0}
            >
              Thanh toán
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductsContainer;

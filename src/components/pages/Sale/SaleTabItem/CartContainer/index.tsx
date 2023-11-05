import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Input } from 'antd';

import { CartType } from 'src/constants/types/cart';
import { formatPrice } from 'src/utils/format';

import CartItemToolsMenu from './CartItemToolsMenu';

type Props = {
  data: CartType[];
  onDecrement: (cartId: string) => void;
  onIncrement: (cartId: string) => void;
  onDelete: (cartId: string) => void;
  totalItems: number;
  totalPrice: number;
  noteValue: string;
  setNoteValue: (value: string) => void;
};
const { TextArea } = Input;

const CartContainer = (props: Props) => {
  const {
    data,
    onDecrement,
    onIncrement,
    totalItems,
    totalPrice,
    onDelete,
    noteValue,
    setNoteValue,
  } = props;

  return (
    <Card
      title='Đơn hàng'
      className='cart-container relative w-full'
      size='small'
    >
      <div className='h-[calc(100vh-50px-16px-38px-12px)] overflow-y-auto'>
        {data.length > 0 ? (
          <div className='flex h-full w-full flex-col gap-y-2 px-2'>
            {data.map((item, index) => {
              const { ten, giaBan, quantity } = item;
              return (
                <div
                  key={index}
                  className='relative flex items-center justify-between rounded-sm border border-typo-2/30 bg-[#fbfbfb] p-2 transition-all hover:shadow-md'
                >
                  <div className='flex items-center justify-between'>
                    <h4 className='text-center text-base font-bold'>{ten}</h4>
                  </div>
                  <div className='mr-10 flex flex-col justify-end'>
                    <p className='text-center text-base font-medium text-red-600'>
                      {formatPrice((Number(giaBan) * quantity).toString())}
                    </p>
                    <div className='flex items-center justify-center gap-x-2'>
                      <Button
                        type='text'
                        icon={<MinusOutlined />}
                        onClick={() => onDecrement(item.id)}
                      />
                      <span className='font-noto font-semibold'>
                        {quantity}
                      </span>
                      <Button
                        type='text'
                        icon={<PlusOutlined />}
                        onClick={() => onIncrement(item.id)}
                      />
                    </div>
                  </div>
                  <div className='absolute right-2 top-1/2 -translate-y-1/2'>
                    <CartItemToolsMenu
                      onDelete={() => onDelete(item.id)}
                      onAddNote={() => {}}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Empty className='flex-center h-full' description='Chưa có dữ liệu' />
        )}
      </div>
      {totalItems > 0 && (
        <div className='absolute bottom-4 left-4 right-8 flex translate-x-[-2px] flex-col  rounded-lg border border-primary bg-section-5 px-3 py-2'>
          <div className=' flex  items-center justify-between gap-x-8'>
            <div className='grow'>
              <TextArea
                rows={3}
                placeholder='Ghi chú đơn hàng'
                maxLength={1000}
                value={noteValue}
                onChange={e => setNoteValue(e.target.value)}
              />
            </div>

            <div className='flex flex-col gap-y-3'>
              <h4 className='text-base font-normal'>
                Số lượng:{' '}
                <span className='font-lg font-bold'>{totalItems}</span>
              </h4>
              <h4 className='text-base font-normal'>
                Tổng tiền:{' '}
                <span className='font-semibold text-red-500'>
                  {formatPrice(totalPrice, true)}
                </span>
              </h4>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CartContainer;

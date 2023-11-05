import { Col, Input, List, Row, Space, Typography } from 'antd';
const { TextArea } = Input;

import { CartType } from 'src/constants/types/cart';
import { formatPrice } from 'src/utils/format';

type Props = {
  cartList: CartType[];
  totalItems: number;
  totalPrice: number;
  noteValue: string;
  setNoteValue: (value: string) => void;
};

const CartInfo = (props: Props) => {
  const { cartList, totalItems, totalPrice, noteValue, setNoteValue } = props;
  return (
    <div className='relative mt-4 flex h-full min-h-[500px] w-full flex-col px-4'>
      <Row className='w-full'>
        <h2>Thông tin đơn hàng</h2>
      </Row>
      <List
        itemLayout='horizontal'
        dataSource={cartList}
        bordered
        className='mt-3 h-full w-full overflow-y-auto'
        size='small'
        renderItem={(item, index) => (
          <List.Item
            key={index}
            className='w-full'
            extra={
              <Space size={'small'} direction='vertical'>
                <Typography.Text className='text-base font-semibold text-red-600'>
                  {formatPrice(item.giaBan)}
                </Typography.Text>
                <h4 className='text-sm font-normal text-typo-1'>
                  Số lượng: {item.quantity}
                </h4>
              </Space>
            }
          >
            <List.Item.Meta
              title={
                <Typography.Text className='text-base text-typo-1'>
                  {item.ten}
                </Typography.Text>
              }
              description={
                <h4 className='text-sm font-normal text-typo-3'>{item.note}</h4>
              }
            />
          </List.Item>
        )}
      />
      {/* <div className='flex flex-col rounded-lg border border-primary bg-section-5 px-3 py-2'></div> */}
      <Row className='relative inset-x-0 bottom-0 mt-auto w-full justify-between gap-x-8'>
        <Col className='grow md:mr-10'>
          <TextArea
            rows={3}
            placeholder='Ghi chú đơn hàng'
            maxLength={1000}
            value={noteValue}
            onChange={e => setNoteValue(e.target.value)}
          />
        </Col>
        <Col className='w-fit'>
          <h3>Tổng số lượng: {totalItems}</h3>
          <h3 className='text-lg text-red-500'>
            Tổng tiền: {formatPrice(totalPrice)}
          </h3>
        </Col>
      </Row>
    </div>
  );
};

export default CartInfo;

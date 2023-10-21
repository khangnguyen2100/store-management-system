import { DeleteOutlined, FormOutlined, MoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

type Props = {
  onAddNote: () => void;
  onDelete: () => void;
};

const CartItemToolsMenu = (props: Props) => {
  const { onDelete } = props;
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Thêm ghi chú',
      icon: <FormOutlined />,
    },
    {
      key: '2',
      label: 'Xóa',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: onDelete,
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <MoreOutlined className='text-xl' />
    </Dropdown>
  );
};

export default CartItemToolsMenu;

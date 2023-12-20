import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { MenuProps } from 'antd/lib';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};
const ShopContextMenu = (props: Props) => {
  const { onDelete, onEdit } = props;
  const items: MenuProps['items'] = [
    // {
    //   key: '1',
    //   label: 'Chỉnh sửa',
    //   icon: <EditOutlined />,
    //   onClick: onEdit,
    // },
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
export default ShopContextMenu;

import { Button, Popconfirm, Space, Tooltip } from 'antd';
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
} from 'react-icons/ai';

type Props = {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
};
const TableAction = (props: Props) => {
  const { onEdit, onView, onDelete } = props;
  return (
    <Space align='center' direction='horizontal' size={'small'}>
      {onEdit && (
        <Tooltip title='Chỉnh sửa'>
          <Button
            type='text'
            className='text-blue-600 hover:!text-blue-500'
            icon={<AiOutlineEdit className='text-xl' />}
            onClick={onEdit}
          />
        </Tooltip>
      )}
      {onView && (
        <Tooltip title='Xem'>
          <Button
            type='text'
            className='text-blue-600 hover:!text-blue-500'
            icon={<AiOutlineEye className='text-xl' />}
            onClick={onView}
          />
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title='Xóa'>
          <Popconfirm
            title='Xóa sản phẩm'
            description='Bạn có chắc chưa?'
            onConfirm={() => {
              onDelete();
            }}
            onCancel={() => {}}
            okText='Yes'
            cancelText='No'
          >
            <Button
              type='text'
              danger
              icon={<AiOutlineDelete className='text-xl' />}
            />
          </Popconfirm>
        </Tooltip>
      )}
    </Space>
  );
};

export default TableAction;

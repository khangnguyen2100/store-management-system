import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { List, Spin } from 'antd';
import { enqueueSnackbar } from 'notistack';

import { DeleteAPI, getAPI, patchAPI, postAPI } from 'src/api/config';

import ChangeModal from './ChangeModal';
type Props = {
  // data: any[];
  apiURL?: string;
  forField?: string;
};
function ListFilter({ apiURL, forField }: Props) {
  const { data, mutate, error } = useSWR(`${apiURL}?idCh=4`, getAPI);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState('');
  const [edittingItem, setEdittingItem] = useState(null);
  const handleChangeModal = (modalType: string, item: any) => {
    setIsModalOpen(true);
    setModalType(modalType);
    setEdittingItem(item);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };
  const handleDelete = async (values: any) => {
    await DeleteAPI(`${apiURL}/${values.id}?idCh=4`);
    await mutate();
    enqueueSnackbar('Xóa thành công', { variant: 'success' });
  };
  const handleModalOk = async (values: any) => {
    console.log(values);
    try {
      if (modalType === 'add') {
        console.log('new Item', values);
        // await postAPI(apiURL as string, values);
        enqueueSnackbar('Thêm thành công', { variant: 'success' });
      }
      if (modalType === 'edit') {
        await patchAPI(`${apiURL}/${values.id}?idCh=4`, {
          ...values,
        });
        await mutate();
        enqueueSnackbar('Sửa thành công', { variant: 'success' });
      }
    } catch (error) {
      console.log('error:', error);
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
    }
    setIsModalOpen(false);
  };
  if (data)
    return (
      <>
        <List
          dataSource={data}
          renderItem={(item: any, index) => {
            if (index > 5) return;
            return (
              <div
                className='group flex cursor-pointer items-center justify-between py-2 hover:bg-[#F0F1F3]'
                key={index}
              >
                <span className='text-sm'>{item.ten}</span>
                <i
                  className='fa-regular fa-pencil !invisible h-full cursor-pointer p-1 text-base hover:bg-[#e6f8ec] group-hover:!visible'
                  onClick={() => handleChangeModal('edit', item)}
                ></i>
              </div>
            );
          }}
        />
        <ChangeModal
          isOpen={isModalOpen}
          onSuccess={handleModalOk}
          onCancel={handleModalCancel}
          editingItem={edittingItem}
          modalType={modalType}
          modalFor={forField}
          onDelete={handleDelete}
        />
      </>
    );
  return <Spin size='large' />;
}

export default ListFilter;

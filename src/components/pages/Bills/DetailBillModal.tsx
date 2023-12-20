import { Button, Image, Modal, Spin } from 'antd';
import { memo, useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { enqueueSnackbar } from 'notistack';

import { productApi } from 'src/api/productApi';
import BasicTable from 'src/components/BasicTable/BasicTable';
import { formatPrice } from 'src/utils/format';
import { getImage } from 'src/utils/common';

import { IProductProps } from './BillList';

type Props = {
  isOpen: boolean;
  data: { idSp: string; soLuongTrongBill: number; tongTrongBill: number }[];
  onCancel: () => void;
};

const DetailBillModal = (props: Props) => {
  const { isOpen, data, onCancel } = props;
  const [productList, setProductList] = useState<IProductProps[]>([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        data.map(async item => {
          const product = await productApi.getProduct(item.idSp);
          setProductList(prev => {
            return [
              ...prev,
              {
                ...product.data.datalink[0],
                soLuongTrongBill: item.soLuongTrongBill,
                tongTrongBill: item.tongTrongBill,
              },
            ];
          });
        });
      };

      fetchData();
    } catch (error) {
      enqueueSnackbar('Đã có lỗi xảy ra!', { variant: 'error' });
    }

    // You might not need this line if you want to keep the productList when the component unmounts
    return () => setProductList([]);
  }, [data]);

  const columns: ColumnsType<IProductProps> = [
    {
      key: 1,
      title: 'STT',
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      key: 2,
      title: 'Tên sản phẩm',
      dataIndex: 'ten',
      width: 100,
    },
    {
      key: 3,
      title: 'Số lượng trong hóa đơn',
      dataIndex: 'soLuongTrongBill',
      width: 50,
      align: 'center',
      sorter: (a, b) => Number(a.soLuongTrongBill) - Number(b.soLuongTrongBill),
    },
    {
      key: 4,
      title: 'Hình ảnh sản phẩm',
      dataIndex: 'img',
      width: 50,
      render: (thumbnail: string) => {
        if (!thumbnail) return <></>;
        return (
          <Image
            src={getImage(thumbnail)}
            alt='product img'
            height={'75px'}
            className='!w-[75px] rounded-md object-cover'
          />
        );
      },
      align: 'center',
    },
    {
      key: 5,
      title: 'Tổng tiền',
      dataIndex: 'tongTrongBill',
      width: 50,
      render: (soLuong: number) => {
        return <span className='text-blue-500'>{formatPrice(soLuong)}</span>;
      },
      sorter: (a, b) => Number(a.tongTrongBill) - Number(b.tongTrongBill),
      align: 'center',
    },
  ];

  return (
    <Modal
      title={'Chi tiết hóa đơn'}
      cancelText='Tắt'
      open={isOpen}
      onCancel={onCancel}
      width={1000}
      destroyOnClose
      getContainer={false}
      footer={() => {
        return (
          <Button
            icon={<i className='fa-regular fa-ban'></i>}
            size='large'
            className='bg-btn_bg_gray text-white opacity-80 hover:!opacity-100'
            onClick={onCancel}
          >
            Tắt
          </Button>
        );
      }}
    >
      {productList.length === 0 ? (
        <Spin size='default'></Spin>
      ) : (
        <BasicTable columns={columns} data={productList} onChange={() => {}} />
      )}
    </Modal>
  );
};

export default memo(DetailBillModal);

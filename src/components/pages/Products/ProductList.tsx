/* eslint-disable @typescript-eslint/no-empty-function */
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Empty,
  Image,
  Space,
  Upload,
  UploadProps,
  message,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import * as xlsx from 'xlsx';
import { AxiosError } from 'axios';

import {
  DeleteAPI,
  getAuthorizationHeader,
  postAPI,
  request,
} from 'src/api/config';
import BasicTable from 'src/components/BasicTable/BasicTable';
import { ProductProps } from 'src/constants/types/product';
import { getIdCh, getImage } from 'src/utils/common';
import { formatPrice } from 'src/utils/format';

import TableAction from '../../GroupButton/TableAction';

import AddModal from './AddModal';

type Props = {
  searchUrl: string;
};

const ProductList = (props: Props) => {
  const { searchUrl } = props;
  const { data: products, mutate, error, isLoading } = useSWR(searchUrl);
  const [uploading, setUploading] = useState(false);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductProps | null>(
    null,
  );
  const [totalItem, setTotalItem] = useState(100);
  const columns: ColumnsType<ProductProps> = [
    {
      key: 1,
      title: 'STT',
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      key: 2,
      title: 'Tên',
      dataIndex: 'ten',
      width: 150,
    },
    {
      key: 4,
      title: 'Mã sản phẩm',
      dataIndex: 'maSp',
      width: 100,
    },
    {
      key: 5,
      title: 'Số lượng',
      dataIndex: 'soLuong',
      sorter: (a, b) => Number(a.soLuong) - Number(b.soLuong),
      width: 70,
      align: 'center',
    },
    {
      key: 6,
      title: 'Ảnh',
      dataIndex: 'img',
      width: 100,
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
      className: 'table-cell-img',
    },
    {
      key: 7,
      title: 'Giá vốn',
      dataIndex: 'giaVon',
      width: 100,
      sorter: (a, b) => Number(a.giaVon) - Number(b.giaVon),
      render: (costPrice: string) => (
        <span className='text-blue-500'>{formatPrice(costPrice)}</span>
      ),
      align: 'right',
    },
    {
      key: 8,
      title: 'Giá bán',
      dataIndex: 'giaBan',
      width: 120,
      sorter: (a, b) => Number(a.giaBan) - Number(b.giaBan),
      render: (salePrice: string) => (
        <span className='text-red-500'>{formatPrice(salePrice)}</span>
      ),
      align: 'right',
    },
    {
      title: 'Thao tác',
      key: 'Thao tác',
      width: 80,
      render: (record: ProductProps) => {
        return (
          <TableAction
            onDelete={() => handleDeleteProduct(record.id!)}
            onEdit={() => handleEditProduct(record)}
          />
        );
      },
      align: 'center',
    },
  ];
  const handleDeleteProduct = async (id: string) => {
    await DeleteAPI(`/api/san-pham/${id}`);
    mutate(`/api/sort_search?idCh=${getIdCh()}`);
    enqueueSnackbar('Xóa sản phẩm thành công', { variant: 'success' });
  };
  const handleEditProduct = (record: ProductProps) => {
    setModalType('edit');
    setEditingProduct(record);
    setIsModalOpen(true);
  };
  const handleAddProduct = () => {
    setModalType('add');
    setIsModalOpen(true);
  };
  const handleModalOk = async (values: ProductProps) => {
    setIsItemLoading(prev => !prev);
    try {
      if (modalType === 'add') {
        const newData = new FormData();
        for (const [key, value] of Object.entries(values)) {
          if (value !== undefined && value !== null) {
            newData.append(key, value);
          }
        }
        console.log(await postAPI(`/api/san-pham?idCh=${getIdCh()}`, newData));
        mutate(`/api/sort_search?idCh=${getIdCh()}`);
        setIsItemLoading(prev => !prev);
        enqueueSnackbar('Thêm sản phẩm thành công', { variant: 'success' });
        setIsModalOpen(false);
      }
      if (modalType === 'edit') {
        const newData = new FormData();
        for (const [key, value] of Object.entries(values)) {
          if (value !== undefined && value !== null) {
            newData.append(key, value);
          }
        }
        console.log(
          await postAPI(
            `/api/san-pham/${values.id}?idCh=${getIdCh()}`,
            newData,
          ),
        );
        enqueueSnackbar('Sửa sản phẩm thành công', { variant: 'success' });
        await mutate(`/api/sort_search?idCh=${getIdCh()}`);
        setIsItemLoading(prev => !prev);
        setIsModalOpen(false);
        return;
      }
    } catch (error: any) {
      console.log('error:', error);
      if (error && error.response.status === 403) {
        enqueueSnackbar('Bạn đạt giới hạn số lượng sản phẩm tối đa!', {
          variant: 'error',
        });
        enqueueSnackbar('Để có thể thêm sản phẩm vui lòng nâng gói', {
          variant: 'info',
        });
      } else enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
    }
    setIsModalOpen(false);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };
  const handleTableChange = (pagination: any) => {
    console.log('product list call');
  };
  const uploadProps: UploadProps = {
    name: 'excel-file',
    accept: '.xlsx, .xls',
    showUploadList: false,
    multiple: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      console.log(file);
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('idCh', getIdCh());
        const response = await request(`/api/import-excel`, {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: getAuthorizationHeader(),
          },
          method: 'POST',
          data: formData,
        });

        // Xử lý response thành công
        if (response.status === 200) {
          message.success(`file uploaded successfully`);
          mutate(`/api/sort_search?idCh=${getIdCh()}`);
        } else {
          message.error(`file upload failed.`);
        }
      } catch (error) {
        // Xử lý lỗi
        message.error(`file upload failed.`);
      }
    },
    // onChange(info) {
    //   if (info.file.status !== 'uploading') {
    //     const reader = new FileReader();
    //     reader.onload = e => {
    //       const data = e.target?.result;
    //       const workbook = xlsx.read(data, { type: 'array' });
    //       const sheetName = workbook.SheetNames[0];
    //       const worksheet = workbook.Sheets[sheetName];
    //       const json = xlsx.utils.sheet_to_json(worksheet);
    //       handleUpload(json);
    //     };
    //     reader.readAsArrayBuffer(info.fileList[0].originFileObj as Blob);
    //   }
    // },
    // beforeUpload(file: any) {
    //   console.log('file:', file);
    //   const isExcel =
    //     file.type === 'application/vnd.ms-excel' ||
    //     file.type ===
    //       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    //   const isSize = file.size / 1024 / 1024 < 100;
    //   if (!isExcel) {
    //     message.error('Vui lòng chỉ nhập file Excel (định dạng XLS/XLSX)!');
    //     return false;
    //   }
    //   if (!isSize) {
    //     message.error('Nhập file dung lượng nhỏ hơn 100MB!');
    //     return false;
    //   }
    //   return false;
    // },
  };
  if (error) {
    return <Empty description='Có lỗi xảy ra' />;
  }
  return (
    <Space className='w-full' direction='vertical'>
      <BasicTable
        columns={columns}
        data={products?.data || []}
        loading={isLoading}
        extra={
          <>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} loading={uploading}>
                Nhập hàng
              </Button>
            </Upload>
            <Button type='primary' onClick={handleAddProduct}>
              Thêm hàng
            </Button>
          </>
        }
        onChange={handleTableChange}
        pagination={{
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '15', '20'],
          hideOnSinglePage: true,
          total: totalItem,
        }}
      />
      <AddModal
        isOpen={isModalOpen}
        onSuccess={handleModalOk}
        onCancel={handleModalCancel}
        modalType={modalType}
        editingProduct={editingProduct}
        loading={isItemLoading}
      />
    </Space>
  );
};

export default ProductList;

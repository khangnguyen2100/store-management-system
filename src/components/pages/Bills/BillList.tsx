/* eslint-disable @typescript-eslint/no-empty-function */
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Image,
  Select,
  Space,
  Upload,
  UploadProps,
  message,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { enqueueSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import * as xlsx from 'xlsx';
import { KeyedMutator } from 'swr';
import axios from 'axios';

import { DeleteAPI, postAPI, request } from 'src/api/config';
import BasicTable from 'src/components/BasicTable/BasicTable';
import { formatPrice, serialize } from 'src/utils/format';
import { BillProps } from 'src/constants/types/bill';
import { getIdCh } from 'src/utils/common';
import PickTimeFilter from 'src/components/Filters/PickTimeFilter/PickTimeFilter';

import TableAction from '../../GroupButton/TableAction';

type Props = {
  data: BillProps[];
  mutate: KeyedMutator<any>;
};

const BillList = (props: Props) => {
  const { data } = props;
  const [billData, setBillData] = useState<BillProps[]>(data);
  const [dateFilter, setDateFilter] = useState<any>();
  console.log(dateFilter);

  const columns: ColumnsType<BillProps> = [
    {
      key: 1,
      title: 'STT',
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      key: 2,
      title: 'Mã hóa đơn',
      dataIndex: 'ma_hoa_don',
      width: 100,
    },
    {
      key: 3,
      title: 'Tổng tiền',
      dataIndex: 'tong_tien',
      width: 100,
      render: (tongTien: number) => {
        return <span className='text-blue-500'>{formatPrice(tongTien)}</span>;
      },
      sorter: (a, b) => Number(a.tong_tien) - Number(b.tong_tien),
    },
    {
      key: 4,
      title: 'Tổng giảm giá',
      dataIndex: 'tong_giam_gia',
      width: 100,
    },
    {
      key: 5,
      title: 'Tên cửa hàng',
      dataIndex: 'cua_hang',
      width: 70,
    },
    {
      key: 6,
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      width: 120,
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   width: 80,
    //   render: (record: BillProps) => {
    //     return (
    //       <TableAction
    //         onDelete={() => handleDeleteProduct(record.id!)}
    //         onEdit={() => handleEditProduct(record)}
    //       />
    //     );
    //   },
    //   align: 'center',
    // },
  ];
  const handleTableChange = (pagination: any) => {
    console.log('product list call');
  };
  const [uploading, setUploading] = useState(false);
  const handleUpload = (json: any) => {
    setUploading(true);
    fetch('https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188', {
      method: 'POST',
      body: JSON.stringify(json),
    })
      .then(res => res.json())
      .then(() => {
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const uploadProps: UploadProps = {
    name: 'excel-file',
    accept: '.xlsx, .xls',
    showUploadList: false,
    multiple: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target?.result;
          const workbook = xlsx.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = xlsx.utils.sheet_to_json(worksheet);
          handleUpload(json);
        };
        reader.readAsArrayBuffer(info.fileList[0].originFileObj as Blob);
      }
    },
    beforeUpload(file: any) {
      console.log('file:', file);
      const isExcel =
        file.type === 'application/vnd.ms-excel' ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const isSize = file.size / 1024 / 1024 < 100;
      if (!isExcel) {
        message.error('Vui lòng chỉ nhập file Excel (định dạng XLS/XLSX)!');
        return false;
      }
      if (!isSize) {
        message.error('Nhập file dung lượng nhỏ hơn 100MB!');
        return false;
      }
      return false;
    },
  };
  const handleExportPDF = () => {
    window.open(
      `https://admin.beesmart.io.vn/api/downloadPDF-hoa-don?idCh=${getIdCh()}̃&${serialize(
        dateFilter,
      )}`,
      '_blank',
    );
  };
  return (
    <Space className='w-full' direction='vertical'>
      <BasicTable
        columns={columns}
        data={billData}
        onChange={handleTableChange}
        pagination={{
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '15', '20'],
          total: 48,
        }}
        extra={
          <div className='flex gap-x-5'>
            <PickTimeFilter
              name='date'
              onFilterChange={(name, value) => {
                setDateFilter(value);
              }}
            ></PickTimeFilter>
            <Button type='default' onClick={handleExportPDF}>
              Xuất file PDF
            </Button>
          </div>
        }
      />
    </Space>
  );
};

export default BillList;

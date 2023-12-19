/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';

import BasicTable from 'src/components/BasicTable/BasicTable';
import { BillProps } from 'src/constants/types/bill';
import { getIdCh } from 'src/utils/common';
import { formatPrice, serialize } from 'src/utils/format';

type Props = {
  data: BillProps[];
  filters: any;
};

const BillList = (props: Props) => {
  const { data, filters } = props;

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
      render: (tong_giam_gia: number) => {
        return (
          <span className='text-red-500'>{formatPrice(tong_giam_gia)}</span>
        );
      },
      sorter: (a, b) => Number(a.tong_giam_gia) - Number(b.tong_giam_gia),
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
  const handleExportPDF = () => {
    window.open(
      `https://admin.beesmart.io.vn/api/downloadPDF-hoa-don?idCh=${getIdCh()}̃&${serialize(
        filters
          ? {
              startDate: filters.startDate,
              endDate: filters.endDate,
            }
          : {},
      )}`,
      '_blank',
    );
  };
  return (
    <Space className='w-full' direction='vertical'>
      <BasicTable
        columns={columns}
        data={data}
        onChange={handleTableChange}
        pagination={{
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '15', '20'],
          total: 48,
        }}
        extra={
          <Button type='default' onClick={handleExportPDF}>
            Xuất file PDF
          </Button>
        }
      />
    </Space>
  );
};

export default BillList;

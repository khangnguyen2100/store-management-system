import {
  Button,
  Checkbox,
  CheckboxOptionType,
  Dropdown,
  Menu,
  Space,
  Table,
} from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { FaTable } from 'react-icons/fa';
import React from 'react';

interface Props<T> {
  columns: ColumnsType<T>;
  data: T[];
  extra: React.ReactNode;
}

const BasicTable = <T extends object>({ columns, data, extra }: Props<T>) => {
  const optionsDisplay = columns.map(column => ({
    label: column.title,
    value: column.key,
  })) as CheckboxOptionType[];

  const [visibleColumns, setVisibleColumns] = useState<CheckboxValueType[]>(
    columns.map(column => column.key) as CheckboxValueType[],
  );
  const visibleColumnsData = columns.filter(column =>
    visibleColumns.includes(column.key as CheckboxValueType),
  );
  const [selectedColumns, setSelectedColumns] =
    useState<CheckboxValueType[]>(visibleColumns);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleOkColumn = () => {
    setVisibleColumns(selectedColumns);
    setDropdownVisible(false);
  };

  const handleResetColumn = () => {
    setSelectedColumns(
      columns.map(column => column.key) as CheckboxValueType[],
    );
  };
  const handleColumnFilter = (checkedValues: CheckboxValueType[]) => {
    setSelectedColumns(checkedValues);
  };
  const handleDropdownVisibleChange = (visible: boolean) => {
    setDropdownVisible(visible);
  };

  const MenuList = (
    <Menu>
      <Menu.Item key='columnFilter'>
        <Checkbox.Group
          options={optionsDisplay}
          value={selectedColumns as CheckboxValueType[]}
          onChange={handleColumnFilter}
          style={{ flexDirection: 'column' }}
        />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='buttonGroup' className='flex items-center'>
        <Button onClick={handleResetColumn}> Đặt lại </Button>
        <Button
          type='primary'
          onClick={handleOkColumn}
          style={{ backgroundColor: '#0FAC56', marginLeft: 25 }}
        >
          OK
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Space className='w-full' direction='vertical'>
      {/* action */}
      <div className='mb-6 flex items-center justify-between gap-x-2'>
        <Dropdown
          overlay={MenuList}
          trigger={['click']}
          open={dropdownVisible}
          onVisibleChange={handleDropdownVisibleChange}
        >
          <Button
            type='default'
            icon={<FaTable />}
            className='flex items-center'
          >
            Cột hiển thị
          </Button>
        </Dropdown>
        <Space>{extra}</Space>
      </div>
      <Table bordered columns={visibleColumnsData} dataSource={data} />
    </Space>
  );
};

export default BasicTable;

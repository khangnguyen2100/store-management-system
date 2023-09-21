/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import type { ResizeCallbackData } from 'react-resizable';
import { Resizable } from 'react-resizable';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './style.css';

const ResizableTitle = (
  props: React.HTMLAttributes<any> & {
    onResize: (
      e: React.SyntheticEvent<Element>,
      data: ResizeCallbackData,
    ) => void;
    width: number;
  },
) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className='react-resizable-handle'
          onClick={e => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};
interface Props<T> {
  columns: ColumnsType<T>;
  data: T[];
}

const ResizeTable = <T extends object>({ columns, data }: Props<T>) => {
  const [tableColumns, setTableColumns] = useState<ColumnsType<T>>(columns);

  const handleResize =
    (index: number) =>
    (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
      const newColumns = [...tableColumns];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setTableColumns(newColumns);
    };

  const mergeColumns: ColumnsType<T> = tableColumns.map((col, index) => ({
    ...col,
    onHeaderCell: (column: ColumnsType<T>[number]) => {
      return {
        width: column.width,
        onResize: handleResize(index) as React.ReactEventHandler<any>,
      };
    },
  }));

  return (
    <Table
      bordered
      className='resize-table-container'
      components={{
        header: {
          cell: ResizableTitle,
        },
      }}
      columns={mergeColumns}
      dataSource={data}
    />
  );
};

export default ResizeTable;

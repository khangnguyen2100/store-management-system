import {
  BgColorsOutlined,
  SnippetsOutlined,
  SortDescendingOutlined,
  ZoomInOutlined,
} from '@ant-design/icons';
import { Button, Input, Space, Tabs, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
  { label: 'Hóa đơn 1', children: 'Content of Tab 1', key: '1' },
  { label: 'Hóa đơn 2', children: 'Content of Tab 2', key: '2' },
  {
    label: 'Hóa đơn 3',
    children: 'Content of Tab 3',
    key: '3',
    closable: false,
    className: 'text-red-500',
  },
];

const SaleTabList: React.FC = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: 'New Tab',
      children: 'Content of new Tab',
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter(item => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs
      type='editable-card'
      className='w-full'
      tabBarExtraContent={{
        left: (
          <div className='mr-4'>
            <Input.Search placeholder='Tìm kiếm sản phẩm' />
          </div>
        ),
        right: (
          <Space className='ml-4'>
            <Tooltip title='Test'>
              <Button type='default' icon={<SnippetsOutlined />} />
            </Tooltip>
            <Tooltip title='Test'>
              <Button type='default' icon={<BgColorsOutlined />} />
            </Tooltip>
            <Tooltip title='Test'>
              <Button type='default' icon={<ZoomInOutlined />} />
            </Tooltip>
            <Tooltip title='Test'>
              <Button type='default' icon={<SortDescendingOutlined />} />
            </Tooltip>
          </Space>
        ),
      }}
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
      size='large'
    />
  );
};

export default SaleTabList;

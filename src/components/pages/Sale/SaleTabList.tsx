import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Input, Space, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { randomString } from 'src/utils/randomString';
import useDebounce from 'src/hooks/useDebounce';
import useSaleSlice from 'src/store/slices/saleSlice';

import SaleTabItem from './SaleTabItem';
import './style.scss';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
  {
    label: 'Hóa đơn 1',
    children: <SaleTabItem label={'Hóa đơn 1'} />,
    key: randomString('TAB-'),
    index: 1,
  },
];

const SaleTabList: React.FC = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const { onSearchTextChange } = useSaleSlice();
  const [searchValue, setSearchValue] = useState<string>('');
  const debounceText = useDebounce(searchValue, 200);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const handleAddNewTab = () => {
    const newActiveKey = randomString('TAB-');
    const keys = items.map(item => item.index).sort((a, b) => a - b);
    let newIndex = 1;
    keys.forEach(key => {
      if (newIndex < key) {
        return;
      }
      newIndex++;
    });

    setItems(prev => [
      ...prev,
      {
        label: `Hóa đơn ${newIndex}`,
        children: <SaleTabItem label={`Hóa đơn ${newIndex}`} />,
        key: newActiveKey,
        index: newIndex,
      },
    ]);
    setActiveKey(newActiveKey);
  };

  const handleRemoveTab = (targetKey: TargetKey) => {
    if (items.length === 1) {
      return;
    }
    if (targetKey === items[0].key) {
      setActiveKey(items[1].key);
    } else if (activeKey === targetKey) {
      setActiveKey(items[0].key);
    }
    setItems(prev => prev.filter(item => item.key !== targetKey));
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      handleAddNewTab();
    } else {
      handleRemoveTab(targetKey);
    }
  };
  useEffect(() => {
    onSearchTextChange(debounceText);
  }, [debounceText]);

  return (
    <Tabs
      type='editable-card'
      className='sale-container w-full'
      tabBarExtraContent={{
        left: (
          <div className='mr-4 flex items-center gap-x-2'>
            <Button
              type='text'
              icon={
                <Link to={'/'} className='text-white'>
                  <ArrowLeftOutlined />
                </Link>
              }
            ></Button>
            <Input.Search
              className='w-full'
              placeholder='Tìm kiếm sản phẩm'
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              allowClear
            />
          </div>
        ),
        right: (
          <Space className='ml-4'>
            {/* <Tooltip title='Test'>
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
            </Tooltip> */}
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

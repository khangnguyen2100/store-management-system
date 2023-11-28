import { Checkbox, Collapse, Input, Radio, Select } from 'antd';
import { CollapseProps } from 'antd/lib';
import clsx from 'clsx';
import { useState } from 'react';
import { BiSolidRightArrow } from 'react-icons/bi';
import { enqueueSnackbar } from 'notistack';
import { useSWRConfig } from 'swr';
import { RightOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

import { DeleteAPI, patchAPI, postAPI } from 'src/api/config';
import { CategoryProp } from 'src/constants/types/category';
import { BrandProps } from 'src/constants/types/brand';
import { getIdCh } from 'src/utils/common';

import PickTimeFilter from './PickTimeFilter/PickTimeFilter';
import ChangeModal from './ChangeModal';

type OptionProps = {
  label: string;
  value: string;
  item?: any;
};
type FilterData = {
  [key: string]: string | string[];
};

export type MyFilterProps = {
  name: string;
  title: string;
  type: 'text' | 'radio' | 'checkbox' | 'select' | 'pick-time' | 'list';
  options?: OptionProps[];
  apiURL?: string;
};
type Props = {
  title: string;
  filters: MyFilterProps[];
  // eslint-disable-next-line no-unused-vars
  onFilterChange: (filters: FilterData) => void;
};
type IFilterItem = {
  item: MyFilterProps;
  onFilterChange: (name: string, value: string | string[]) => void;
};

const MyFilters = (props: Props) => {
  const { mutate } = useSWRConfig();
  const { title = 'title', filters, onFilterChange } = props;
  const [filtersData, setFiltersData] = useState<FilterData>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<
    CategoryProp | BrandProps | null
  >(null);
  const [modalType, setModalType] = useState('');
  const [modalFor, setModalFor] = useState('');
  const [apiURL, setAPIURL] = useState('');
  const handleFilterChange = (name: string, value: string | string[]) => {
    const newFiltersData = {
      ...filtersData,
      [name]: value,
    };
    setFiltersData(newFiltersData);
    onFilterChange(newFiltersData);
  };
  const FilterItem = ({ item, onFilterChange }: IFilterItem) => {
    const { type, options, name, apiURL, title } = item;
    const renderInput = () => {
      if (type === 'text') {
        return (
          <Input
            size='small'
            placeholder='Tìm kiếm'
            name={name}
            onChange={e => onFilterChange(name, e.target.value)}
          />
        );
      }
      if (type === 'checkbox') {
        return (
          <Checkbox.Group
            className='flex flex-col gap-2'
            name={name}
            onChange={value => onFilterChange(name, value as string[])}
          >
            {options?.map((option, i) => (
              <Checkbox value={option.value} key={i}>
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
      }
      if (type === 'radio') {
        return (
          <Radio.Group
            size='small'
            className='flex flex-col gap-2'
            name={name}
            onChange={e => onFilterChange(name, e.target.value)}
          >
            <>
              {options?.map((option, i) => (
                <Radio value={option.value} key={i}>
                  {option.label}
                </Radio>
              ))}
            </>
          </Radio.Group>
        );
      }
      if (type === 'select') {
        return (
          <Select
            placeholder='Chọn'
            size='small'
            className='ant-custom-select w-full'
            options={options?.map(option => ({
              ...option,
              value: option.value,
              label: (
                <div className='group flex w-full justify-between'>
                  {option.label}
                  <i
                    className='fa-regular fa-pencil !invisible h-full cursor-pointer p-1 text-base hover:bg-[#e6f8ec] group-hover:!visible'
                    onClick={e => {
                      e.stopPropagation();
                      setModalType('edit');
                      setEditingItem(option.item);
                      setAPIURL(apiURL as string);
                      handleOpenModal(title);
                    }}
                  ></i>
                </div>
              ),
            }))}
            allowClear
            onClear={() => {
              console.log('cleared');
              onFilterChange(name, 'clearSelect');
            }}
            suffixIcon={<></>}
            onSelect={value => onFilterChange(name, value as string)}
          />
        );
      }
      if (type === 'pick-time') {
        return <PickTimeFilter onFilterChange={onFilterChange} name={name} />;
      }
    };
    return <div className='ml-2 w-full overflow-hidden'>{renderInput()}</div>;
  };

  const panelStyle: React.CSSProperties = {
    marginBottom: 16,
    background: '#FAFAFA',
    borderRadius: 4,
    border: '1px solid #f0f0f0',
  };

  const getExtraIcon = (filter: MyFilterProps) => {
    if (filter.type === 'select')
      return (
        <>
          <i
            className='fa-regular fa-plus text-md rounded-full p-1 text-sm hover:bg-[#e6f8ec]'
            onClick={e => {
              e.stopPropagation();
              handleOpenModal(filter.title);
              filter.apiURL && setAPIURL(filter.apiURL);
              setModalType('add');
            }}
          ></i>
        </>
      );
  };
  const items: CollapseProps['items'] = filters.map((filter, i) => {
    return {
      key: i + 1,
      label: filter.title,
      children: (
        <FilterItem item={filter} onFilterChange={handleFilterChange} />
      ),
      style: panelStyle,
      extra: getExtraIcon(filter),
    };
  });

  //Form interact
  const handleOpenModal = (type: string) => {
    setModalFor(type);
    setIsOpen(true);
  };
  const handleModalCancel = () => {
    setIsOpen(false);
  };
  const handleModalOk = async (values: any) => {
    try {
      if (modalType === 'add') {
        await postAPI(`${apiURL}?idCh=${getIdCh()}`, values);
        setIsOpen(false);
        enqueueSnackbar('Thêm thành công', { variant: 'success' });
        mutate(`${apiURL}?idCh=${getIdCh()}`);
      }
      if (modalType === 'edit') {
        await patchAPI(`${apiURL}/${values.id}?idCh=${getIdCh()}`, values);
        setIsOpen(false);
        enqueueSnackbar('Thêm thành công', { variant: 'success' });
        mutate(`${apiURL}?idCh=${getIdCh()}`);
      }
    } catch (error) {
      console.log('error:', error);
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
    }
  };
  const handleDelete = async (values: any) => {
    try {
      await DeleteAPI(`${apiURL}/${values.id}?idCh=${getIdCh()}`);
      await mutate(`${apiURL}?idCh=${getIdCh()}`);
      setIsOpen(false);
      enqueueSnackbar('Xóa thành công', { variant: 'success' });
    } catch (error) {
      console.log('error:', error);
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
    }
  };
  return (
    <div className='w-full max-w-[234px] shrink-0'>
      <h3 className='mb-6 block text-xl font-bold text-typo-1'>{title}</h3>
      <Collapse
        className='filters-container flex w-full flex-col bg-transparent'
        items={items}
        // defaultActiveKey={items.map(item => item.key) as string[]}
        bordered={false}
        expandIcon={({ isActive }) => (
          <BiSolidRightArrow
            className={clsx(isActive && 'rotate-90', 'transition-sm')}
          />
        )}
      />
      <ChangeModal
        isOpen={isOpen}
        onSuccess={handleModalOk}
        onCancel={handleModalCancel}
        modalFor={modalFor}
        modalType={modalType}
        editingItem={editingItem}
        onDelete={handleDelete}
      ></ChangeModal>
    </div>
  );
};

export default MyFilters;

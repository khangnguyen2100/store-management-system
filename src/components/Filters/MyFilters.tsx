import { Checkbox, Collapse, Input, Radio, Select } from 'antd';
import { CollapseProps } from 'antd/lib';
import clsx from 'clsx';
import { useState } from 'react';
import { BiSolidRightArrow } from 'react-icons/bi';
import { enqueueSnackbar } from 'notistack';
import { mutate } from 'swr';

import { postAPI } from 'src/api/config';

import PickTimeFilter from './PickTimeFilter/PickTimeFilter';
import ListFilter from './ListFilter';
import AddModal from './AddModal';

type OptionProps = {
  label: string;
  value: string;
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
          className='w-full'
          options={options}
          onChange={value => onFilterChange(name, value as string)}
        />
      );
    }
    if (type === 'pick-time') {
      return <PickTimeFilter onFilterChange={onFilterChange} name={name} />;
    }
    if (type === 'list') {
      return <ListFilter apiURL={apiURL} forField={title}></ListFilter>;
    }
  };
  return <div className='ml-2 w-full overflow-hidden'>{renderInput()}</div>;
};

const MyFilters = (props: Props) => {
  const { title = 'title', filters, onFilterChange } = props;
  const [filtersData, setFiltersData] = useState<FilterData>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<MyFilterProps | null>(
    null,
  );
  const handleFilterChange = (name: string, value: string | string[]) => {
    const newFiltersData = {
      ...filtersData,
      [name]: value,
    };
    setFiltersData(newFiltersData);
    onFilterChange(newFiltersData);
  };

  const panelStyle: React.CSSProperties = {
    marginBottom: 16,
    background: '#FAFAFA',
    borderRadius: 4,
    border: '1px solid #f0f0f0',
  };
  const handleAddModalOpen = (filter: MyFilterProps) => {
    setCurrentFilter(filter);
    setIsOpen(true);
  };

  const handleModalOk = async (values: any) => {
    try {
      const { apiUrl, ...newItem } = values;
      await postAPI(apiUrl as string, newItem);
      setIsOpen(false);
      enqueueSnackbar('Thêm thành công', { variant: 'success' });
    } catch (error) {
      console.log('error:', error);
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
    }
  };
  const handleModalCancel = () => {
    setIsOpen(false);
  };
  const getExtraIcon = (filter: MyFilterProps) => {
    if (filter.type === 'list')
      return (
        <>
          <i
            className='fa-regular fa-plus text-md rounded-full p-1 hover:bg-[#e6f8ec]'
            onClick={e => {
              e.stopPropagation();
              handleAddModalOpen(filter);
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
        <FilterItem item={filter} onFilterChange={handleFilterChange} key={i} />
      ),
      style: panelStyle,
      extra: getExtraIcon(filter),
    };
  });

  return (
    <div className='w-full max-w-[234px] shrink-0'>
      <h3 className='mb-6 block text-xl font-bold text-typo-1'>{title}</h3>
      <Collapse
        className='filters-container flex w-full flex-col bg-transparent'
        items={items}
        defaultActiveKey={items.map(item => item.key) as string[]}
        bordered={false}
        expandIcon={({ isActive }) => (
          <BiSolidRightArrow
            className={clsx(isActive && 'rotate-90', 'transition-sm')}
          />
        )}
      />
      <AddModal
        isOpen={isOpen}
        onSuccess={handleModalOk}
        onCancel={handleModalCancel}
        modalFor={`${currentFilter?.title}`}
        apiUrl={`${currentFilter?.apiURL}`}
      ></AddModal>
    </div>
  );
};

export default MyFilters;

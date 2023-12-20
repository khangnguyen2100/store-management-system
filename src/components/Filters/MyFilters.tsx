import { Checkbox, Collapse, Input, Radio, Select } from 'antd';
import { CollapseProps } from 'antd/lib';
import clsx from 'clsx';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { BiSolidRightArrow } from 'react-icons/bi';
import useSWR, { useSWRConfig } from 'swr';

import { DeleteAPI, patchAPI, postAPI } from 'src/api/config';
import { BrandProps } from 'src/constants/types/brand';
import { CategoryProp } from 'src/constants/types/category';
import { SupplierProps } from 'src/constants/types/supplier';
import { ProductFilter } from 'src/pages/Products';
import { getIdCh } from 'src/utils/common';

import ChangeModal from './ChangeModal';

type OptionProps = {
  label: string;
  value: string;
  item?: any;
};

export type MyFilterProps = {
  name: keyof ProductFilter;
  title: string;
  type: 'text' | 'radio' | 'checkbox' | 'select' | 'pick-time' | 'list';
  options?: OptionProps[];
  apiURL?: string;
  loading?: boolean;
};
type Props = {
  title: string;
  filters: ProductFilter;
  onFilterChange: (filters: ProductFilter) => void;
};
type IFilterItem = {
  filters: ProductFilter;
  item: MyFilterProps;
  onFilterChange: (name: keyof ProductFilter, value: string | string[]) => void;
  loading?: boolean;
};

const MyFilters = (props: Props) => {
  const idCh = getIdCh();
  const { title = 'title', onFilterChange, filters } = props;
  const {
    data: brandData,
    mutate: brandMutate,
    isLoading: brandLoading,
  } = useSWR(`/api/thuong-hieu?idCh=${idCh}`);
  const {
    data: categoryData,
    mutate: categoryMutate,
    isLoading: categoryLoading,
  } = useSWR(`/api/danh-muc-san-pham?idCh=${idCh}`);
  const {
    data: supplierData,
    mutate: supplierMutate,
    isLoading: supplierLoading,
  } = useSWR(`/api/nha-cung-cap?idCh=${idCh}`);
  const filtersProps: MyFilterProps[] = [
    {
      title: 'Tìm tên sản phẩm',
      type: 'text',
      name: 'keyword',
    },
    {
      title: 'Tình trạng hàng hóa',
      type: 'radio',
      name: 'tinhTrang',
      options: [
        { label: 'Còn hàng', value: '2' },
        { label: 'Hết hàng', value: '1' },
        { label: 'Tất cả', value: '3' },
      ],
    },
    {
      title: 'Thương hiệu',
      type: 'select',
      name: 'th',
      apiURL: '/api/thuong-hieu',
      options:
        !brandLoading &&
        brandData.data?.map((item: CategoryProp) => {
          return {
            value: item.id,
            label: item.ten,
            item: item,
          };
        }),
      loading: brandLoading,
    },
    {
      title: 'Danh mục',
      type: 'select',
      name: 'dm',
      options:
        !categoryLoading &&
        categoryData.data?.map((item: CategoryProp) => {
          return {
            value: item.id,
            label: item.ten,
            item: item,
          };
        }),
      apiURL: '/api/danh-muc-san-pham',
      loading: categoryLoading,
    },
    {
      title: 'Nhà cung cấp',
      type: 'select',
      name: 'ncc',
      options:
        !supplierLoading &&
        supplierData.data?.map((item: SupplierProps) => {
          return {
            value: item.id,
            label: item.ten,
            item: item,
          };
        }),
      apiURL: '/api/nha-cung-cap',
      loading: supplierLoading,
    },
  ];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<
    CategoryProp | BrandProps | null
  >(null);
  const [modalType, setModalType] = useState('');
  const [modalFor, setModalFor] = useState('');
  const [apiURL, setAPIURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFilterChange = (
    name: keyof ProductFilter,
    value: string | string[],
  ) => {
    const newFiltersData = {
      ...filters,
      [name]: value,
    } as ProductFilter;
    onFilterChange(newFiltersData);
  };
  const FilterItem = ({
    filters,
    item,
    onFilterChange,
    loading,
  }: IFilterItem) => {
    const { type, options, name, apiURL, title } = item;
    const renderInput = () => {
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
            value={filters[name]}
            onChange={e => onFilterChange(name, e.target.value)}
          >
            <>
              {options &&
                options?.map((option, i) => (
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
            placeholder={`Chọn ${title}`}
            size='small'
            value={filters[name] || null}
            loading={loading}
            className='ant-custom-select w-full'
            options={
              options &&
              options?.map(option => ({
                ...option,
                value: option.value,
                label: (
                  <div className='group flex w-full justify-between'>
                    <p className='max-w-[80%]  overflow-hidden text-ellipsis'>
                      {option.label}
                    </p>
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
              }))
            }
            allowClear
            onClear={() => {
              onFilterChange(name, '');
            }}
            onSelect={value => onFilterChange(name, value as string)}
          />
        );
      }
      // if (type === 'pick-time') {
      //   return <PickTimeFilter onFilterChange={onFilterChange} name={name} />;
      // }
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
  const items: CollapseProps['items'] = filtersProps.map((filter, i) => {
    return {
      key: i + 1,
      label: filter.title,
      children: (
        <>
          {filter.type === 'text' ? (
            <Input
              size='small'
              placeholder='Tìm kiếm'
              name={filter.name}
              allowClear
              value={filters[filter.name]}
              onChange={e => handleFilterChange(filter.name, e.target.value)}
            />
          ) : (
            <FilterItem
              filters={filters}
              item={filter}
              onFilterChange={handleFilterChange}
              loading={filter.loading}
            />
          )}
        </>
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
        setIsLoading(prev => !prev);
        await postAPI(`${apiURL}?idCh=${getIdCh()}`, values);
        setIsOpen(false);
        setIsLoading(prev => !prev);
        enqueueSnackbar('Thêm thành công', { variant: 'success' });
        handleMutateData(`${apiURL}?idCh=${idCh}`);
      }
      if (modalType === 'edit') {
        setIsLoading(prev => !prev);
        await patchAPI(`${apiURL}/${values.id}?idCh=${getIdCh()}`, values);
        setIsOpen(false);
        setIsLoading(prev => !prev);
        enqueueSnackbar('Sửa thành công', { variant: 'success' });
        handleMutateData(`${apiURL}?idCh=${idCh}`);
      }
    } catch (error) {
      console.log('error:', error);
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
    }
  };
  const handleDelete = async (values: any) => {
    try {
      setIsDeleting(prev => !prev);
      await DeleteAPI(`${apiURL}/${values.id}?idCh=${idCh}`);
      handleMutateData(`${apiURL}?idCh=${idCh}`);
      setIsOpen(false);
      enqueueSnackbar('Xóa thành công', { variant: 'success' });
      setIsDeleting(prev => !prev);
    } catch (error) {
      console.log('error:', error);
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
    }
  };
  const handleMutateData = (key: string) => {
    if (key === `/api/thuong-hieu?idCh=${idCh}`) brandMutate();
    if (key === `/api/danh-muc-san-pham?idCh=${idCh}`) categoryMutate();
    if (key === `/api/nha-cung-cap?idCh=${idCh}`) supplierMutate();
  };
  return (
    <div className='w-full max-w-[234px] shrink-0'>
      <h3 className='mb-6 block text-xl font-bold text-typo-1'>{title}</h3>
      <Collapse
        className='filters-container flex w-full flex-col bg-transparent'
        items={items}
        // eslint-disable-next-line react/prop-types
        defaultActiveKey={items.map(item => item.key) as string[]}
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
        isLoading={isLoading}
        isDeleting={isDeleting}
      ></ChangeModal>
    </div>
  );
};

export default MyFilters;

import { Checkbox, Collapse, Input, Radio, Select } from 'antd';
import { CollapseProps } from 'antd/lib';
import clsx from 'clsx';
import { BiSolidRightArrow } from 'react-icons/bi';

type OptionProps = {
  label: string;
  value: string;
};
export type FilterProps = {
  title: string;
  type: 'text' | 'radio' | 'checkbox' | 'select';
  options?: OptionProps[];
};
type Props = {
  title: string;
  filters: FilterProps[];
  // eslint-disable-next-line no-unused-vars
  onFilterChange: (newProducts: any[]) => void;
};

const FilterItem = (props: FilterProps) => {
  const { type, options } = props;

  const renderInput = () => {
    if (type === 'text') {
      return <Input size='small' placeholder='Tìm kiếm' />;
    }
    if (type === 'checkbox') {
      return (
        <Checkbox.Group className='flex flex-col gap-2'>
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
        <Radio.Group size='small' className='flex flex-col gap-2'>
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
        <Select size='small' className='w-full' options={options}></Select>
      );
    }
  };
  return <div className='ml-2 w-full overflow-hidden'>{renderInput()}</div>;
};
const Filters = (props: Props) => {
  const { title = 'title', filters } = props;
  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: '#fbfbfb',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    borderRadius: 8,
    border: 'none',
  };
  const items: CollapseProps['items'] = filters.map((filter, i) => {
    return {
      key: i + 1,
      label: filter.title,
      children: <FilterItem {...filter} />,
      style: panelStyle,
    };
  });

  return (
    <div className='w-full max-w-[234px] shrink-0'>
      <h3 className='mb-6 block text-xl font-bold text-typo-1'>{title}</h3>
      <Collapse
        className='flex w-full flex-col bg-transparent'
        items={items}
        defaultActiveKey={['1']}
        bordered={false}
        expandIcon={({ isActive }) => (
          <BiSolidRightArrow
            className={clsx(isActive && 'rotate-90', 'transition-sm')}
          />
        )}
      />
    </div>
  );
};

export default Filters;

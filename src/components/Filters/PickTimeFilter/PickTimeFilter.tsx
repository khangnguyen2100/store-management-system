import { DatePicker, Radio, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
type Props = {
  name: string;
  onFilterChange: (name: string, value: string | string[]) => void;
};

const PickTimeFilter = (props: Props) => {
  const { name, onFilterChange } = props;
  const [chooseTime, setChooseTime] = useState<'custom-time' | 'normal'>();
  const [normalDateValue, setNormalDateValue] = useState<string>();
  const [customDateValue, setCustomDateValue] = useState<any>();

  const handleRadioChange = (value: any) => {
    setChooseTime(value);
    if (value === 'normal') {
      onFilterChange(name, normalDateValue as string);
    } else {
      onFilterChange(name, customDateValue as string);
    }
  };

  const handleCustomTimeChange = (value: any) => {
    if (!value) {
      setCustomDateValue(undefined);
      return;
    }
    const [startDate, endDate] = value;
    setCustomDateValue({
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: dayjs(endDate).format('YYYY-MM-DD'),
    });
  };
  useEffect(() => {
    if (chooseTime === 'normal') {
      onFilterChange(name, normalDateValue as string);
    }
    if (chooseTime === 'custom-time') {
      onFilterChange(name, customDateValue as string);
    }
  }, [normalDateValue, customDateValue]);

  return (
    <div className='flex w-full flex-col gap-2'>
      <div className='flex items-center gap-x-2'>
        <Radio
          onChange={e => handleRadioChange(e.target.value)}
          value={'normal'}
          checked={chooseTime === 'normal'}
        ></Radio>
        <Select
          size='small'
          className='w-full'
          placeholder='Chọn'
          disabled={chooseTime !== 'normal'}
          onChange={value => setNormalDateValue(value)}
          options={[
            { label: 'Hôm nay', value: 'today' },
            { label: 'Hôm qua', value: 'tomorrow' },
            { label: '3 ngày qua', value: '3-days' },
            { label: '7 ngày qua', value: '7-days' },
            { label: '30 ngày qua', value: '30-days' },
          ]}
        />
      </div>
      <div className='flex items-center gap-x-2'>
        <Radio
          onChange={e => handleRadioChange(e.target.value)}
          value={'custom-time'}
          checked={chooseTime === 'custom-time'}
        ></Radio>
        <DatePicker.RangePicker
          size='small'
          name='custom-time'
          format={'DD/MM/YYYY'}
          onChange={value => handleCustomTimeChange(value)}
          disabled={chooseTime !== 'custom-time'}
        />
      </div>
    </div>
  );
};

export default PickTimeFilter;

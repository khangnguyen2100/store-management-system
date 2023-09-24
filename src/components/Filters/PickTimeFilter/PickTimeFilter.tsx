/* eslint-disable @typescript-eslint/no-explicit-any */
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
  };

  const handleCustomTimeChange = (value: any) => {
    const [startDate, endDate] = value;
    setCustomDateValue({
      startDate: dayjs(startDate).format('DD/MM/YYYY'),
      endDate: dayjs(endDate).format('DD/MM/YYYY'),
    });
  };
  useEffect(() => {
    if (chooseTime === 'normal') {
      onFilterChange(name, normalDateValue as string);
    }
    if (chooseTime === 'custom-time') {
      onFilterChange(name, customDateValue);
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
            {
              label: 'Theo ngày',
              options: [
                { label: 'Hôm nay', value: 'today' },
                { label: 'Hôm qua', value: 'tomorrow' },
              ],
            },
            {
              label: 'Theo tuần',
              options: [
                { label: 'Tuần này', value: 'this-week' },
                { label: 'Tuần trước', value: 'last-week' },
                { label: '7 ngày qua', value: '7-days' },
              ],
            },
            {
              label: 'Theo tháng',
              options: [
                { label: 'Tháng này', value: 'this-month' },
                { label: 'Tháng trước', value: 'last-month' },
                { label: '30 ngày qua', value: '30-days' },
              ],
            },
            {
              label: 'Theo quý',
              options: [
                { label: 'Quý này', value: 'this-quarter' },
                { label: 'Quý trước', value: 'last-quarter' },
              ],
            },
            {
              label: 'Theo năm',
              options: [
                { label: 'Năm này', value: 'this-year' },
                { label: 'Năm trước', value: 'last-year' },
              ],
            },
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

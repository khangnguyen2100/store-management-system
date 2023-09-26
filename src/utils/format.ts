import { valueType } from 'antd/es/statistic/utils';

const formatPrice = (price: string) => {
  const costPrice = parseFloat(price);
  const formatted = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(costPrice);
  return formatted;
};
const formatPriceInput = (value?: valueType) => {
  if (!value) return '';
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export { formatPrice, formatPriceInput };

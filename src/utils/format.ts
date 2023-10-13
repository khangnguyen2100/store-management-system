import { valueType } from 'antd/es/statistic/utils';

const formatPrice = (price: string | number, rounded?: boolean) => {
  let costPrice = parseFloat(price.toString());
  if (rounded) {
    costPrice = Math.round(costPrice);
  }

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

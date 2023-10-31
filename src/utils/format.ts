import { valueType } from 'antd/es/statistic/utils';

const formatPrice = (price: string | number, rounded?: boolean) => {
  let giaVon = parseFloat(price.toString());
  if (rounded) {
    giaVon = Math.round(giaVon);
  }

  const formatted = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(giaVon);
  return formatted;
};
const formatPriceInput = (value?: valueType) => {
  if (!value) return '';
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export { formatPrice, formatPriceInput };

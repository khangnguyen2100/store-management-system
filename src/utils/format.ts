const formatPrice = (price: string) => {
  const costPrice = parseFloat(price);
  const formatted = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(costPrice);
  return formatted;
};

export { formatPrice };

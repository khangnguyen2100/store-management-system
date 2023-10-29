import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

import { CartType } from 'src/constants/types/cart';
import { ProductProps } from 'src/constants/types/product';

function useCart(value: CartType[]) {
  const [cartList, setCartList] = useState<CartType[]>(value);

  const isCanIncrement = (cartItem: CartType) => {
    if (Number(cartItem.quantity) <= cartItem.quantity) {
      enqueueSnackbar('Số lượng sản phẩm không đủ', { variant: 'error' });
      return false;
    }
    return true;
  };
  const handleAddToCart = (product: ProductProps) => {
    const index = cartList.findIndex(item => item.id === product.id);
    if (index >= 0) {
      const check = isCanIncrement(cartList[index]);
      if (!check) return;
      setCartList(prev => {
        const newCartList = [...prev];
        newCartList[index].quantity += 1;
        return newCartList;
      });
    } else {
      setCartList(prev => {
        return [...prev, { ...product, quantity: 1 } as CartType];
      });
    }
  };
  const handleDelete = (id: string) => {
    setCartList(prev => prev.filter(item => item.id !== id));
  };

  const handleIncrementProduct = (cartId: string) => {
    const updatedData = cartList.map(item => {
      if (item.id === cartId) {
        const check = isCanIncrement(item);
        if (!check) return item;

        item.quantity++;
      }
      return item;
    });
    setCartList(updatedData);
  };
  const handleDecrementProduct = (cartId: string) => {
    const updatedData = cartList.map(item => {
      if (item.id === cartId) {
        if (item.quantity <= 1) {
          return item;
        }
        item.quantity--;
      }
      return item;
    });
    setCartList(updatedData);
  };

  const totalItems = cartList.reduce((acc, cur) => acc + cur.quantity, 0);
  const totalPrice = cartList.reduce(
    (acc, cur) => acc + Number(cur.sellPrice) * cur.quantity,
    0,
  );

  return {
    handleDecrementProduct,
    handleIncrementProduct,
    totalItems,
    totalPrice,
    cartList,
    handleAddToCart,
    handleDelete,
  };
}
export default useCart;

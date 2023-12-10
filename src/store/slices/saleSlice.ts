import { create } from 'zustand';

import { SaleState } from '../types/sale';

const useSaleSlice = create<SaleState>(set => ({
  searchText: '',
  reset: () => set({ searchText: '' }),
  onSearchTextChange: (searchText: string) => set({ searchText }),
}));
export default useSaleSlice;

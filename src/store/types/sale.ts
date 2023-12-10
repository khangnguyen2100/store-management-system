export interface SaleState {
  searchText: string;
  reset: () => void;
  onSearchTextChange: (searchText: string) => void;
}

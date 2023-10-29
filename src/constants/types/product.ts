export type ProductProps = {
  id: number;
  name: string;
  productCode: string;
  img?: string;
  costPrice: number;
  sellPrice: number;
  discount?: number;
  quantity: number;
  capacity?: number;
  weight?: number;
  isShowing?: boolean;
  idStore: number;
  idBrand: number;
  idCategory: number;
  idSupplier: number;
  idType: number;
};

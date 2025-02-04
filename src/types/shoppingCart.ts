export type TCartItem = {
  productId?: string;
  quantity: number;
};

export type TCartItemData = {
  productId?: string;
  productName: string;
  imgUrl: string;
  price: number;
  salePrice?: number;
  quantity: number;
};

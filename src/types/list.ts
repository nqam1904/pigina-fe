export type TListSort = {
  sortName: "id" | "salePrice" | "name";
  sortType: "asc" | "desc";
};

export type TPageStatus =
  | "pageLoading"
  | "filterLoading"
  | "filledProductList"
  | "filterHasNoProduct"
  | "categoryHasNoProduct";

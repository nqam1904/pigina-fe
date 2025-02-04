import { NameValue, OptionSetType, PageType } from "@prisma/client";
import { DateTime } from "next-auth/providers/kakao";

export type TProductCard = {
  id?: string;
  name: string;
  isAvailable?: boolean;
  specialFeatures: string[];
  price: number;
  salePrice: number;
  images: string[];
  url: string;
  staticWidth?: boolean;
  isFlex?: boolean;
  keySeach?: string;
  isQuickView?: boolean;
  onQuickView?: (data: any) => void;
  specs?: {
    specGroupID: string;
    specValues: string[];
  }[];
};

export type TDealCard = TProductCard & {
  dealDate: Date;
  salePrice: number;
};

export type TSlide = {
  id: string;
  url: string;
  alt: string;
  title: string;
  desc: string;
  buttonText: string;
  order: number;
  link: string;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type TBlogCard = {
  title: string;
  imgUrl: string;
  url: string;
  shortText: string;
};

type TSubCategory = {
  name: string;
  url: string;
  subCategories?: {
    name: string;
    url: string;
  }[];
};

export type TCategory = {
  name: string;
  iconUrl: string;
  iconSize: [number, number];
  url: string;
  subCategories?: TSubCategory[];
};

export type TOptionSet = {
  id: string;
  name: string;
  options: NameValue[];
  type: OptionSetType;
};

export type TSingleOption = {
  optionSetID: string;
  name: string;
  value: string;
};

export type TSpecGroup = {
  id: string;
  title: string;
  specs: string[];
};

export type TSingleSpec = {
  specGroupID: string;
  value: string;
};

export type TAddPageVisit = {
  pageType: PageType;
  pagePath?: string;
  productID?: string;
  deviceResolution?: string;
};

export type TAddSlideHome = {
  url: string;
  alt: string;
  title: string;
  buttonText: string;
  desc: string;
  order: number;
  productID: string;
};

export type TSlideSmall = {
  id: string;
  url: string;
  alt: string;
  title: string;
  desc: string;
  order: number;
  link: string;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type TTopProducts = {
  id: string;
  title: string;
  productID: any[];
  linkAll: string;
  createdAt?: Date;
  updatedAt?: Date;
};

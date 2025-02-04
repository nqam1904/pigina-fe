import { EMenu } from "@/constants/enum";

type TListPath = {
  key: number;
  title: string;
  name: string;
  link: string;
};

const dashboardSideMenu: TListPath[] = [
  {
    key: 1,
    title: "Danh mục",
    name: EMenu.CATEGORIES,
    link: "/admin/categories",
  },
  {
    key: 2,
    title: "Thương hiệu",
    name: EMenu.BRANDS,
    link: "/admin/brands",
  },
  {
    key: 3,
    title: "Sản phẩm",
    name: EMenu.PRODUCTS,
    link: "/admin/products",
  },
  {
    key: 4,
    title: "Banners",
    name: EMenu.BANNERS,
    link: "/admin/banners",
  },
  {
    key: 5,
    title: "Slide nhỏ",
    name: EMenu.SLIDE_SMALL,
    link: "/admin/slide-small",
  },
  {
    key: 6,
    title: "Bài viết",
    name: EMenu.POSTS,
    link: "/admin/posts",
  },
  {
    key: 7,
    title: "Top sản phẩm",
    name: EMenu.TOP_PRODUCTS,
    link: "/admin/top-products",
  },
  {
    key: 8,
    title: "Tài khoản",
    name: EMenu.USERS,
    link: "/admin/users",
  },
  {
    key: 9,
    title: "Cài đặt",
    name: EMenu.SETTINGS,
    link: "/admin/settings",
  },
];

const listPath: TListPath[] = [
  {
    key: 1,
    title: "Danh mục",
    name: EMenu.HOME,
    link: "/admin/categories",
  },
  {
    key: 2,
    title: "Thương hiệu",
    name: EMenu.BRANDS,
    link: "/admin/brands",
  },
  {
    key: 3,
    title: "Sản phẩm",
    name: EMenu.CATEGORIES,
    link: "/admin/products",
  },

  {
    key: 4,
    title: "Banners",
    name: EMenu.BANNERS,
    link: "/admin/banners",
  },
  {
    key: 5,
    title: "Slide nhỏ",
    name: EMenu.SLIDE_SMALL,
    link: "/admin/slide-small",
  },
  {
    key: 6,
    title: "Bài viết",
    name: EMenu.POSTS,
    link: "/admin/posts",
  },
  {
    key: 7,
    title: "Top sản phẩm",
    name: EMenu.TOP_PRODUCTS,
    link: "/admin/top-products",
  },
  {
    key: 8,
    title: "Tài khoản",
    name: EMenu.USERS,
    link: "/admin/users",
  },
  {
    key: 9,
    title: "Cài đặt",
    name: EMenu.SETTINGS,
    link: "/admin/settings",
  },
];
export { dashboardSideMenu, listPath };

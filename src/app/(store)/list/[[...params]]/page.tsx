"use client";
import styles from "./list.module.scss";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ProductCard from "@/components/store/common/productCard";
import DropDownList from "@/components/UI/dropDown";

import { getList } from "@/actions/list/listServices";
import NoItem from "@/components/store/listPage/noItem";
import QuickView from "@/components/store/listPage/quickview";
import Button from "@/components/UI/button";
import { SK_Box } from "@/components/UI/skeleton";
import { sortDropdownData } from "@/data/uiElementsData";
import useIsMobile from "@/hooks/useIsMobile";
import useIsTablet from "@/hooks/useIsTablet";
import { TProductCard } from "@/types/common";
import { TListSort, TPageStatus } from "@/types/list";
import {
  TBrand,
  TFilterBrands,
  TFilters,
  TListItem,
  TProductPath,
} from "@/types/product";

const defaultFilters: TFilters = {
  stockStatus: "all",
  priceMinMaxLimitation: [0, 0],
  priceMinMax: [0, 0],
};

const sortData: TListSort[] = [
  { sortName: "id", sortType: "desc" },
  { sortName: "id", sortType: "asc" },
  { sortName: "salePrice", sortType: "desc" },
  { sortName: "salePrice", sortType: "asc" },
  { sortName: "name", sortType: "asc" },
];

const ListPage = () => {
  const router = useRouter();
  const { params } = useParams<{ params: string[] }>();
  const pathName = usePathname();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const [productList, setProductList] = useState<TListItem[]>([]);
  const [subCategories, setSubCategories] = useState<TProductPath[]>([]);
  const [sortIndex, setSortIndex] = useState(2);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filters, setFilters] = useState<TFilters>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<TFilters>({
    ...defaultFilters,
    priceMinMax: [...defaultFilters.priceMinMax],
  });
  const [isListLoading, setIsListLoading] = useState(true);
  const [dataQuickView, setDataQuickView] = useState<TProductCard | null>(null);

  const handleSortChange = (newIndex: number) => {
    setSortIndex(newIndex);
  };

  const getPageHeader = () => {
    const pageName = params[params.length - 1].split("-");
    pageName.forEach((word, index) => {
      pageName[index] = word[0].toUpperCase() + word.slice(1);
    });

    return pageName.join(" ");
  };

  const getLink = (array: string[], index: number) => {
    let link = "/list";
    for (let i = 0; i <= index; i++) {
      link += "/" + array[i];
    }
    return link;
  };

  const defineFilterChangeStatus = () => {
    if (appliedFilters.stockStatus !== filters.stockStatus) return false;

    if (
      JSON.stringify(appliedFilters.priceMinMax) !==
      JSON.stringify(filters.priceMinMax)
    )
      return false;

    return true;
  };
  let isFilterChanged: boolean = defineFilterChangeStatus();

  const handleApplyFilter = () => {
    const newFilter: TFilters = {
      priceMinMax: [...filters.priceMinMax],
      stockStatus: filters.stockStatus,
      priceMinMaxLimitation: [...filters.priceMinMaxLimitation],
    };
    setIsFilterApplied(true);
    setAppliedFilters(newFilter);
  };

  const handleResetFilters = () => {
    const newBrands: TFilterBrands[] = [];

    const newFilter: TFilters = {
      priceMinMax: [...filters.priceMinMaxLimitation],
      stockStatus: "all",
      priceMinMaxLimitation: [...filters.priceMinMaxLimitation],
    };
    setIsFilterApplied(false);
    setAppliedFilters(newFilter);
  };

  const getPageStatus = (): TPageStatus => {
    if (isListLoading) {
      if (isFilterApplied) return "filterLoading";
      return "pageLoading";
    }
    if (productList.length > 0) return "filledProductList";

    if (isFilterApplied) return "filterHasNoProduct";

    return "categoryHasNoProduct";
  };
  const currentPageStatus: TPageStatus = getPageStatus();

  const pageStatusJSX = {
    pageLoading: (
      <div className={styles.sklList}>{SKL_Product().map((skl) => skl)}</div>
    ),
    filterLoading: (
      <div className={styles.sklList}>{SKL_Product().map((skl) => skl)}</div>
    ),
    filledProductList: (
      <div className={styles.listContainer}>
        {productList.map((product) => (
          <ProductCard
            key={product.id}
            images={[product.images[0], product.images[1]]}
            name={product.name}
            price={product.price}
            isAvailable={product.isAvailable}
            salePrice={product.salePrice ?? 0}
            specialFeatures={product.specialFeatures}
            url={"/product/" + product.id}
            specs={product.specs}
            isQuickView
            onQuickView={setDataQuickView}
          />
        ))}
      </div>
    ),
    categoryHasNoProduct: <NoItem pageHeader={getPageHeader()} />,
    filterHasNoProduct: (
      <div className={styles.noItemContainer}>
        <span> Không tìm thấy sản phẩm!</span>
        <Button text="Reset Filters" onClick={handleResetFilters} />
      </div>
    ),
  }[currentPageStatus];

  useEffect(() => {
    const getProductsList = async () => {
      setIsListLoading(true);
      setDataQuickView(null);
      const response: any = await getList(
        pathName,
        sortData[sortIndex],
        appliedFilters,
      );

      const sortProduct = response.products.sort(
        (a: TListItem, b: TListItem) => {
          if (a.isAvailable !== b.isAvailable) {
            return a.isAvailable ? -1 : 1;
          }
        },
      );

      if (isFilterApplied) {
        setFilters(appliedFilters);
        setProductList(sortProduct);
        setIsListLoading(false);
      } else {
        const filtersFromDB = getFiltersFromProductList(sortProduct);
        setFilters(filtersFromDB);
        setSubCategories(response.subCategories);
        setProductList(sortProduct);
        setIsListLoading(false);
      }
    };

    getProductsList();
  }, [router, pathName, sortIndex, appliedFilters, isFilterApplied]);

  useEffect(() => {
    if (productList.length > 0) {
      const firstProduct = productList[0];
      const productCard: TProductCard = {
        id: firstProduct.id,
        images: [firstProduct.images[0], firstProduct.images[1]],
        name: firstProduct.name,
        price: firstProduct.price,
        isAvailable: firstProduct.isAvailable,
        salePrice: firstProduct.salePrice ?? 0,
        specialFeatures: firstProduct.specialFeatures,
        url: "/product/" + firstProduct.id,
        specs: firstProduct.specs,
      };
      setDataQuickView(productCard);
    } else {
      setDataQuickView(null);
    }
  }, [productList]);

  return (
    <div className={styles.listPage}>
      <div className={styles.header}>
        <h1>{getPageHeader()}</h1>
        <div className={styles.links}>
          <Link href={"/"}>Trang chủ</Link>
          {params.map((item, index) => {
            return (
              <Link key={index} href={getLink(params, index)}>
                {item[0].toUpperCase() + item.slice(1)}
              </Link>
            );
          })}
        </div>
        {/* list category */}
        <div className={styles.childrenContainer}>
          {subCategories && subCategories.length > 0 ? (
            <div className={styles.children}>
              {subCategories.map((cat, index) => (
                <Link href={pathName + "/" + cat.url} key={index}>
                  {cat.label}
                </Link>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        {/* list category */}
      </div>
      <div className="storeContainer flexCol">
        <div className={styles.mobileFilter}>
          <DropDownList
            data={sortDropdownData}
            width="170px"
            selectedIndex={sortIndex}
            onChange={handleSortChange}
          />
        </div>
        <div className={styles.main}>
          <div className={styles.leftCol}>
            {dataQuickView && !isMobile && !isTablet ? (
              <QuickView {...dataQuickView} specs={dataQuickView.specs || []} />
            ) : null}
          </div>
          <div className={styles.rightCol}>
            <div className={styles.sortContainer}>
              {productList.length > 0 ? (
                <DropDownList
                  data={sortDropdownData}
                  width="170px"
                  selectedIndex={sortIndex}
                  onChange={handleSortChange}
                />
              ) : null}
            </div>
            {pageStatusJSX}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;

const SKL_Product = (): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  for (let i = 0; i < 6; i++) {
    nodes.push(
      <div className={styles.item} key={i}>
        <SK_Box width="100%" height="160px" />
        <SK_Box width="70%" height="26px" />
        <div>
          <SK_Box width="40%" height="12px" />
          <SK_Box width="40%" height="12px" />

          <SK_Box width="40%" height="12px" />
        </div>
        <SK_Box width="60%" height="20px" />
      </div>,
    );
  }
  return nodes;
};

// -------- GET UNIQUE BRAND LIST FROM PRODUCT LIST --------

const removeDuplicatedBrands = (list: TBrand[]) => {
  const newList: TBrand[] = [];
  list.forEach((listItem) => {
    const isFind = newList.findIndex((brand) => listItem.id === brand.id);
    if (isFind === -1)
      newList.push({
        id: listItem.id,
        name: listItem.name,
        order: listItem.order,
        url: listItem.url,
      });
  });
  return newList;
};
const addIsSelectedValueToBrands = (brandList: TBrand[]) => {
  return brandList.map((b) => ({
    ...b,
    isSelected: true,
  }));
};

// -------- GET PRICE LIMIT FROM PRODUCT LIST --------
const getPricesFromProducts = (productList: TListItem[]) => {
  return productList.map((product) => product?.salePrice || 0);
};
const findMinMax = (array: number[]) => {
  const minMax: [number, number] = [Math.min(...array), Math.max(...array)];
  return minMax;
};
const roundMaxMinPricesWithMargin = (minMax: [number, number]) => {
  const roundedPrices: [number, number] = [...minMax];
  roundedPrices[0] = Math.floor(roundedPrices[0] / 100) * 100;
  if (roundedPrices[1] % 100 !== 0) {
    roundedPrices[1] = Math.ceil(roundedPrices[1] / 100) * 100;
  }
  return roundedPrices;
};
const getPriceLimit = (productList: TListItem[]) => {
  const allProductsPrices: number[] = getPricesFromProducts(productList);
  const minMaxValues = findMinMax(allProductsPrices);
  const roundedPrices = roundMaxMinPricesWithMargin(minMaxValues);

  return roundedPrices;
};

// -------- GET INITIAL FILTERS --------
const getFiltersFromProductList = (productsList: TListItem[]) => {
  const newFilter: TFilters = {
    priceMinMax: getPriceLimit(productsList),
    priceMinMaxLimitation: getPriceLimit(productsList),
    stockStatus: "all",
  };
  return newFilter;
};

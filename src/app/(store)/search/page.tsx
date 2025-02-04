"use client";
import styles from "./search.module.scss";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllBrandsAction } from "@/actions/brands/brands";
import { findProductByNameAction } from "@/actions/product/product";
import ProductCard from "@/components/store/common/productCard";
import HCompanyLogo from "@/components/store/home/companyLogo";
import NoItem from "@/components/store/listPage/noItem";
import QuickView from "@/components/store/listPage/quickview";
import DropDownList from "@/components/UI/dropDown";
import { SK_Box } from "@/components/UI/skeleton";
import TagList from "@/components/UI/tagList";
import { sortDropdownData } from "@/data/uiElementsData";
import { TProductCard } from "@/types/common";
import { TListSort, TPageStatus } from "@/types/list";
import { TBrand, TListItem } from "@/types/product";
import { Product } from "@prisma/client";

const sortData: TListSort[] = [
  { sortName: "id", sortType: "desc" },
  { sortName: "id", sortType: "asc" },
  { sortName: "salePrice", sortType: "desc" },
  { sortName: "salePrice", sortType: "asc" },
  { sortName: "name", sortType: "asc" },
];
const SearchPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const router = useRouter();

  const [productList, setProductList] = useState<TListItem[]>([]);
  const [listTags, setListTags] = useState<string[]>([]);
  const [isListLoading, setIsListLoading] = useState(true);
  const [dataQuickView, setDataQuickView] = useState<TProductCard | null>(null);
  const [selectedTag, setSelectedTag] = useState("");
  const [brandList, setBrandList] = useState<TBrand[]>([]);
  const [sortIndex, setSortIndex] = useState(2);

  const fetchProductList = async () => {
    setIsListLoading(true);
    try {
      if (search) {
        const response = await findProductByNameAction(
          search,
          search && !selectedTag
            ? search
            : search.toLocaleLowerCase() !== selectedTag.toLocaleLowerCase()
            ? ""
            : selectedTag,
          {
            specialFeatures: true,
            salePrice: true,
            keySearch: true,
            specs: true,
          },
          sortData[sortIndex],
        );
        if (search.toLocaleLowerCase() !== selectedTag.toLocaleLowerCase()) {
          setSelectedTag("");
        }
        if (response.res) {
          const uniqListTags = new Set<string>();
          response.res.forEach((item: Product) => {
            item.keySearch.forEach((tag: string) => {
              uniqListTags.add(tag);
            });
          });
          setListTags(Array.from(uniqListTags));
          setProductList(response.res);
        } else {
          setProductList([]);
          setListTags([]);
          setSelectedTag("");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsListLoading(false);
    }
  };

  const getBrand = async () => {
    try {
      const response = await getAllBrandsAction();
      if (!response.error) {
        setBrandList(response.res.slice(0, 9));
      } else {
        setBrandList([]);
      }
    } catch (error) {
      setBrandList([]);
    }
  };

  const getPageStatus = (): TPageStatus => {
    if (isListLoading) {
      return "pageLoading";
    }
    if (productList.length > 0) return "filledProductList";

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
    categoryHasNoProduct: <NoItem pageHeader={search || ""} isSearchPage />,
    filterHasNoProduct: (
      <div className={styles.noItemContainer}>
        <span> Không tìm thấy sản phẩm!</span>
        {/* <Button text="Reset Filters" onClick={handleResetFilters} /> */}
      </div>
    ),
  }[currentPageStatus];

  const onChange = (tag: string) => {
    setSelectedTag(tag);
    router.push(`/search?q=${tag.toLocaleLowerCase()}`);
  };

  const renderBrand = () => {
    return brandList.length > 0
      ? brandList.map((brand) => {
          return (
            <div key={brand.id} className={styles.itemBrand}>
              <HCompanyLogo
                image={brand.image || ""}
                name={brand.name}
                url={`/list/laptop/${brand.name.toLocaleLowerCase()}`}
                onClick={() => {
                  router.replace(`/search?q=${brand.name.toLocaleLowerCase()}`);
                  setSelectedTag("");
                }}
                isSearchPage
              />
            </div>
          );
        })
      : null;
  };

  const handleSortChange = (newIndex: number) => {
    setSortIndex(newIndex);
  };

  // Fetch product list
  useEffect(() => {
    fetchProductList();
  }, [search, sortIndex]);

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

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <div className={styles.searchPage}>
      <div className={styles.header}>
        <div className={styles.brandList}>{renderBrand()}</div>
        <h1>Tìm kiếm</h1>
        <div className={styles.headerText}>
          <p>
            {productList.length} Kết quả tìm kiếm theo: <span>{search}</span>
          </p>
        </div>
        <div className={styles.listTag}>
          {/* <span>Từ khóa:</span> */}
          {productList.length > 0 ? (
            <TagList
              data={listTags}
              selectedId={selectedTag}
              onChange={onChange}
            />
          ) : null}
        </div>
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
            {dataQuickView ? (
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

export default SearchPage;

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

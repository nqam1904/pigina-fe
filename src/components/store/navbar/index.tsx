"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.scss";

import { findProductByNameAction } from "@/actions/product/product";
import { TProductListItem } from "@/types/product";
import { formatCurrency } from "@/utils/formatNumber";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AddVisit from "../common/addVisit";
import NavBarCategory from "./navCategory";
import NavSearch from "./navSearch";

const StoreNavBar = () => {
  const route = useRouter();
  const [hideNavbar, setHideNavbar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<TProductListItem[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.trim() !== "") {
        const response = await findProductByNameAction(query, query, {
          specialFeatures: true,
          salePrice: true,
        });
        if (response.res) {
          setSearchResults(response.res);
        } else {
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    }, 500),
    [],
  );

  useEffect(() => {
    debouncedSearch(searchText);
  }, [searchText, debouncedSearch]);

  useEffect(() => {
    let prevPositionY = 0;
    if (typeof window !== "undefined") prevPositionY = window.scrollY;
    const handleScroll = () => {
      //---handle auto hiding navbar
      if (typeof window !== "undefined") {
        prevPositionY < window.scrollY && window.scrollY > 100
          ? setHideNavbar(true)
          : setHideNavbar(false);
        prevPositionY = window.scrollY;
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const onBlurInput = () => {
    setTimeout(() => {
      setSearchText("");
      setSearchResults([]);
    }, 200);
  };

  const onHandleClick = (id: string) => {
    route.push(`/product/${id}`);
    setSearchResults([]);
    setSearchText("");
  };

  const handleCloseSearch = (visibility: boolean) => {
    setIsSearchVisible(visibility);
    !visibility
      ? document.documentElement.classList.add("noScroll")
      : document.documentElement.classList.remove("noScroll");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    route.push(`/search?q=${searchText}`);
    setSearchResults([]);
    setSearchText("");
  };

  return (
    <nav className={`${styles.navbar} ${hideNavbar && styles.hideNavbar}`}>
      <section>
        <div className={`${styles.top} storeContainer`}>
          <Link href={"/"}>
            <Image
              alt="Logo"
              src={"/images/logo.png"}
              width={173}
              height={64}
              quality={100}
              priority
              className={styles.logo}
            />
          </Link>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div className={styles.search}>
              <input
                type="text"
                value={searchText}
                className={styles.searchInput}
                placeholder="Nhập từ khóa tìm kiếm..."
                onChange={(e) => setSearchText(e.target.value)}
                onBlur={onBlurInput}
              />
              <Image
                src={"/images/icons/searchIcon.svg"}
                width={16}
                height={16}
                alt="Search"
                className={styles.searchIcon}
              />
              {searchResults.length > 0 ? (
                <div className={styles.searchWrapper}>
                  <div className={styles.headerSearch}>
                    <h2>Kết quả tìm kiếm</h2>
                    <span>{searchResults.length}</span>
                  </div>

                  <div className={styles.searchResult}>
                    {searchResults.map((product, index) => {
                      return (
                        <div
                          key={index}
                          className={styles.searchItem}
                          onClick={() => onHandleClick(product.id)}
                        >
                          <div className={styles.wrapperResult}>
                            <Image
                              className={styles.imageResult}
                              src={product?.images?.[0] || ""}
                              alt={product?.name || ""}
                              width={64}
                              height={64}
                              objectFit="cover"
                              quality={100}
                              priority
                            />
                            <div className={styles.leftResult}>
                              <h2>{product?.name}</h2>
                              <div className={styles.priceResult}>
                                <span className={styles.salePriceResult}>
                                  {formatCurrency(product?.salePrice)}
                                </span>
                                <span className={styles.priceFull}>
                                  {formatCurrency(product?.price)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </form>
          <div className={styles.rightButtons}>
            <Image
              src={"/images/icons/searchIcon.svg"}
              alt="ic_search"
              width={24}
              height={24}
              onClick={() => setIsSearchVisible(false)}
            />

            <NavSearch
              isVisible={isSearchVisible}
              searchText={searchText}
              onBlurInput={onBlurInput}
              onChange={(e) => setSearchText(e.target.value)}
              handleOnClose={() => handleCloseSearch(true)}
              searchResults={searchResults}
              clearSearchText={() => setSearchText("")}
              onClickItem={onHandleClick}
            />
            {/* <NavBarProfile /> */}
            {/* <NavBarFavorite /> */}
            {/* <NavBarShopping /> */}
          </div>
        </div>
      </section>
      <section>
        <div className={`storeContainer ${styles.ribbon}`}>
          <div className={styles.left}>
            <NavBarCategory isNavbarVisible={!hideNavbar} />
            <hr />
            {/* <ul className={styles.topCategories}>
              <li>
                <Link href={"/list/pc-laptops/computer"}>Computer</Link>
              </li>
              <li>
                <Link href={"/list/pc-laptops/laptops"}>Laptop</Link>
              </li>
              <li>
                <Link href={"/list/smartphones"}>Mobile</Link>
              </li>

              <li>
                <Link href={"/list/video-games"}>Gaming</Link>
              </li>
              <li>
                <Link href={"/list/tablets"}>Tablet</Link>
              </li>
              <li>
                <Link href={"/list/watches"}>Phụ kiện</Link>
              </li>
            </ul> */}
          </div>
          {/* <div className={styles.right}>
            <ul>
              <li className={styles.pcConfig}>
                <Link href={""}>PC Configuration</Link>
              </li>
              <li className={styles.deal}>
                <Link href={""}>
                  <Image
                    src={"/images/icons/discountIcon.svg"}
                    alt="Top Deals"
                    width={18}
                    height={18}
                  />
                  Top Deals
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
      </section>
      <AddVisit />
    </nav>
  );
};

export default StoreNavBar;

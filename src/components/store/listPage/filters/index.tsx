"use client";
import styles from "./filters.module.scss";

import { CloseIcon } from "@/components/icons/svgIcons";
import Button from "@/components/UI/button";
import CheckBox from "@/components/UI/checkBox";
import PriceSlider from "@/components/UI/priceSlider";
import { SK_Box } from "@/components/UI/skeleton";
import useIsMobile from "@/hooks/useIsMobile";
import { TPageStatus } from "@/types/list";
import { TFilters, TListItem } from "@/types/product";

interface IProps {
  showFilters: boolean;
  filters: TFilters;
  isFilterChanged: boolean;
  pageStatus: TPageStatus;
  productList: TListItem[];
  onToggleWindow: (value: boolean) => void;
  onFilterChange: (value: TFilters) => void;
  onBrandChange: (value: number) => void;
  onApplyFilter: () => void;
}

const Filters = ({
  showFilters,
  filters,
  isFilterChanged,
  pageStatus,
  productList = [],
  onToggleWindow,
  onFilterChange,
  onBrandChange,
  onApplyFilter,
}: IProps) => {
  const isMobile = useIsMobile();

  const applyFilter = () => {
    isMobile && onToggleWindow(false);
    onApplyFilter();

  }
  return (
    <div
      className={`${styles.filtersContainer} 
                  ${showFilters ? styles.showMobileFilters : ""}`}
    >
      <div
        className={styles.background}
        onClick={() => onToggleWindow(false)}
      />

      <div className={styles.filtersWindow}>
        <div className={styles.header}>
          <h2>Sắp xếp</h2>
          <button onClick={() => onToggleWindow(false)}>
            <CloseIcon width={12} />
          </button>
        </div>
        <div className={styles.eachFilter}>
          <div className={styles.header}>
            <h3>Khả dụng</h3>
          </div>
          <div className={styles.body}>
            <CheckBox
              text="Tất cả"
              onClick={() => onFilterChange({ ...filters, stockStatus: "all" })}
              isChecked={filters.stockStatus === "all"}
            />
            <CheckBox
              text="Có hàng"
              onClick={() =>
                onFilterChange({ ...filters, stockStatus: "inStock" })
              }
              isChecked={filters.stockStatus === "inStock"}
            />
            <CheckBox
              text="Hết hàng"
              onClick={() =>
                onFilterChange({ ...filters, stockStatus: "outStock" })
              }
              isChecked={filters.stockStatus === "outStock"}
            />
          </div>
        </div>
        <div className={styles.eachFilter}>
          <div className={styles.header}>
            <h3>Giá</h3>
          </div>
          <div className={styles.body}>
            <PriceSlider
              sliderValues={filters.priceMinMax}
              minMaxLimit={filters.priceMinMaxLimitation}
              pageStatus={pageStatus}
              onChange={(value) =>
                onFilterChange({ ...filters, priceMinMax: [...value] })
              }
            />
          </div>
        </div>
        <div className={styles.eachFilter}>
          <div className={styles.header}>
            <h3>Hãng</h3>
          </div>
          <div className={styles.body}>
            {pageStatus === "pageLoading" ? (
              <div className={styles.loadingBrands}>
                <SK_Box width="100%" height="20px" />
                <SK_Box width="100%" height="20px" />
                <SK_Box width="100%" height="20px" />
                <SK_Box width="100%" height="20px" />
                <SK_Box width="100%" height="20px" />
              </div>
            ) : pageStatus === "categoryHasNoProduct" ? (
              <div className={styles.optionsList} />
            ) : (
              // <div className={styles.optionsList}>
              //   {filters.brands.map((brand, index) => (
              //     <CheckBox
              //       key={brand.id}
              //       isChecked={brand.isSelected}
              //       text={brand.name}
              //       onClick={() => onBrandChange(index)}
              //     />
              //   ))}
                  // </div>
                  null
            )}
          </div>
        </div>
        <div className={styles.apply}>
          <Button
            text="Tìm kiếm"
            disabled={isFilterChanged || productList.length === 0}
            onClick={applyFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;

import { ArrowIcon, CloseIcon } from "@/components/icons/svgIcons";
import { TProductListItem } from "@/types/product";
import { formatCurrency } from "@/utils/formatNumber";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEventHandler } from "react";
import styles from "./styles.module.scss";

interface IProps {
  isVisible: boolean;
  searchText: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlurInput: () => void;
  handleOnClose: () => void;
  searchResults: TProductListItem[];
  clearSearchText: () => void;
  onClickItem: (id: string) => void;
}

export default function NavSearch({
  isVisible = false,
  searchText = "",
  searchResults = [],
  handleOnClose,
  onChange,
  clearSearchText,
  onClickItem,
}: IProps) {
  const route = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    route.push(`/search?q=${searchText}`);
    handleOnClose?.();
  };
  const renderInput = () => {
    return (
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <div className={styles.search}>
          <Image
            src={"/images/icons/searchIcon.svg"}
            width={16}
            height={16}
            alt="ic_search"
          />
          <input
            autoFocus
            type="text"
            value={searchText}
            className={styles.searchInput}
            placeholder="Nhập từ khóa tìm kiếm..."
            onChange={onChange}
          />
          {searchText.length > 0 && (
            <div className={styles.closeIc} onClick={clearSearchText}>
              <CloseIcon width={12} />
            </div>
          )}
        </div>
      </form>
    );
  };
  const onHandleClickItem = (id: string) => {
    onClickItem?.(id);
    handleOnClose?.();
  };

  if (isVisible) return null;

  return (
    <div className={`${styles.container} ${!isVisible && styles.hideWindow}`}>
      <div className={styles.background}>
        {/* search component */}
        <div className={styles.searchWindow}>
          <div className={styles.wrapperSearch}>
            <button onClick={handleOnClose}>
              <ArrowIcon width={12} strokeWidth={1} />
            </button>
            {renderInput()}
          </div>
          {searchResults.length > 0 ? (
            <div className={styles.searchResult}>
              {searchResults.map((product, index) => {
                return (
                  <div
                    key={index}
                    className={styles.searchItem}
                    onClick={() => onHandleClickItem(product.id)}
                    style={{
                      borderBottom:
                        index === searchResults.length - 1
                          ? "none"
                          : "1px solid #e8e8e8",
                    }}
                  >
                    <div className={styles.wrapperResutl}>
                      <Image
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
          ) : null}
        </div>
      </div>
    </div>
  );
}

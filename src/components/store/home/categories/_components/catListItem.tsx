import styles from "./catListItem.module.scss";

import Link from "next/link";

import { TGroupJSON } from "@/types/categories";
import { Image } from "antd";

const CategoryListItem = ({ categoryData }: { categoryData: TGroupJSON }) => {
  const { categories, group } = { ...categoryData };
  return (
    <li className={styles.categoryItem}>
      <Link href={"/list/" + group.url}>
        <div className={styles.iconWrapper}>
          <Image
            src={group?.iconUrl || ""}
            alt={group.name}
            width={28}
            height={28}
            preview={false}
          />
        </div>
        {group.name}
      </Link>
      <div>
        {categories && categories.length > 0 && (
          <Image
            className={styles.arrow}
            src={"images/icons/arrowIcon01.svg"}
            width={6}
            height={10}
            alt=""
            preview={false}
          />
        )}
      </div>
      {categories && categories.length > 0 && (
        <div className={styles.subCat}>
          <div className={styles.subCatTile}>Thương hiệu</div>
          {categories.map((item, index) => (
            <div className={styles.catGroup} key={index}>
              <Link href={"/list/" + group.url + "/" + item.category.url}>
                {item.category.name}
              </Link>

              {/* {item.subCategories && item.subCategories?.length > 0 ? (
                <div className={styles.children}>
                  {item.subCategories.map((link, index) => (
                    <Link
                      key={index}
                      href={
                        "/list/" +
                        group.url +
                        "/" +
                        item.category.url +
                        "/" +
                        link.url
                      }
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              ) : (
                ""
              )} */}
            </div>
          ))}
        </div>
      )}
    </li>
  );
};

export default CategoryListItem;

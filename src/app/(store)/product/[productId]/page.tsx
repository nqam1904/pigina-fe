"use client";
import styles from "./productPage.module.scss";

import {
  findProductByNameAction,
  getOneProductAction,
} from "@/actions/product/product";
import { MinusIcon } from "@/components/icons/svgIcons";
import ProductCard from "@/components/store/common/productCard";
import Gallery from "@/components/store/productPage/gallery";
import ProductBoard from "@/components/store/productPage/productBoard";
import { SK_Box } from "@/components/UI/skeleton";
import { TProductCard } from "@/types/common";
import { TProductPageInfo } from "@/types/product";
import { handleError } from "@/utils/logUtils";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
const ic_down =
  "https://res.cloudinary.com/dixay3mvg/image/upload/v1732100265/ic_down_dcwrgq.png";
const ProductPage = () => {
  const router = useRouter();
  const { productId } = useParams<{ productId: string[] }>();

  const [productKeySearch, setProductKeySearch] = useState<TProductCard[]>([]);

  const [productInfo, setProductInfo] = useState<
    TProductPageInfo | null | undefined
  >(null);

  const [showMore, setShowMore] = useState(false);

  if (!productId) router.push("/");

  useEffect(() => {
    const getProductKeySearch = async () => {
      try {
        const response = await findProductByNameAction(
          productInfo?.name,
          productInfo?.keySearch,
          { salePrice: true, isAvailable: true },
        );
        if (response.res) {
          const data = response.res.filter((x: any) => x.id !== productId);
          setProductKeySearch(data);
        } else {
          setProductKeySearch([]);
        }
      } catch (error) {
        console.log(error, "GET PRODUCT BY KEY SEARCH");
        setProductKeySearch([]);
      }
    };
    if (productInfo?.categoryID) {
      getProductKeySearch();
    }
  }, [productInfo]);

  useEffect(() => {
    const getProductFromDB = async () => {
      try {
        const response = await getOneProductAction(productId.toString());
        if (response && response.res) {
          setProductInfo(response.res);
        }
      } catch (e) {
        handleError(getProductFromDB, "getProductFromDB");
      } finally {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    getProductFromDB();
  }, [productId, router]);

  if (productInfo === undefined) return "";

  let fullPath = "";

  const generatePath = (index: number) => {
    if (productInfo) {
      fullPath += "/" + productInfo.path[index].url;
      return (
        <Link key={index} href={"/list" + fullPath}>
          {productInfo.path[index].name}
        </Link>
      );
    }
    return null;
  };
  return (
    <div className="storeContainer">
      <div className={styles.productPage}>
        <div className={styles.upperSection}>
          <div className={styles.leftSection}>
            <div className={styles.path}>
              {productInfo ? (
                <React.Fragment>
                  <Link href={"/"}>Trang chủ</Link>
                  {productInfo.path.map((item: any, index: number) =>
                    generatePath(index),
                  )}
                </React.Fragment>
              ) : (
                <SK_Box width="60%" height="15px" />
              )}
            </div>
            <Gallery images={productInfo?.images} />
          </div>
          <div className={styles.rightSection}>
            {productInfo ? (
              <ProductBoard
                boardData={{
                  id: productInfo.id,
                  isAvailable: productInfo.isAvailable,
                  defaultQuantity: 1,
                  name: productInfo.name,
                  price: productInfo.price,
                  salePrice: productInfo.salePrice || undefined,
                  shortDesc: productInfo.desc || "",
                  specialFeatures: productInfo.specialFeatures,
                  warrantyPeriod: productInfo.warrantyPeriod,
                  path: productInfo.path,
                  images: productInfo.images,
                }}
              />
            ) : (
              <div className={styles.boardLoading}>
                <SK_Box width="60%" height="14px" />
                <div className={styles.title}>
                  <SK_Box width="90%" height="16px" />
                </div>
                <div className={styles.desc}>
                  <SK_Box width="40%" height="14px" />
                  <SK_Box width="40%" height="14px" />
                  <SK_Box width="40%" height="14px" />
                </div>
                <div className={styles.price}>
                  <SK_Box width="30%" height="40px" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.lowerSection}>
          <div className={styles.leftSection}>
            {/* ----------------- SPECIFICATION SECTION ----------------- */}
            {productInfo && productInfo.specifications.length > 0 ? (
              <div className={styles.specification}>
                <h2>Thông tin kỹ thuật</h2>
                {productInfo ? (
                  productInfo.specifications?.map(
                    (spec: any, index: number) => (
                      <section key={index} className={styles.specGroup}>
                        <div className={styles.specGroupHead}>
                          <button>
                            <MinusIcon width={12} />
                            <MinusIcon width={12} />
                          </button>
                          <h3>{spec.groupName}</h3>
                        </div>
                        {spec.specs.map((row: any, index: number) => (
                          <div key={index} className={styles.row}>
                            <div className={styles.leftCol}>
                              <span>{row.name}</span>
                            </div>
                            <div className={styles.rightCol}>
                              <span key={index}>{row.value}</span>
                            </div>
                          </div>
                        ))}
                      </section>
                    ),
                  )
                ) : (
                  <>
                    <div className={styles.specLoading}>
                      <SK_Box width="200px" height="30px" />
                      <div className={styles.specs}>
                        <SK_Box width="10%" height="20px" />
                        <SK_Box width="40%" height="16px" />
                      </div>
                      <div className={styles.specs}>
                        <SK_Box width="10%" height="20px" />
                        <SK_Box width="40%" height="16px" />
                      </div>
                    </div>
                    <div className={styles.specLoading}>
                      <SK_Box width="200px" height="30px" />
                      <div className={styles.specs}>
                        <SK_Box width="10%" height="20px" />
                        <SK_Box width="40%" height="16px" />
                      </div>
                      <div className={styles.specs}>
                        <SK_Box width="10%" height="20px" />
                        <SK_Box width="40%" height="16px" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <></>
            )}

            {/* ----------------- DESCRIPTION ----------------- */}
            {productInfo?.desc ? (
              <div className={styles.description}>
                <h2>Mô tả sản phẩm</h2>
                <div className="ql-snow">
                  <div
                    className="ql-editor"
                    style={{
                      width: "100%",
                      maxHeight: showMore ? "80%" : "250px",
                      overflow: "hidden",
                      fontSize: "16px",
                    }}
                    dangerouslySetInnerHTML={{ __html: productInfo?.desc }}
                  />
                </div>
                {/* Button show more detail description */}
                {!showMore ? (
                  <div
                    className={styles.wrapperShowMore}
                    onClick={() => setShowMore(true)}
                  >
                    <div className={styles.btnShowMore}>
                      <span>Xem thêm nội dung</span>
                      <Image
                        src={ic_down}
                        alt="icon_down"
                        width={16}
                        height={16}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <SK_Box width="200px" height="30px" />
            )}

            {/* ----------------- USER REVIEWS ----------------- */}
            <div className={styles.userReviews}>
              <div className={styles.header}>
                <h2>Người dùng đánh giá</h2>
                <button>Đánh giá mới</button>
              </div>
              <div className={styles.reviewWrapper}>
                {/* <div className={styles.head}>
                  <div className={styles.user}>
                    <Image
                      src={"/images/images/defaultUser.png"}
                      alt=""
                      priority
                      width={32}
                      height={32}
                    />
                    <span>Nguyễn Văn A</span>
                  </div>
                  <span className={styles.isVerified}>Verified Purchase</span>
                  <div className={styles.dateAndLikeSection}>
                    <div className={styles.date}>30 November 2023</div>
                    <div className={styles.likeInteraction}>
                      <button className={styles.like}>
                        <LikeIcon width={16} />0
                      </button>
                      <button className={styles.dislike}>
                        <LikeIcon width={16} /> 0
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.body}>
                  <span>
                    {`Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Temporibus suscipit debitis reiciendis repellendus! Repellat rem beatae quo quis 
                    tenetur. Culpa quae ratione delectus id odit in nesciunt saepe pariatur vitae.`}
                  </span>
                </div> */}
                <div className={styles.emptyReview}>
                  <span>Hiện tại chưa có đánh giá!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {productKeySearch.length > 0 ? (
          <div className={styles.similarProductSection}>
            <h2>Sản phẩm tương tự</h2>
            <div className={styles.wrapperCardContainer}>
              <div className={styles.cardsContainer}>
                {productKeySearch.map((product, index) => (
                  <ProductCard
                    key={index}
                    images={product.images}
                    name={product.name}
                    price={product.price}
                    specialFeatures={product.specialFeatures}
                    url={product.id || ""}
                    salePrice={product.salePrice || 0}
                    staticWidth
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductPage;

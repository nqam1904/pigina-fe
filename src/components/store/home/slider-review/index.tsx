"use client";

import { dataReview } from "@/mocks";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import styles from "./styles.module.scss";

const SliderReview: React.FC = () => {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1500,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  const renderReview = () => {
    return dataReview.map((item, index) => {
      return (
        <div className={styles.item} key={index}>
          <div className={styles.headerItem}>
            <Image
              src={item.image}
              alt="avatar"
              width={40}
              height={40}
              className={styles.avatar}
            />
            <div className={styles.rightHeader}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.occupation}>{item.occupation}</span>
            </div>
            <Link className={styles.icFace} href={item.social} target="_blank">
              <Image
                src={"/images/ic_facebook.png"}
                alt="facebook"
                width={24}
                height={24}
              />
            </Link>
          </div>
          {/* testimonal */}
          <div className={styles.bodyItem}>
            <span className={styles.testimonial}>{item.review}</span>
          </div>
        </div>
      );
    });
  };
  return (
    <div className={styles.container}>
      <Slider {...settings}>{renderReview()}</Slider>
    </div>
  );
};

export default SliderReview;

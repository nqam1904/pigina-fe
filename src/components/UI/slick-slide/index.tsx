"use client";

import React from "react";
import Slider from "react-slick";
import styles from "./styles.module.scss";
type SlickSlideProps = {
  setting?: any;
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
};
const SliderReview: React.FC<SlickSlideProps> = ({ setting, children }) => {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
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
    ...setting,
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default SliderReview;

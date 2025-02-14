"use client";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import styles from "./styles.module.scss";

const SliderReview: React.FC = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "40px",
    slidesToShow: 3,
    speed: 500,
    dots: true,
    
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        <div className={styles.item}>
          <Image
            src="/images/2.jpg"
            alt="demo"
            width={100}
            height={100}
            style={{ borderRadius: "50%" }}
          />
          <h3 className={styles.name}>Michael John</h3>
          <p className={styles.occupation}>Cybersecurity Engineer</p>
          <p className="testimonial">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            dolore.
          </p>
        </div>
        <div className={styles.item}>
          <Image
            src="/images/3.jpg"
            alt="demo"
            width={100}
            height={100}
            style={{ borderRadius: "50%" }}
          />
          <h3 className={styles.name}>Mikayla Eddie</h3>
          <p className={styles.occupation}>Software Engineer</p>
          <p className="testimonial">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequatur, temporibus?
          </p>
        </div>
        <div className={styles.item}>
          <Image
            src="/images/4.jpg"
            width={100}
            alt="demo"
            height={100}
            style={{ borderRadius: "50%" }}
          />
          <h3 className={styles.name}>Eve Smith</h3>
          <p className={styles.occupation}>UI/UX Designer</p>
          <p className="testimonial">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod,
            beatae?
          </p>
        </div>
        <div className={styles.item}>
          <Image
            src="/images/5.jpg"
            width={100}
            height={100}
            alt="demo"
            style={{ borderRadius: "50%" }}
          />
          <h3 className={styles.name}>Luke Maxwell</h3>
          <p className={styles.occupation}>System Architect</p>
          <p className="testimonial">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse,
            tempore.
          </p>
        </div>
      </Slider>
    </div>
  );
};

export default SliderReview;

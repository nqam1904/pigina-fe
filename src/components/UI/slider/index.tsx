"use client";

import { ArrowIcon } from "@/components/icons/svgIcons";
import Image from "next/image";
import Link from "next/link";
import styles from "./slider.module.scss";

import { useEffect, useState } from "react";

type SliderProps = {
  data: any[];
};
const Slider: React.FC<SliderProps> = ({ data }) => {
  const [activeSlideNum, setActiveSlideNum] = useState(0);
  const touchPos = {
    start: 0,
    end: 0,
  };
  let isDragging = false;

  useEffect(() => {
    const autoSliding = setTimeout(() => {
      handleSliding(activeSlideNum + 1);
    }, 3000);

    return () => {
      clearInterval(autoSliding);
    };
  });

  const handleSliding = (slideNum: number) => {
    if (slideNum > activeSlideNum) {
      activeSlideNum === data.length - 1
        ? setActiveSlideNum(0)
        : setActiveSlideNum(slideNum);
    } else if (slideNum < activeSlideNum) {
      activeSlideNum === 0
        ? setActiveSlideNum(data.length - 1)
        : setActiveSlideNum(slideNum);
    }
  };

  function touchStart(event: React.TouchEvent) {
    isDragging = true;
    touchPos.start = event.touches[0].clientX;
  }
  function touchMove(event: React.TouchEvent) {
    if (isDragging) {
      touchPos.end = event.touches[0].clientX;
    }
  }

  const handleTouchEnd = () => {
    isDragging = false;
    if (touchPos.start !== touchPos.end && touchPos.end !== 0) {
      if (touchPos.start < touchPos.end) {
        handleSliding(activeSlideNum + 1);
      } else {
        handleSliding(activeSlideNum - 1);
      }
    }
  };

  function mouseStart(event: React.MouseEvent) {
    isDragging = true;
    touchPos.start = event.pageX;
  }
  function mouseMouse(event: React.MouseEvent) {
    if (isDragging) {
      touchPos.end = event.pageX;
    }
  }

  return (
    <div className={styles.homeSlider}>
      <div className={`${styles.btnContainer} ${styles.prevSlide}`}>
        <button onClick={() => handleSliding(activeSlideNum - 1)}>
          <ArrowIcon width={10} strokeWidth={1} />
        </button>
      </div>
      <div className={`${styles.btnContainer} ${styles.nextSlide}`}>
        <button onClick={() => handleSliding(activeSlideNum + 1)}>
          <ArrowIcon width={10} strokeWidth={1} />
        </button>
      </div>
      <div className={styles.slide}>
        {data.map((slide, index) => (
          <div
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={mouseStart}
            onMouseMove={mouseMouse}
            onMouseUp={handleTouchEnd}
            key={index}
            className={index === activeSlideNum ? styles.active : ""}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              sizes="(max-width:1080px)"
              priority
              draggable={false}
            />
            {slide ? (
              <div
                className={`${styles.slideData} ${
                  index === activeSlideNum && styles.active
                }`}
              >
                {/* <h2>{slide.title}</h2> */}
                {/* {slide.msg.desc && <span>{slide.msg.desc}</span>} */}
                {/* <Link href={slide.url}>{slide.msg.buttonText}</Link> */}
              </div>
            ) : null}
            {/* <span className={styles.timeBar} /> */}
          </div>
        ))}
      </div>
      <div className={styles.slideBtnWrapper}>
        {data.map((_, index) => (
          <div
            onClick={() => handleSliding(index)}
            key={index}
            className={index === activeSlideNum ? styles.active : ""}
          >
            <span />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;

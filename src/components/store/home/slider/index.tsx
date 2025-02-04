"use client";

import { getAllSildesAction } from "@/actions/slides/slide";
import { ArrowIcon } from "@/components/icons/svgIcons";
import { TSlide } from "@/types/common";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./homeSlider.module.scss";

const HomeSlider = () => {
  const [activeSlideNum, setActiveSlideNum] = useState(0);
  const [dataSlides, setDataSlides] = useState<TSlide[]>([]);

  const touchPos = {
    start: 0,
    end: 0,
  };
  let isDragging = false;

  useEffect(() => {
    const getSlidesBanner = async () => {
      try {
        const response = await getAllSildesAction();
        if (response.res) {
          setDataSlides(response.res);
        } else {
          console.log(response.error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSlidesBanner();
  }, []);

  useEffect(() => {
    const autoSliding = setTimeout(() => {
      handleSliding(activeSlideNum + 1);
    }, 5000);

    return () => {
      clearInterval(autoSliding);
    };
  });

  const handleSliding = (slideNum: number) => {
    if (slideNum > activeSlideNum) {
      activeSlideNum === dataSlides.length - 1
        ? setActiveSlideNum(0)
        : setActiveSlideNum(slideNum);
    } else if (slideNum < activeSlideNum) {
      activeSlideNum === 0
        ? setActiveSlideNum(dataSlides.length - 1)
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
        {dataSlides.length > 0 ? (
          dataSlides
            .sort((a: any, b: any) => a.order - b.order)
            .map((slide, index) => {
              return (
                <div
                  key={index}
                  onTouchStart={touchStart}
                  onTouchMove={touchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={mouseStart}
                  onMouseMove={mouseMouse}
                  onMouseUp={handleTouchEnd}
                  className={index === activeSlideNum ? styles.active : ""}
                >
                  <Image
                    src={slide.url}
                    alt={slide.alt || "banner"}
                    fill
                    sizes="(max-width:1080px)"
                    priority
                    draggable={false}
                    onClick={() => window.open(slide.link, "_blank")}
                  />
                </div>
              );
            })
        ) : (
          <div
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={mouseStart}
            onMouseMove={mouseMouse}
            onMouseUp={handleTouchEnd}
          >
            <Image
              src={"/images/home/default-banner.png"}
              alt="no-banner"
              fill
              sizes="(max-width:1080px)"
              priority
              draggable={false}
            />
          </div>
        )}
      </div>
      <div className={styles.slideBtnWrapper}>
        {dataSlides.map((slide, index) => (
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

export default HomeSlider;

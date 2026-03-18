"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";

import "swiper/css"; // Core Swiper styles
import "swiper/css/pagination";
import CheckIcon from "../public/assets/icons/Check.svg";
import Image from "next/image";

const CAROUSEL_ITEMS = 8;

function Carousel() {
  const t = useTranslations("pages.landlords");
  const data = Array.from({ length: CAROUSEL_ITEMS }, (_, i) => {
    const n = i + 1;
    return {
      title: t(`carousel${n}Title`),
      text: t(`carousel${n}Text`),
    };
  });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const canHoverFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const minDesktopWidth = window.matchMedia("(min-width: 640px)");

    const sync = () => {
      setIsDesktop(canHoverFinePointer.matches && minDesktopWidth.matches);
    };

    sync();

    const add = (mq: MediaQueryList) => {
      if (typeof mq.addEventListener === "function") mq.addEventListener("change", sync);
      else mq.addListener(sync);
    };
    const remove = (mq: MediaQueryList) => {
      if (typeof mq.removeEventListener === "function")
        mq.removeEventListener("change", sync);
      else mq.removeListener(sync);
    };

    add(canHoverFinePointer);
    add(minDesktopWidth);
    return () => {
      remove(canHoverFinePointer);
      remove(minDesktopWidth);
    };
  }, []);

  return (
    <>
      {!isDesktop && (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          spaceBetween={8} // Margin between boxes
          slidesPerView="auto" // Allows the display of partial boxes
          centeredSlides={false} // Aligns the first box to the left
          pagination={{ clickable: true }}
          // autoplay={true}
          // loop={true}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index} className="carousel-box ">
              <div className="flex flex-row items-center mb-[16px] ">
                <Image src={CheckIcon} alt="Check" />
                <h3 className="myCTA  ml-2">{item.title}</h3>
              </div>
              <p className="myP">{item.text}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {isDesktop && (
        <>
          <section className="why-kali-section px-[60px] ">
            <div className="why-kali-grid">
              {data.map((item, index) => (
                <div key={index} className="carousel-box-desk why-kali-item">
                  <Image src={CheckIcon} alt="Check" className="mt-2" />
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-[22px] font-semibold text-center leading-[90%]">
                      {item.title}
                    </h3>
                    <p className="text-[16px] text-center text-[#504E4B] pb-5">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Carousel;

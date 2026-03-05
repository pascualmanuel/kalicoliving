"use client";
import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
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
  const [cardWidth3Col, setCardWidth3Col] = useState(325); // Ancho para cards de 3 columnas
  const [cardWidth2Col, setCardWidth2Col] = useState(325); // Ancho para cards de 2 columnas (últimas 2 en layout medio)
  const [cardWidth2ColFull, setCardWidth2ColFull] = useState(325); // Ancho para cards de 2 columnas (todas en layout pequeño)
  const [cardWidth4Col, setCardWidth4Col] = useState(325); // Ancho para cards de 4 columnas
  const [cardHeight, setCardHeight] = useState(218);
  const [isMediumLayout, setIsMediumLayout] = useState(false); // Entre 1000px y 1280px
  const [isSmallLayout, setIsSmallLayout] = useState(false); // Entre 640px y 1000px
  const containerRef = useRef(null);
  const gap = 30; // Gap entre cards
  const padding = 60; // Padding horizontal del contenedor (30px cada lado)
  const baseWidth = 325; // Ancho base de referencia (1375px+)
  const baseHeight = 218; // Altura base de referencia

  // Function to calculate card width based on number of columns
  const calculateCardWidth = (containerWidth, columns) => {
    const totalGaps = gap * (columns - 1);
    const totalPadding = padding * 2;
    const calculatedWidth =
      (containerWidth - totalPadding - totalGaps) / columns;
    return Math.max(200, calculatedWidth); // Mínimo 200px para evitar cards muy pequeñas
  };

  // Function to update the state based on window width
  const updateMedia = useCallback(() => {
    const width = window.innerWidth;
    setIsDesktop(width >= 640);

    if (width >= 640 && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;

      // Detectar el rango pequeño (640px - 1000px)
      const isSmall = width >= 640 && width < 1000;
      setIsSmallLayout(isSmall);

      // Detectar si estamos en el rango medio (1000px - 1280px)
      const isMedium = width >= 1000 && width < 1280;
      setIsMediumLayout(isMedium);

      if (isSmall) {
        // Layout de 4 filas: 2-2-2-2 (todas las cards en 2 columnas)
        const width2ColFull = calculateCardWidth(containerWidth, 2);
        setCardWidth2ColFull(width2ColFull);

        // Calcular altura basada en el ancho de 2 columnas
        if (width2ColFull < baseWidth) {
          const ratio = baseWidth / width2ColFull;
          const calculatedHeight = baseHeight * Math.min(ratio, 1.4);
          setCardHeight(Math.max(baseHeight, calculatedHeight));
        } else {
          setCardHeight(baseHeight);
        }
      } else if (isMedium) {
        // Layout de 3 filas: 3-3-2
        const width3Col = calculateCardWidth(containerWidth, 3);
        const width2Col = calculateCardWidth(containerWidth, 2);
        setCardWidth3Col(width3Col);
        setCardWidth2Col(width2Col);

        // Calcular altura basada en el ancho más pequeño (3 columnas)
        if (width3Col < baseWidth) {
          const ratio = baseWidth / width3Col;
          const calculatedHeight = baseHeight * Math.min(ratio, 1.4);
          setCardHeight(Math.max(baseHeight, calculatedHeight));
        } else {
          setCardHeight(baseHeight);
        }
      } else {
        // Layout de 4 columnas (>= 1280px)
        const width4Col = calculateCardWidth(containerWidth, 4);
        setCardWidth4Col(width4Col);

        // Calcular altura dinámica proporcional al ancho
        if (width4Col < baseWidth) {
          const ratio = baseWidth / width4Col;
          const calculatedHeight = baseHeight * Math.min(ratio, 1.4);
          setCardHeight(Math.max(baseHeight, calculatedHeight));
        } else {
          setCardHeight(baseHeight);
        }
      }
    } else if (width >= 640) {
      // Fallback si aún no hay ref
      setCardWidth3Col(325);
      setCardWidth2Col(325);
      setCardWidth2ColFull(325);
      setCardWidth4Col(325);
      setCardHeight(218);
    }
  }, []);

  useEffect(() => {
    // Inicializar en el cliente
    if (typeof window !== "undefined") {
      updateMedia();
      window.addEventListener("resize", updateMedia);

      return () => {
        window.removeEventListener("resize", updateMedia);
      };
    }
  }, [updateMedia]);

  // ResizeObserver para detectar cambios en el contenedor cuando esté disponible
  useEffect(() => {
    const container = containerRef.current;
    if (typeof window !== "undefined" && container && isDesktop) {
      const resizeObserver = new ResizeObserver(() => {
        updateMedia();
      });

      resizeObserver.observe(container);

      // Recalcular inmediatamente cuando el contenedor esté disponible
      updateMedia();

      return () => {
        resizeObserver.unobserve(container);
      };
    }
  }, [isDesktop, updateMedia]);

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
          <div
            ref={containerRef}
            className="flex flex-row flex-wrap justify-between px-[60px] gap-[30px] center mx-auto "
          >
            {data.map((item, index) => {
              // Determinar el ancho según el layout y el índice
              let cardWidth;
              if (isSmallLayout) {
                // Entre 640px y 1000px: 2-2-2-2 (todas las cards en 2 columnas)
                cardWidth = cardWidth2ColFull;
              } else if (isMediumLayout) {
                // Entre 1000px y 1280px: 3-3-2
                if (index < 6) {
                  // Primeras 6 cards: 3 columnas
                  cardWidth = cardWidth3Col;
                } else {
                  // Últimas 2 cards: 2 columnas
                  cardWidth = cardWidth2Col;
                }
              } else {
                // >= 1280px: 4 columnas
                cardWidth = cardWidth4Col;
              }

              return (
                <div
                  key={index}
                  className="carousel-box-desk relative flex flex-col items-center justify-between pb-10"
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    flexBasis: `${cardWidth}px`,
                    flexGrow: 0,
                    flexShrink: 0,
                    minHeight: `${cardHeight}px`,
                  }}
                >
                  <Image src={CheckIcon} alt="Check" className="mt-2" />
                  <div className=" flex flex-col items-center justify-between gap-4">
                    <h3 className="text-[22px] font-semibold text-center leading-[90%]">
                      {item.title}
                    </h3>
                    <p className="text-[16px] text-center text-[#504E4B] pb-5">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Carousel;

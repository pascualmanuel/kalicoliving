"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Person1 from "../public/assets/images/community/person1.jpg";
import Person2 from "../public/assets/images/community/person2.jpg";
import Person3 from "../public/assets/images/community/person3.jpg";
import Person4 from "../public/assets/images/community/person4.jpg";
import Person5 from "../public/assets/images/community/person5.jpg";
import Person6 from "../public/assets/images/community/person6.jpg";
import NavigationIcon from "../public/assets/icons/navigation.svg";
import QuoiteIcon from "../public/assets/icons/quote.svg";
import StarsIcon from "../public/assets/icons/stars.svg";

interface PersonData {
  image: any;
  quote: string;
  name: string;
}

const LandlordsReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const people: PersonData[] = [
    {
      image: Person1,
      quote:
        "Siempre que tengo una pregunta, responden en minutos. Ese nivel de respuesta da una verdadera tranquilidad.",
      name: "Carles R.",
    },
    {
      image: Person2,
      quote:
        "Transformaron completamente mi apartamento. El diseño interior es hermoso y la propiedad se siente más valiosa que nunca.",
      name: "Marta L.",
    },
    {
      image: Person3,
      quote:
        "No he tenido que pensar en mi apartamento en meses. Todo funciona sin problemas y el dinero llega cada mes.",
      name: "Richard S.",
    },
    {
      image: Person4,
      quote:
        "Con Kali, siempre sé cuándo me pagan, el mismo día, cada mes. No hay ningún retraso.",
      name: "Judith M.",
    },
    {
      image: Person5,
      quote:
        "El equipo de Kali es confiable y digno de confianza. Los recomiendo encarecidamente.",
      name: "Luca A.",
    },
    {
      image: Person6,
      quote: "The people here changed my whole experience.",
      name: "Emma Davis",
    },
  ];

  const cardWidth = 335; // Ancho de cada card
  const gap = 24; // Gap entre cards

  // Calcula cuántas cards entran realmente en el viewport del carrusel
  useEffect(() => {
    const updateCardsPerView = () => {
      if (!viewportRef.current) return;

      const containerWidth = viewportRef.current.offsetWidth;
      const visibleCards = Math.max(
        1,
        Math.floor(containerWidth / (cardWidth + gap)),
      );

      setCardsPerView(visibleCards);

      const totalWidth = people.length * (cardWidth + gap);
      const maxTranslateValue = Math.max(0, totalWidth - containerWidth);
      setMaxTranslate(maxTranslateValue);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);

    return () => window.removeEventListener("resize", updateCardsPerView);
  }, [people.length]);

  const nextSlide = () => {
    const maxIndex = Math.max(0, people.length - cardsPerView);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const translateX = -(currentIndex * (cardWidth + gap));

  return (
    <div className="w-full relative">
      {/* Navigation Buttons - Top Right */}

      {/* Carousel Container */}
      <div ref={viewportRef} className="overflow-hidden w-full pl-5 md:pl-20">
        <div className="flex items-center justify-between sm:pb-[50px] sm:pt-[100px] pb-[30px] pt-[60px] mb-6 pr-4">
          <h2 className="text-[35px] sm:text-[40px] md:text-[56px] font-bold max-w-[350px] md:max-w-[550px] leading-[90%]">
            {/* Qué dicen nuestros propietarios{" "} */}
            Straight from our landlords
          </h2>
          <div className="sm:flex gap-2 mt-10 hidden ">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className=" rounded-full  transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <Image src={NavigationIcon} alt="Next" width={30} height={30} />
            </button>
            <button
              onClick={nextSlide}
              className="rounded-full  transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next"
              disabled={currentIndex >= people.length - cardsPerView}
            >
              <Image
                src={NavigationIcon}
                alt="Previous"
                width={30}
                height={30}
                className="rotate-180"
              />
            </button>
          </div>
        </div>
        <motion.div
          ref={carouselRef}
          className="flex gap-6 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -maxTranslate, right: 0 }}
          dragElastic={0.1}
          animate={{ x: translateX }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {people.map((person, index) => (
            <div
              key={index}
              className="relative w-[335px] h-[228px] rounded-[24px] overflow-hidden flex-shrink-0 bg-red "
            >
              {/* Content Overlay */}
              <div className="absolute inset-0 z--10 flex flex-col items-start justify-between p-6 ">
                <div className="flex flex-col items-start justify-start gap-2">
                  <div className="flex flex-row items-start justify-start gap-2">
                    <p className="text-white text-left text-[14px]">
                      {person.quote}
                    </p>
                    <Image
                      src={QuoiteIcon}
                      alt="Quote"
                      width={30}
                      height={30}
                    />
                  </div>
                  <Image
                    src={StarsIcon}
                    alt="Person"
                    className="mt-2"
                    width={70}
                    height={11}
                  />
                </div>
                <div className="flex flex-col items-start justify-start gap-2">
                  <h5 className="text-white text-left text-[24px] font-bold">
                    {person.name}
                  </h5>
                  {/* <p className="text-white text-left text-[16px]">
                    {person.role}
                  </p> */}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LandlordsReviews;

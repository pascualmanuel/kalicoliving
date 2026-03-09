"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import homeImage from "../../public/assets/images/home/hero-image-kali.webp";
import dividerSvg from "../../public/assets/icons/divider.svg";
import PopupButton from "@/components/PopupButton";
import homeCard1 from "../../public/assets/images/home/home-card-1.webp";
import homeCard2 from "../../public/assets/images/home/home-card-2.webp";
import homeCard3 from "../../public/assets/images/home/home-card-3.webp";
import homeCard4 from "../../public/assets/images/home/home-card-4.webp";
import brownDividerSvg from "../../public/assets/icons/brown-divider.svg";
import ticIcon from "../../public/assets/icons/tic-icon.svg";
import RoomsSection from "@/components/Rooms";
import Footer from "@/components/Footer";
import isoLogoWhite from "../../public/assets/logos/isowhite.svg";
export default function HomePageContent() {
  const t = useTranslations("pages.home");
  const cardsRef = useRef(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  // Siempre 2 líneas: partir por la coma para no depender del layout/fuentes en primera carga
  const titleLines = (() => {
    const text = t("title");
    const commaIndex = text.indexOf(",");
    if (commaIndex !== -1) {
      return [text.slice(0, commaIndex + 1).trim(), text.slice(commaIndex + 1).trim()];
    }
    // Fallback si no hay coma: primera palabra / resto
    const firstSpace = text.indexOf(" ");
    if (firstSpace !== -1) {
      return [text.slice(0, firstSpace), text.slice(firstSpace + 1)];
    }
    return [text];
  })();

  const { scrollYProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start start", "end start"],
  });

  // Texto entra desde debajo del viewport (80vh) y el scroll lo trae hasta su posición final
  const textY = useTransform(scrollYProgress, (v) => {
    if (v >= 0.4) return "0px";
    const t = v / 0.4;
    const vh = 80 * (1 - t);
    return `${vh}vh`;
  });

  // Scroll de la sección de cards: progress 0 = antes de ver la sección (top al borde inferior del viewport), 1 = sección saliendo
  const cardsScrollProgress = useScroll({
    target: cardsRef,
    offset: ["start end", "end start"],
  }).scrollYProgress;

  // Translate Y en % por card: entrando = escalonado hacia abajo (Card1 arriba), saliendo = al revés (Card4 arriba)
  const card1Y = useTransform(cardsScrollProgress, [0, 1], [16, -6]);
  const card2Y = useTransform(cardsScrollProgress, [0, 1], [30, -11]);
  const card3Y = useTransform(cardsScrollProgress, [0, 1], [44, -15]);
  const card4Y = useTransform(cardsScrollProgress, [0, 1], [58, -22]);

  // Variantes para la animación tipo cortina (sin cambiar opacidad)
  const curtainContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const curtainLine = {
    hidden: {
      y: "100%",
    },
    visible: {
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 1, 0.5, 1] as any, // power1.out equivalente
      },
    },
  };

  return (
    <main>
      <div className="relative h-screen min-h-[670px] md:min-h-[930px]  overflow-hidden flex flex-col items-center justify-center">
        <Image
          src={homeImage}
          alt="Home background"
          fill
          priority
          className="object-cover  object-[37%]  md:scale-[1.222] md:origin-top-left md:object-[-65px_-140px]"
        />

        <div className="relative z-10 mt-[-50px] overflow-hidden h-[36px]">
          <motion.div
            className="h-[36px] bg-[#FFF2E21A] backdrop-blur-[3.5px]
            border border-[#FFF2E266] flex items-center justify-center w-[240px] rounded-full overflow-hidden"
            variants={curtainLine}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-[18px] text-white text-center tracking-[-3%]">
              Coliving spaces in Madrid
            </h1>
          </motion.div>
        </div>

        <motion.h1
          className="relative z-10 text-[50px]  md:text-[100px] text-white leading-[111%]  md:leading-[111px] tracking-[-4%] font-bold 
          text-center md:max-w-[585px] max-w-[340px] overflow-hidden"
        >
          <motion.div
            variants={curtainContainer}
            initial="hidden"
            animate="visible"
          >
            {titleLines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span className="block" variants={curtainLine}>
                  {line || "\u00A0"}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </motion.h1>

        <Image
          src={dividerSvg}
          alt="divider"
          width={1512}
          height={193}
          className="absolute bottom-0 left-0 w-full pointer-events-none"
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-[80px] lg:mt-0">
        <h2 className="md:text-[64px] text-[40px] text-black title text-center max-w-[1005px]">
          {t("heroSubtitle1")}
          <br />
          <span className="recoleta text-red ">{t("heroSubtitle2")}</span>
        </h2>

        <p className="text-black text-center max-w-[280px] md:max-w-[430px] my-6 text-[20px]">
          {t("heroDescription")}
        </p>
        <PopupButton />
      </div>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5 md:px-20 py-12 md:pt-[120px]  mx-auto"
      >
        {/* Card 1 */}
        <motion.div
          className="flex flex-col items-center justify-center"
          style={{ y: useTransform(card1Y, (v) => `${v}%`) }}
        >
          <div className="w-full max-h-[360px] md:max-w-[310px] aspect-square rounded-xl overflow-hidden">
            <Image
              src={homeCard1}
              alt="Real community"
              width={310}
              height={310}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-black title text-center text-[24px] mt-4">
            {t("card1Title")}
          </h3>
          <p className="text-black text-center my-2 text-[16px]">
            {t("card1Description")}
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="flex flex-col items-center justify-center"
          style={{ y: useTransform(card2Y, (v) => `${v}%`) }}
        >
          <div className="w-full max-h-[360px] md:max-w-[310px] aspect-square rounded-xl overflow-hidden">
            <Image
              src={homeCard2}
              alt="Card 2"
              width={310}
              height={310}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-black title text-center text-[24px] mt-4">
              {t("card2Title")}
            </h3>
            <p className="text-black text-center my-2 text-[16px] tracking-[-4%]">
              {t("card2Description")}
            </p>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="flex flex-col items-center justify-center"
          style={{ y: useTransform(card3Y, (v) => `${v}%`) }}
        >
          <div className="w-full max-h-[360px] md:max-w-[310px] aspect-square rounded-xl overflow-hidden">
            <Image
              src={homeCard3}
              alt="Card 3"
              width={310}
              height={310}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-black title text-center text-[24px] mt-4">
            {t("card3Title")}
          </h3>
          <p className="text-black text-center my-2 text-[16px]">
            {t("card3Description")}
          </p>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          className="flex flex-col items-center justify-center"
          style={{ y: useTransform(card4Y, (v) => `${v}%`) }}
        >
          <div className="relative w-full max-h-[360px] md:max-w-[310px] aspect-square rounded-xl overflow-hidden">
            <Image
              src={homeCard4}
              alt="Card 4"
              width={310}
              height={310}
              className="w-full h-full object-cover"
            />
            <Image
              src={isoLogoWhite}
              alt="ISO logo"
              width={70}
              height={70}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] object-contain"
            />
          </div>
          <h3 className="text-black title text-center text-[24px] mt-4">
            {t("card4Title")}
          </h3>
          <p className="text-black text-center my-2 text-[16px]">
            {t("card4Description")}
          </p>
        </motion.div>
      </div>
      <div ref={videoSectionRef} className="relative h-[170vh] mt-[100px]">
        {/* Video Fixed Container */}
        <div className="sticky top-[100px] md:top-[8vh] w-full h-[650px] lg:h-[86vh] md:px-20 px-5 overflow-hidden">
          <div className="rounded-[20px] overflow-hidden h-full">
            <video
              src="/assets/videos/home-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Text Overlay - Entra desde abajo, siempre visible, sube hasta posición final */}
            <motion.div
              className="absolute bottom-[0px] md:top-[-150px] left-0 w-full h-full flex items-end md:items-center justify-center pointer-events-none"
              style={{ y: textY }}
            >
              <div className="flex flex-col lg:flex-row justify-between w-full px-10 md:px-[140px] pointer-events-auto">
                <div className="lg:w-1/2">
                  <h2 className="md:text-[64px] text-[40px] text-white title max-w-[675px]">
                    {t("videoTitle1")}
                    <br />{" "}
                    <span className="recoleta text-white">
                      {t("videoTitle2")}
                    </span>
                  </h2>
                </div>
                <div className="lg:w-1/2 max-w-[412px]">
                  <p className="text-white lg:my-2 my-5 text-[20px] leading-[130%]">
                    {t("videoDescription")}
                  </p>
                  <a href="#" className="group block w-fit">
                    <div className="lg:w-[250px] bg-white rounded-[12px] semi-bold text-center font-semibold text-lg px-4 py-2 text-black my-4 group-hover:bg-white-hover transition-colors">
                      {t("videoCta")}
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full md:px-20 sm:px-8 px-4  md:pt-[130px] pt-[60px]">
        <RoomsSection />
      </div>

      <Image
        src={brownDividerSvg}
        alt="divider"
        width={1512}
        height={193}
        className="w-full md:mt-[200px] mt-[100px]  mx-auto"
      />

      <div className="w-full md:px-20 px-4 bg-brown  md:mt-[-11%]">
        <h2 className="md:text-[64px] text-[45px] text-white title text-center ">
          {t("howItWorksTitle")}
        </h2>
        <p className="text-white text-center my-2 text-[20px] leading-[130%]">
          {t("howItWorksSubtitle")}
        </p>
        <div className="w-full">
          <div className="flex flex-col flex-wrap xl:flex-nowrap sm:flex-row items-center lg:items-start justify-between gap-7 mt-12 pb-[200px]">
            {/* Card 1 */}
            <div
              className="flex flex-col items-start p-6  xl:gap-[21px] sm:w-[46%] xl:w-[315px] h-[180px] sm:h-[200px] lg:h-[180px] xl:h-[226px] rounded-[20px] w-full justify-around"
              style={{ background: "rgba(255, 242, 226, 0.1)" }}
            >
              <h3 className="text-white title text-[18px] ">01</h3>
              <h4 className="text-white title text-[24px] font-semibold">
                {t("step1Title")}
              </h4>
              <p className="text-white text-[18px] ">{t("step1Description")}</p>
            </div>

            {/* Card 2 */}
            <div
              className="flex flex-col items-start p-6  xl:gap-[21px] sm:w-[46%] xl:w-[315px] h-[180px] sm:h-[200px] lg:h-[180px] xl:h-[226px] rounded-[20px] w-full justify-around"
              style={{ background: "rgba(255, 242, 226, 0.1)" }}
            >
              <h3 className="text-white text-[18px] ">02</h3>
              <h4 className="text-white title text-[24px] font-semibold">
                {t("step2Title")}
              </h4>
              <p className="text-white text-[18px] ">{t("step2Description")}</p>
            </div>

            {/* Card 3 */}
            <div
              className="flex flex-col items-start p-6  xl:gap-[21px] sm:w-[46%] xl:w-[315px] h-[180px] sm:h-[200px] lg:h-[180px] xl:h-[226px] rounded-[20px] w-full justify-around"
              style={{ background: "rgba(255, 242, 226, 0.1)" }}
            >
              <h3 className="text-white text-[18px] ">03</h3>
              <h4 className="text-white title text-[24px] font-semibold">
                {t("step3Title")}
              </h4>
              <p className="text-white text-[18px] ">{t("step3Description")}</p>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-start p-6  xl:gap-[21px] sm:w-[46%] xl:w-[315px] h-[180px] sm:h-[200px] lg:h-[180px] xl:h-[226px] rounded-[20px] w-full justify-around bg-white">
              <h3 className="text-black text-[18px] ">04</h3>
              <h4 className="text-black title text-[24px] font-semibold">
                {t("step4Title")}
              </h4>
              <p className="text-black text-[18px] leading-[130%]">
                {t("step4Description")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:px-20 px-4 md:py-[200px] py-[120px]">
        <h2 className="md:text-[64px] text-[45px] text-black title text-center ">
          {t("forYouTitle")}
        </h2>
        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col justify-between gap-4 mt-12">
            <div
              className="w-full lg:w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4"
              style={{ background: "rgba(153, 106, 83, 0.1)" }}
            >
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">
                {t("forYou1")}
              </p>
            </div>
            <div
              className="w-full lg:w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4"
              style={{ background: "rgba(153, 106, 83, 0.1)" }}
            >
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">
                {t("forYou2")}
              </p>
            </div>
            <div
              className="w-full lg:w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4"
              style={{ background: "rgba(153, 106, 83, 0.1)" }}
            >
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">
                {t("forYou3")}
              </p>
            </div>
            <div
              className="w-full lg:w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4"
              style={{ background: "rgba(153, 106, 83, 0.1)" }}
            >
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">
                {t("forYou4")}
              </p>
            </div>
            <div
              className="w-full lg:w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4"
              style={{ background: "rgba(153, 106, 83, 0.1)" }}
            >
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">
                {t("forYou5")}
              </p>
            </div>
            <div
              className="w-full lg:w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4"
              style={{ background: "rgba(153, 106, 83, 0.1)" }}
            >
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">
                {t("forYou6")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

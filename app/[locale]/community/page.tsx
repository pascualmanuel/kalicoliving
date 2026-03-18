"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { BASE_URL, getMetaDescription } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import People from "../../../public/assets/images/community/person1.jpg";
import People2 from "../../../public/assets/images/community/person2.jpg";
import People3 from "../../../public/assets/images/community/person3.jpg";
import People4 from "../../../public/assets/images/community/person4.jpg";
import People5 from "../../../public/assets/images/community/person5.jpg";
import People6 from "../../../public/assets/images/community/person6.jpg";
import IsoLogo from "../../../public/assets/logos/iso-logo.svg";
import dividerNotFilledSvg from "../../../public/assets/icons/divider-not-filled.svg";
// import dividerSvg from '../../../public/assets/icons/divider.svg';
import GalleryImage1 from "../../../public/assets/images/community/gallery-1.webp";
import GalleryImage2 from "../../../public/assets/images/community/gallery-2.webp";
import GalleryImage3 from "../../../public/assets/images/community/gallery-3.webp";
import GalleryImage4 from "../../../public/assets/images/community/gallery-4.webp";
import GalleryImage5 from "../../../public/assets/images/community/gallery-5.webp";
import CommunityCarousel from "../../../components/CommunityCarousel";
import GallerySection from "../../../components/GallerySection";
import Footer from "../../../components/Footer";
import ApplyToKaliPopup from "../../../components/ApplyToKaliPopup";
type TitleLine = { text: string; startWordIndex: number; endWordIndex: number };

export default function CommunityPage() {
  const t = useTranslations("pages.community");
  const locale = useLocale();
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleLines, setTitleLines] = useState<TitleLine[]>([]);
  const [isInView, setIsInView] = useState(false);
  const [hasSpread, setHasSpread] = useState(false);

  const title1WordCount = t("heroTitle1").split(" ").filter(Boolean).length;

  // Variantes para la animación tipo cortina (igual que home)
  const curtainContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };
  const curtainLine = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 1, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  const curtainLineLower = {
    hidden: { y: "calc(100% + 40px)" },
    visible: {
      y: 0,
      transition: { duration: 1, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  // Dividir el título en líneas con rangos de palabras (para aplicar recoleta a heroTitle2)
  useEffect(() => {
    const splitTextIntoLines = () => {
      if (!titleRef.current || titleRef.current.offsetWidth <= 0) return;
      const fullText = `${t("heroTitle1")} ${t("heroTitle2")}`.trim();
      const words = fullText.split(" ").filter(Boolean);
      if (words.length === 0) return;

      const lines: TitleLine[] = [];
      let currentLine = "";
      let lineStartIndex = 0;
      const tempEl = document.createElement("span");
      tempEl.style.visibility = "hidden";
      tempEl.style.position = "absolute";
      tempEl.style.whiteSpace = "nowrap";
      const computedStyle = window.getComputedStyle(titleRef.current);
      tempEl.style.fontSize = computedStyle.fontSize;
      tempEl.style.fontFamily = computedStyle.fontFamily;
      tempEl.style.fontWeight = computedStyle.fontWeight;
      tempEl.style.letterSpacing = computedStyle.letterSpacing;
      document.body.appendChild(tempEl);
      const maxWidth = titleRef.current.offsetWidth;

      words.forEach((word, index) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        tempEl.textContent = testLine;
        if (tempEl.offsetWidth > maxWidth && currentLine) {
          lines.push({
            text: currentLine,
            startWordIndex: lineStartIndex,
            endWordIndex: index - 1,
          });
          lineStartIndex = index;
          currentLine = word;
        } else {
          currentLine = testLine;
        }
        if (index === words.length - 1) {
          lines.push({
            text: currentLine,
            startWordIndex: lineStartIndex,
            endWordIndex: index,
          });
        }
      });
      document.body.removeChild(tempEl);
      setTitleLines(lines);
    };

    const timer = setTimeout(splitTextIntoLines, 100);
    window.addEventListener("resize", splitTextIntoLines);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", splitTextIntoLines);
    };
  }, [t]);

  // Detectar cuando el usuario ha scrolleado más del 60-70% dentro de la sección
  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return;

      const rect = galleryRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calcular la posición del top de la sección relativa al viewport
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Cuando el top de la sección está en el 30% superior del viewport
      // significa que ya hemos scrolleado más del 60-70% dentro de la sección
      // Ajusta este valor: más bajo (ej: 0.2) = se activa más tarde, más alto (ej: 0.4) = se activa más temprano
      const triggerPoint = windowHeight * 0.5; // 30% del viewport desde arriba

      // Se activa cuando el top de la sección está por encima del trigger point
      // y la sección aún está visible (no ha salido completamente por arriba)
      const shouldActivate =
        sectionTop < triggerPoint && sectionTop > -sectionHeight * 0.5;

      setIsInView(shouldActivate);
      if (shouldActivate) setHasSpread(true); // Una vez expandidas, no vuelven al centro
    };

    // Ejecutar al montar para verificar estado inicial
    handleScroll();

    // Escuchar eventos de scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  const [isBelowLg, setIsBelowLg] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isApplyPopupOpen, setIsApplyPopupOpen] = useState(false);

  useEffect(() => {
    const checkBreakpoints = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsBelowLg(w < 1024);
      setIsTablet(w >= 680 && w < 1024);
    };
    checkBreakpoints();
    window.addEventListener("resize", checkBreakpoints);
    return () => window.removeEventListener("resize", checkBreakpoints);
  }, []);

  // Posiciones finales para las imágenes cuando se esparcen (en píxeles desde el centro)
  // Desktop (>= 1024): distribución actual
  const galleryPositionsDesktop = [
    { x: "-180%", y: -200, rotate: -8 }, // Imagen 1 - Top left
    { x: "80%", y: -230, rotate: 5 }, // Imagen 2 - Top center-right
    { x: -200, y: -570, rotate: -5 }, // Imagen 3 - Bottom left
    { x: "-150%", y: 280, rotate: -27 }, // Imagen 4 - Bottom right
    { x: "76%", y: 280, rotate: -3 }, // Imagen 5 - Top right
  ];

  // Tablet (680px - 1024px): valores intermedios
  const galleryPositionsTablet = [
    { x: "-160%", y: -160, rotate: -7 },
    { x: "68%", y: -190, rotate: 5 },
    { x: -160, y: -460, rotate: -5 },
    { x: "-135%", y: 250, rotate: -22 },
    { x: "66%", y: 250, rotate: -3 },
  ];

  // Mobile (< 680px): más compacto para viewport pequeño (solo usado cuando !isMobile)
  const galleryPositionsCompact = [
    { x: "-135%", y: -110, rotate: -6 },
    { x: "55%", y: -140, rotate: 6 },
    { x: -120, y: -360, rotate: -4 },
    { x: "-120%", y: 210, rotate: -18 },
    { x: "55%", y: 210, rotate: -2 },
  ];

  // Mobile (< 768px): spread con más visibilidad de imágenes; CTA centrado al hacer spread
  const galleryPositionsMobile = [
    { x: "-145%", y: -70, rotate: -8 }, // arriba izquierda (tapa un poco el texto)
    { x: "48%", y: -95, rotate: 5 }, // arriba derecha
    { x: -150, y: -260, rotate: -5 }, // abajo izquierda
    { x: "-108%", y: 165, rotate: -22 }, // abajo centro-izq
    { x: "30%", y: 165, rotate: -3 }, // abajo derecha
  ];

  const galleryPositions = !isBelowLg
    ? galleryPositionsDesktop
    : isMobile
      ? galleryPositionsMobile
      : isTablet
        ? galleryPositionsTablet
        : galleryPositionsCompact;

  // Rotaciones base para los isologos (-15° a 15°), luego se rotan 180° adicionales
  // Desktop: 14 isologos
  const isoRotationsDesktop = [
    -15, -12, -9, -6, -3, 0, 3, 6, 9, 12, 15, -10, 8, -5,
  ];
  // Mobile: menos isologos (6)
  const isoRotationsMobile = [-12, -6, 0, 6, 12, -8];

  const isoRotations = isMobile ? isoRotationsMobile : isoRotationsDesktop;

  // Posiciones y tamaños para las personas alrededor del hero (3 izquierda, 3 derecha)
  // Flotando de forma orgánica, cerca del centro - DESKTOP
  const peoplePositionsDesktop = [
    // Izquierda - 3 personas
    {
      top: "-30px",
      left: "-139px",
      right: undefined,
      size: 97,
      offsetY: "-10px",
      duration: 4,
      delay: 0,
    },
    {
      top: "52px",
      left: "-282px",
      right: undefined,
      size: 82,
      offsetY: "15px",
      duration: 5,
      delay: 0.5,
    },
    {
      top: "50%",
      left: "-139px",
      right: undefined,
      size: 65,
      offsetY: "-8px",
      duration: 4.5,
      delay: 1,
    },
    // Derecha - 3 personas
    {
      top: "-30px",
      left: undefined,
      right: "-139px",
      size: 80,
      offsetY: "-10px",
      duration: 4.8,
      delay: 0.3,
    },
    {
      top: "52px",
      left: undefined,
      right: "-282px",
      size: 95,
      offsetY: "15px",
      duration: 5.2,
      delay: 0.8,
    },
    {
      top: "40%",
      left: undefined,
      right: "-139px",
      size: 65,
      offsetY: "-8px",
      duration: 4.3,
      delay: 1.2,
    },
  ];

  // Posiciones para MOBILE - arriba del hero, orden desordenado
  // Todos + 140px
  const peoplePositionsMobile = [
    {
      top: "220px",
      left: "-20px",
      right: undefined,
      size: 60,
      offsetY: "-10px",
      duration: 4,
      delay: 0,
    }, //
    {
      top: "170px",
      left: "35%",
      right: undefined,
      size: 55,
      offsetY: "15px",
      duration: 5,
      delay: 0.5,
    }, //
    {
      top: "140px",
      left: undefined,
      right: "15%",
      size: 65,
      offsetY: "-8px",
      duration: 4.5,
      delay: 1,
    }, //
    {
      top: "280px",
      left: "25%",
      right: undefined,
      size: 50,
      offsetY: "-10px",
      duration: 4.8,
      delay: 0.3,
    }, //
    {
      top: "230px",
      left: undefined,
      right: "35%",
      size: 58,
      offsetY: "15px",
      duration: 5.2,
      delay: 0.8,
    }, //
    {
      top: "250px",
      left: undefined,
      right: "-20px",
      size: 52,
      offsetY: "-8px",
      duration: 4.3,
      delay: 1.2,
    }, //
  ];

  const peoplePositions = isMobile
    ? peoplePositionsMobile
    : peoplePositionsDesktop;

  const communitySchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kali Coliving",
    url: BASE_URL || undefined,
    description: getMetaDescription("community", locale as "en" | "es"),
  };

  return (
    <>
      <JsonLd data={communitySchema} />
      <main>
        <div className="relative h-[740px] sm:h-[calc(100vh+200px)] min-h-[670px] bg-red md:min-h-[900px] overflow-hidden flex flex-col items-center justify-center">
          {/* Isologos rotados 180° + rotación adicional, distribuidos por fuera */}
          {isoRotations.map((baseRotation, index) => {
            // Posiciones alejadas del centro, por fuera de las personas y el hero
            // Desktop: 14 posiciones
            const positionsDesktop = [
              { top: "5%", left: "15%" },
              { top: "12%", left: "25%" },
              { top: "20%", left: "12%" },
              { top: "75%", left: "18%" },
              { top: "82%", left: "28%" },
              { top: "60%", left: "15%" },
              { top: "5%", right: "15%" },
              { top: "12%", right: "25%" },
              { top: "20%", right: "12%" },
              { top: "10%", right: "40%" },
              { top: "60%", right: "28%" },
              { top: "60%", right: "15%" },
              { top: "50%", left: "2%" },
              { top: "50%", right: "2%" },
            ];
            // Mobile: 6 posiciones
            const positionsMobile = [
              { top: "10%", left: "10%" },
              { top: "20%", left: "5%" },
              { top: "70%", left: "15%" },
              { top: "10%", right: "10%" },
              { top: "20%", right: "5%" },
              { top: "70%", right: "15%" },
            ];
            const positions = isMobile ? positionsMobile : positionsDesktop;
            const position = positions[index] || { top: "50%", left: "50%" };
            // Rotación de 180° + rotación base
            const totalRotation = 180 + baseRotation;

            return (
              <motion.div
                key={`iso-${index}`}
                className="absolute pointer-events-none z-0"
                style={{
                  ...position,
                  rotate: `${totalRotation}deg`,
                }}
                animate={{
                  y: [0, -8, 0],
                  x: [0, 3, 0],
                }}
                transition={{
                  duration: 3 + index * 0.3, // Diferentes velocidades
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2, // Stagger effect
                }}
              >
                <Image
                  src={IsoLogo}
                  alt=""
                  width={80}
                  height={80}
                  className={`rotate-180 ${isMobile ? "w-[25px] h-[25px]" : "w-[50px] h-[50px] md:w-50px md:h-50px"}`}
                />
              </motion.div>
            );
          })}

          {/* Imágenes de personas en círculos alrededor del hero (3 izquierda, 3 derecha) */}

          {/* Contenido principal */}
          <div
            className="relative z-20 flex flex-col items-center justify-end
           sm:justify-center h-full sm:h-auto w-screen md:w-auto "
          >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]">
              {peoplePositions.map((position, index) => {
                const peopleImages = [
                  People,
                  People2,
                  People3,
                  People4,
                  People5,
                  People6,
                ];
                const animations = [
                  { y: [0, -12, 0], x: [0, 4, 0] },
                  { y: [0, -15, 0], x: [0, -3, 0] },
                  { y: [0, -10, 0], x: [0, 5, 0] },
                  { y: [0, -13, 0], x: [0, -4, 0] },
                  { y: [0, -14, 0], x: [0, 3, 0] },
                  { y: [0, -11, 0], x: [0, -5, 0] },
                ];

                // Estilo para cada persona
                const style: React.CSSProperties = {
                  top: position.top,
                  width: `${position.size}px`,
                  height: `${position.size}px`,
                };

                // Aplicar left o right según la posición
                if (position.left !== undefined) {
                  style.left = position.left;
                }
                if (position.right !== undefined) {
                  style.right = position.right;
                }

                return (
                  <motion.div
                    key={index}
                    className="absolute rounded-full overflow-hidden"
                    style={style}
                    animate={animations[index]}
                    transition={{
                      duration: position.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: position.delay,
                    }}
                  >
                    <Image
                      src={peopleImages[index]}
                      alt="Kali Coliving community member"
                      width={position.size}
                      height={position.size}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </motion.div>
                );
              })}
            </div>
            <div className="relative z-10 overflow-hidden h-[36px] pb-8 mb-8">
              <motion.div
                className="h-[36px]  flex items-center justify-center w-[240px] 
                rounded-full overflow-hidden mx-auto"
                variants={curtainLine}
                initial="hidden"
                animate="visible"
              >
                <span className="text-[18px] text-white text-center tracking-[-3%]">
                  {t("heroLabel")}
                </span>
              </motion.div>
            </div>
            <motion.h1
              ref={titleRef}
              className="text-white font-bold text-center text-[50px] sm:text-[100px] max-w-[270px] 
              sm:max-w-[665px] w-[665px] title !leading-[90%] sm:!leading-[80px] mb-10 md:mb-0 overflow-hidden"
            >
              {titleLines.length > 0 ? (
                <motion.div
                  variants={curtainContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {(() => {
                    const words = `${t("heroTitle1")} ${t("heroTitle2")}`
                      .trim()
                      .split(" ")
                      .filter(Boolean);
                    return titleLines.map((line, i) => {
                      const part1End = Math.min(
                        line.endWordIndex,
                        title1WordCount - 1,
                      );
                      const part2Start = Math.max(
                        line.startWordIndex,
                        title1WordCount,
                      );
                      const part1Words =
                        part1End >= line.startWordIndex
                          ? words.slice(line.startWordIndex, part1End + 1)
                          : [];
                      const part2Words =
                        part2Start <= line.endWordIndex
                          ? words.slice(part2Start, line.endWordIndex + 1)
                          : [];
                      const part1 = part1Words.join(" ");
                      const part2 = part2Words.join(" ");
                      return (
                        <span key={i} className="block overflow-hidden">
                          <motion.span className="block" variants={curtainLine}>
                            {part1 && (
                              <>
                                {part1}
                                {part2 && "\u00A0"}
                              </>
                            )}
                            {part2 ? (
                              <span className="recoleta">{part2}</span>
                            ) : null}
                            {!part1 && !part2 ? "\u00A0" : null}
                          </motion.span>
                        </span>
                      );
                    });
                  })()}
                </motion.div>
              ) : (
                <span className="block opacity-0">
                  {t("heroTitle1")} {t("heroTitle2")}
                </span>
              )}
            </motion.h1>
            <div className="mb-[130px] mt-6 w-full sm:w-auto px-4 sm:px-5 overflow-hidden">
              <motion.button
                type="button"
                onClick={() => setIsApplyPopupOpen(true)}
                className="sm:w-[148px] bg-white rounded-[12px] semi-bold text-center font-semibold text-lg px-4 py-3 text-black my-2 w-full cursor-pointer hover:bg-white-hover transition-colors"
                variants={curtainLineLower}
                initial="hidden"
                animate="visible"
              >
                {t("joinKali")}
              </motion.button>
            </div>
          </div>
          <Image
            src={dividerNotFilledSvg}
            alt=""
            width={1512}
            height={193}
            className="absolute bottom-0 left-0 w-full pointer-events-none rotate-180"
          />
        </div>
        <div
          ref={galleryRef}
          className="w-full h-[200vh] md:h-[100vh] md:min-h-[800px] relative z-[10]"
        >
          {/* Mobile (< md): texto arriba del spread con margen 20px */}
          <p className="mt-5 md:mt-0 md:hidden text-black text-center text-[24px] max-w-[480px] mx-auto px-4 relative z-[-1]">
            {t("galleryDescription")}
          </p>
          {/* Galería responsive: cards más pequeños <lg, layout desktop intacto */}
          <motion.div
            initial={{ x: "-50%", y: "-50%", rotate: 0, opacity: 1 }}
            animate={
              hasSpread
                ? {
                    x: galleryPositions[0].x,
                    y: galleryPositions[0].y,
                    rotate: galleryPositions[0].rotate,
                    opacity: 1,
                  }
                : {
                    x: "-50%",
                    y: "-50%",
                    rotate: 0,
                    opacity: 1,
                  }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
            className="absolute top-[22%] md:top-[18%] lg:top-[15%] left-1/2 w-[300px] h-[212px] sm:w-[360px] sm:h-[254px] md:w-[420px] md:h-[297px] lg:w-[478px] lg:h-[338px] rounded-lg"
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src={GalleryImage1}
              alt="Gallery Image 1"
              width={478}
              height={338}
              className="w-full h-full object-cover rounded-[24px] rotate-[-10deg] lg:rotate-[-15deg]"
            />
          </motion.div>
          <motion.div
            initial={{ x: "-50%", y: "-50%", rotate: 0, opacity: 1 }}
            animate={
              hasSpread
                ? {
                    x: galleryPositions[1].x,
                    y: galleryPositions[1].y,
                    rotate: galleryPositions[1].rotate,
                    opacity: 1,
                  }
                : {
                    x: "-50%",
                    y: "-50%",
                    rotate: 0,
                    opacity: 1,
                  }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="absolute top-[22%] md:top-[18%] lg:top-[15%] left-1/2 w-[300px] h-[212px] sm:w-[360px] sm:h-[254px] md:w-[420px] md:h-[297px] lg:w-[478px] lg:h-[338px] rounded-lg"
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src={GalleryImage2}
              alt="Gallery Image 2"
              width={478}
              height={338}
              className="w-full h-full object-cover rounded-[24px] rotate-[-10deg] lg:rotate-[-15deg]"
            />
          </motion.div>
          <motion.div
            initial={{ x: "-50%", y: "-50%", rotate: 0, opacity: 1 }}
            animate={
              hasSpread
                ? {
                    x: galleryPositions[2].x,
                    y: galleryPositions[2].y,
                    rotate: galleryPositions[2].rotate,
                    opacity: 1,
                  }
                : {
                    x: "-50%",
                    y: "-50%",
                    rotate: 0,
                    opacity: 1,
                  }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="absolute top-[22%] md:top-[18%] lg:top-[15%] left-1/2 w-[300px] h-[212px] sm:w-[360px] sm:h-[254px] md:w-[420px] md:h-[297px] lg:w-[478px] lg:h-[338px] rounded-lg"
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src={GalleryImage3}
              alt="Gallery Image 3"
              width={478}
              height={338}
              className="w-full h-full object-cover rounded-[24px] "
            />
          </motion.div>
          <motion.div
            initial={{ x: "-50%", y: "-50%", rotate: 0, opacity: 1 }}
            animate={
              hasSpread
                ? {
                    x: galleryPositions[3].x,
                    y: galleryPositions[3].y,
                    rotate: galleryPositions[3].rotate,
                    opacity: 1,
                  }
                : {
                    x: "-50%",
                    y: "-50%",
                    rotate: 0,
                    opacity: 1,
                  }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="absolute top-[22%] md:top-[18%] lg:top-[15%] left-1/2 w-[300px] h-[212px] sm:w-[360px] sm:h-[254px] md:w-[420px] md:h-[297px] lg:w-[478px] lg:h-[338px] rounded-lg"
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src={GalleryImage4}
              alt="Gallery Image 4"
              width={478}
              height={338}
              className="w-full h-full object-cover rounded-[24px] "
            />
          </motion.div>
          <motion.div
            initial={{ x: "-50%", y: "-50%", rotate: 0, opacity: 1 }}
            animate={
              hasSpread
                ? {
                    x: galleryPositions[4].x,
                    y: galleryPositions[4].y,
                    rotate: galleryPositions[4].rotate,
                    opacity: 1,
                  }
                : {
                    x: "-50%",
                    y: "-50%",
                    rotate: 0,
                    opacity: 1,
                  }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
            className="absolute top-[22%] md:top-[18%] lg:top-[15%] left-1/2 w-[300px] h-[212px] sm:w-[360px] sm:h-[254px] md:w-[420px] md:h-[297px] lg:w-[478px] lg:h-[338px] rounded-lg"
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src={GalleryImage5}
              alt="Gallery Image 5"
              width={478}
              height={338}
              className="w-full h-full object-cover rounded-[24px] "
            />
          </motion.div>
          {/* CTA: en mobile empieza debajo de las imágenes y queda visible centrado al hacer spread */}
          <div className="flex flex-col items-center justify-center lg:pt-0 pt-[31vh] md:pt-0">
            <p className="text-black text-center text-[24px] max-w-[480px] mx-auto mt-14 hidden md:block">
              {t("galleryDescription")}
            </p>
            <button
              type="button"
              onClick={() => setIsApplyPopupOpen(true)}
              className="block w-full max-w-[140px] md:max-w-none group"
            >
              <div className="w-full max-w-[350px] h-[60px] bg-red rounded-[12px] text-center font-semibold text-[18px] text-white mt-9 flex justify-center items-center mx-auto group-hover:bg-red-hover transition-colors">
                {t("joinKali")}
              </div>
            </button>
          </div>
        </div>
        <div className="mb-[130px] mt-[-100vh]  md:mt-[0] z-[10] relative">
          <p className="text-black text-left text-[50px] title pl-5 md:pl-20 ">
            {t("voicesTitle1")}&nbsp;
            <br />
            <span className="recoleta text-black">{t("voicesTitle2")}</span>
          </p>
          <CommunityCarousel />
        </div>
        <div className="mb-[-60px] md:mb-[-80px] lg:mb-[-100px]">
          <GallerySection />
        </div>
      </main>
      <Footer />
      <ApplyToKaliPopup
        isOpen={isApplyPopupOpen}
        onClose={() => setIsApplyPopupOpen(false)}
      />
    </>
  );
}

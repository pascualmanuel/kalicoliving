'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import homeImage from '../../public/assets/images/home/hero-image-kali.webp';
import dividerSvg from '../../public/assets/icons/divider.svg';
import PopupButton from '@/components/PopupButton';
import image from 'next/image';
import homeCard1 from '../../public/assets/images/home/home-card-1.webp';
import homeCard2 from '../../public/assets/images/home/home-card-2.webp';
import homeCard3 from '../../public/assets/images/home/home-card-3.webp';
import homeCard4 from '../../public/assets/images/home/home-card-4.webp';
import brownDividerSvg from '../../public/assets/icons/brown-divider.svg';
import ticIcon from '../../public/assets/icons/tic-icon.svg';
import redDviderSvg from '../../public/assets/icons/red-divider.svg';
import RoomsSection from '@/components/Rooms';
import Footer from '@/components/Footer';

export default function HomePage() {
  const t = useTranslations('pages.home');
  const cardsRef = useRef(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isInView = useInView(cardsRef, {
    once: true,
    margin: isMobile ? '-100px' : '-280px',
    amount: isMobile ? 0.1 : 0.2
  });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleLines, setTitleLines] = useState<string[]>([]);

  // Dividir el título en líneas basándose en el layout real
  useEffect(() => {
    const splitTextIntoLines = () => {
      if (titleRef.current && titleRef.current.offsetWidth > 0) {
        const text = t('title');
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        // Crear un elemento temporal para medir el ancho
        const tempEl = document.createElement('span');
        tempEl.style.visibility = 'hidden';
        tempEl.style.position = 'absolute';
        tempEl.style.whiteSpace = 'nowrap';
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
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }

          if (index === words.length - 1) {
            lines.push(currentLine);
          }
        });

        document.body.removeChild(tempEl);
        setTitleLines(lines);
      }
    };

    // Ejecutar después de que el DOM esté listo y el elemento tenga dimensiones
    const timer = setTimeout(splitTextIntoLines, 100);
    window.addEventListener('resize', splitTextIntoLines);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', splitTextIntoLines);
    };
  }, [t]);

  const { scrollYProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start start", "end start"]
  });

  // Controlar la opacidad del texto basado en el scroll
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.1, 0.25], [50, 0]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        delay: i * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94] as any, // easeOutQuad - suave y premium
      }
    })
  };

  // Variantes para la animación tipo cortina (sin cambiar opacidad)
  const curtainContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      }
    }
  };

  const curtainLine = {
    hidden: {
      y: '100%',
    },
    visible: {
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 1, 0.5, 1] as any, // power1.out equivalente
      }
    }
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


        <div className='relative z-10 mt-[-50px] overflow-hidden h-[36px]'>
          <motion.div
            className='h-[36px] bg-[#FFF2E21A] backdrop-blur-[3.5px]
            border border-[#FFF2E266] flex items-center justify-center w-[230px] rounded-full overflow-hidden'
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
          ref={titleRef}
          className="relative z-10 text-[50px]  md:text-[100px] text-white leading-[111%]  md:leading-[111px] tracking-[-4%] font-bold text-center md:max-w-[585px] max-w-[340px] overflow-hidden"
        >
          {titleLines.length > 0 ? (
            <motion.div
              variants={curtainContainer}
              initial="hidden"
              animate="visible"
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span className="block" variants={curtainLine}>
                    {line || '\u00A0'}
                  </motion.span>
                </span>
              ))}
            </motion.div>
          ) : (
            <span className="block opacity-0">{t('title')}</span>
          )}
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
        <h2 className="md:text-[64px] text-[40px] text-black title text-center max-w-[675px]">More than a place to live. <br />
          <span className="recoleta text-red ">A place to belong.</span></h2>
        <p className="text-black text-center max-w-[280px] md:max-w-[430px] my-6 text-[20px]">Kali is a coliving experience where design meets community, creating experiences that stay with you.</p>
        <PopupButton />
      </div>

      <div ref={cardsRef} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5 md:px-20 py-12  mx-auto'>
        {/* Card 1 */}
        <motion.div
          className='flex flex-col items-center justify-center'
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        >
          <div className='w-full max-h-[260px] md:max-w-[310px] aspect-square rounded-xl overflow-hidden'>
            <Image
              src={homeCard1}
              alt="Real community"
              width={310}
              height={310}
              className='w-full h-full object-cover'
            />
          </div>
          <h3 className="text-black title text-center text-[24px] mt-4">Real community</h3>
          <p className="text-black text-center my-2 text-[16px]">Live with like-minded people who choose to step out of their comfort zone.</p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className='flex flex-col items-center justify-center'
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
        >
          <div className='w-full max-h-[260px] md:max-w-[310px] aspect-square rounded-xl overflow-hidden'>
            <Image
              src={homeCard2}
              alt="Card 2"
              width={310}
              height={310}
              className='w-full h-full object-cover'
            />
          </div>
          <div>
            <h3 className="text-black title text-center text-[24px] mt-4">Thoughtfully designed spaces</h3>
            <p className="text-black text-center my-2 text-[16px] tracking-[-4%]">Homes that are functional, warm, and ready so you can focus on living.</p>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className='flex flex-col items-center justify-center'
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={2}
        >
          <div className='w-full max-h-[260px] md:max-w-[310px] aspect-square rounded-xl overflow-hidden'>
            <Image
              src={homeCard3}
              alt="Card 3"
              width={310}
              height={310}
              className='w-full h-full object-cover'
            />
          </div>
          <h3 className="text-black title text-center text-[24px] mt-4">Shared moments</h3>
          <p className="text-black text-center my-2 text-[16px]">Dinners, conversations, working together, unexpected laughs.</p>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          className='flex flex-col items-center justify-center'
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={3}
        >
          <div className='w-full max-h-[260px] md:max-w-[310px] aspect-square rounded-xl overflow-hidden'>
            <Image
              src={homeCard4}
              alt="Card 4"
              width={310}
              height={310}
              className='w-full h-full object-cover'
            />
          </div>
          <h3 className="text-black title text-center text-[24px] mt-4">Growth</h3>
          <p className="text-black text-center my-2 text-[16px]">Every connection adds something new to your journey.</p>
        </motion.div>
      </div>
      <div ref={videoSectionRef} className='relative h-[150vh]'>
        {/* Video Fixed Container */}
        <div className='sticky top-[100px] md:top-0 w-full h-[650px] lg:h-screen md:px-20 px-5 '>
          <div className='rounded-[20px] overflow-hidden h-full'>
            <video
              src="/assets/videos/home-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className='w-full h-full object-cover'
            />
            {/* Text Overlay - Aparece con scroll */}
            <motion.div
              className='absolute bottom-[0px] md:top-[-150px] left-0 w-full h-full flex items-end md:items-center justify-center pointer-events-none'
              style={{
                opacity: textOpacity,
                y: textY,
              }}
            >
              <div className='flex flex-col lg:flex-row justify-between w-full px-10 md:px-[140px] pointer-events-auto'>
                <div className='lg:w-1/2'>
                  <h2 className="md:text-[64px] text-[40px] text-white title max-w-[675px]">Feel at home
                    <br /> <span className="recoleta text-white">from day one</span></h2>
                </div>
                <div className='lg:w-1/2 max-w-[412px]'>
                  <p className="text-white lg:my-2 my-5 text-[20px] leading-[130%]">Kali is built to turn everyday living into experiences that stay with you. Because where you live, and who you live with, shapes who you become.</p>
                  <a href="#" className="">
                    <div className='lg:w-[350px] bg-white rounded-[12px] semi-bold text-center font-semibold text-lg px-4 py-2 text-black my-4'>
                      Meet the community
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className='w-full md:px-20 sm:px-8 px-4  py-[130px]'>
        <RoomsSection />
      </div>

      <Image src={brownDividerSvg} alt="divider" width={1512} height={193} className="w-full mt-[200px]  mx-auto" />

      <div className='w-full md:px-20 px-4 bg-brown  md:mt-[-11%]'>
        <h2 className="md:text-[64px] text-[45px] text-white title text-center ">How it works</h2>
        <p className="text-white text-center my-2 text-[20px] leading-[130%]">Find your next home in a few steps.</p>
        <div className='w-full'>
          <div className='flex flex-col lg:flex-row items-center lg:items-start justify-between gap-7 mt-12 pb-[200px]'>
            {/* Card 1 */}
            <div className='flex flex-col items-start p-6 gap-[21px] w-[315px] h-[206px] rounded-[20px]' style={{ background: 'rgba(255, 242, 226, 0.1)' }}>
              <h3 className="text-white title text-[18px] ">01</h3>
              <h4 className="text-white title text-[24px] font-semibold">Apply</h4>
              <p className="text-white text-[18px] ">Tell us about you and what you&apos;re looking for.</p>
            </div>

            {/* Card 2 */}
            <div className='flex flex-col items-start p-6 gap-[21px] w-[315px] h-[206px] rounded-[20px]' style={{ background: 'rgba(255, 242, 226, 0.1)' }}>
              <h3 className="text-white text-[18px] ">02</h3>
              <h4 className="text-white title text-[24px] font-semibold">Connect</h4>
              <p className="text-white text-[18px] ">We&apos;ll contact you and have a conversation to get to know each other.</p>
            </div>

            {/* Card 3 */}
            <div className='flex flex-col items-start p-6 gap-[21px] w-[315px] h-[206px] rounded-[20px]' style={{ background: 'rgba(255, 242, 226, 0.1)' }}>
              <h3 className="text-white text-[18px] ">03</h3>
              <h4 className="text-white title text-[24px] font-semibold">Match</h4>
              <p className="text-white text-[18px] ">We make sure Kali is the right fit, for you and for the community.</p>
            </div>

            {/* Card 4 */}
            <div className='flex flex-col items-start p-6 gap-[21px] w-[315px] h-[206px] rounded-[20px] bg-white' >
              <h3 className="text-black text-[18px] ">04</h3>
              <h4 className="text-black title text-[32px] font-semibold">Move in</h4>
              <p className="text-black text-[16px] leading-[130%]">Arrive with everything ready. Start living the experience.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full md:px-20 px-4 py-[200px]'>
        <h2 className="md:text-[64px] text-[45px] text-black title text-center ">Kali is for you if...</h2>
        <div className='w-full flex items-center justify-center'>
          <div className='flex flex-col justify-between gap-4 mt-12'>
            <div className='w-full lg:w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4' style={{ background: 'rgba(153, 106, 83, 0.1)' }}>
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">You want to meet new people and feel like a local from day one.</p>
            </div>
            <div className='w-full lg:w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4' style={{ background: 'rgba(153, 106, 83, 0.1)' }}>
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">You like stepping out of your comfort zone and saying yes to new plans</p>
            </div>
            <div className='w-full lg:w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4' style={{ background: 'rgba(153, 106, 83, 0.1)' }}>
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">You want a home where someone’s always up for coffee, afterwork drinks, or dinner.</p>
            </div>
            <div className='w-full lg:w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4' style={{ background: 'rgba(153, 106, 83, 0.1)' }}>
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">You want to move in without the stress — furniture, Wi-Fi, everything sorted.</p>
            </div>
            <div className='w-full lg:w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4' style={{ background: 'rgba(153, 106, 83, 0.1)' }}>
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">You want more than a room — you want community and real connections.</p>
            </div>
            <div className='w-full lg:w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4' style={{ background: 'rgba(153, 106, 83, 0.1)' }}>
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">You want to grow around people who inspire you and push you further.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main >

  );
}

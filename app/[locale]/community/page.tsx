'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import People from '../../../public/assets/images/community/person-1.jpg';
import People2 from '../../../public/assets/images/community/person-2.jpg';
import People3 from '../../../public/assets/images/community/person-3.jpg';
import People4 from '../../../public/assets/images/community/person-4.jpg';
import People5 from '../../../public/assets/images/community/person-5.jpg';
import People6 from '../../../public/assets/images/community/person-6.jpg';
import IsoLogo from '../../../public/assets/logos/iso-logo.svg';
import dividerNotFilledSvg from '../../../public/assets/icons/divider-not-filled.svg';
// import dividerSvg from '../../../public/assets/icons/divider.svg';
import GalleryImage1 from '../../../public/assets/images/community/gallery-1.png';
import GalleryImage2 from '../../../public/assets/images/community/gallery-2.png';
import GalleryImage3 from '../../../public/assets/images/community/gallery-3.png';
import GalleryImage4 from '../../../public/assets/images/community/gallery-4.png';
import GalleryImage5 from '../../../public/assets/images/community/gallery-5.png';

export default function CommunityPage() {
  const t = useTranslations('pages.community');
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

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
      const triggerPoint = windowHeight * 0.1; // 30% del viewport desde arriba

      // Se activa cuando el top de la sección está por encima del trigger point
      // y la sección aún está visible (no ha salido completamente por arriba)
      const shouldActivate = sectionTop < triggerPoint && sectionTop > -sectionHeight * 0.5;

      setIsInView(shouldActivate);
    };

    // Ejecutar al montar para verificar estado inicial
    handleScroll();

    // Escuchar eventos de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);


  // Posiciones finales para las imágenes cuando se esparcen (en píxeles desde el centro)
  const galleryPositions = [
    // Imagen 1 - Top left
    { x: -600, y: -150, rotate: -8 },
    // Imagen 2 - Top center-right
    { x: 250, y: -180, rotate: 5 },
    // Imagen 3 - Bottom left
    { x: -550, y: 180, rotate: -5 },
    // Imagen 4 - Bottom right
    { x: 600, y: 120, rotate: 8 },
    // Imagen 5 - Top right
    { x: 450, y: -100, rotate: -3 },
  ];

  // Rotaciones base para los 14 isologos (-15° a 15°), luego se rotan 180° adicionales
  const isoRotations = [
    -15, -12, -9, -6, -3, 0, 3, 6, 9, 12, 15, -10, 8, -5
  ];

  // Posiciones y tamaños para las personas alrededor del hero (3 izquierda, 3 derecha)
  // Flotando de forma orgánica, cerca del centro
  const peoplePositions = [
    // Izquierda - 3 personas
    { top: '-30px', left: '-139px', size: 97, offsetY: '-10px', duration: 4, delay: 0 },
    { top: '52px', left: '-282px', size: 82, offsetY: '15px', duration: 5, delay: 0.5 },
    { top: '50%', left: '-139px', size: 65, offsetY: '-8px', duration: 4.5, delay: 1 },
    // Derecha - 3 personas
    { top: '-30px', right: '-139px', size: 80, offsetY: '-10px', duration: 4.8, delay: 0.3 },
    { top: '52px', right: '-282px', size: 95, offsetY: '15px', duration: 5.2, delay: 0.8 },
    { top: '40%', right: '-139px', size: 65, offsetY: '-8px', duration: 4.3, delay: 1.2 },
  ];


  return (
    <main>
      <div className="relative h-[calc(100vh+200px)] min-h-[670px] bg-red md:min-h-[900px] overflow-hidden flex flex-col items-center justify-center">
        {/* Isologos rotados 180° + rotación adicional, distribuidos por fuera */}
        {isoRotations.map((baseRotation, index) => {
          // Posiciones alejadas del centro, por fuera de las personas y el hero
          const positions = [
            { top: '5%', left: '15%' },
            { top: '12%', left: '25%' },
            { top: '20%', left: '12%' },
            { top: '75%', left: '18%' },
            { top: '82%', left: '28%' },
            { top: '60%', left: '15%' },
            { top: '5%', right: '15%' },
            { top: '12%', right: '25%' },
            { top: '20%', right: '12%' },
            { top: '10%', right: '40%' },
            { top: '60%', right: '28%' },
            { top: '60%', right: '15%' },
            { top: '50%', left: '2%' },
            { top: '50%', right: '2%' },
          ];
          const position = positions[index] || { top: '50%', left: '50%' };
          // Rotación de 180° + rotación base
          const totalRotation = 180 + baseRotation;

          return (
            <motion.div
              key={`iso-${index}`}
              className="absolute pointer-events-none"
              style={{
                ...position,
                rotate: `${totalRotation}deg`,
              }}
              animate={{
                y: [0, -8, 0],
                x: [0, 3, 0],
              }}
              transition={{
                duration: 3 + (index * 0.3), // Diferentes velocidades
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
                className="w-[50px] h-[50px] md:w-50px md:h-50px rotate-180"
              />
            </motion.div>
          );
        })}

        {/* Imágenes de personas en círculos alrededor del hero (3 izquierda, 3 derecha) */}


        {/* Contenido principal */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <motion.div
              className="absolute rounded-full overflow-hidden"
              style={{
                top: peoplePositions[0].top,
                left: peoplePositions[0].left,
                width: `${peoplePositions[0].size}px`,
                height: `${peoplePositions[0].size}px`,
              }}
              animate={{
                y: [0, -12, 0],
                x: [0, 4, 0],
              }}
              transition={{
                duration: peoplePositions[0].duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: peoplePositions[0].delay,
              }}
            >
              <Image
                src={People}
                alt=""
                width={peoplePositions[0].size}
                height={peoplePositions[0].size}
                className="rounded-full object-cover w-full h-full"
              />
            </motion.div>
            <motion.div
              className="absolute rounded-full overflow-hidden"
              style={{
                top: peoplePositions[1].top,
                left: peoplePositions[1].left,
                width: `${peoplePositions[1].size}px`,
                height: `${peoplePositions[1].size}px`,
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, -3, 0],
              }}
              transition={{
                duration: peoplePositions[1].duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: peoplePositions[1].delay,
              }}
            >
              <Image
                src={People2}
                alt=""
                width={peoplePositions[1].size}
                height={peoplePositions[1].size}
                className="rounded-full object-cover w-full h-full"
              />
            </motion.div>
            <motion.div
              className="absolute rounded-full overflow-hidden"
              style={{
                top: peoplePositions[2].top,
                left: peoplePositions[2].left,
                width: `${peoplePositions[2].size}px`,
                height: `${peoplePositions[2].size}px`,
              }}
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
              }}
              transition={{
                duration: peoplePositions[2].duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: peoplePositions[2].delay,
              }}
            >
              <Image
                src={People3}
                alt=""
                width={peoplePositions[2].size}
                height={peoplePositions[2].size}
                className="rounded-full object-cover w-full h-full"
              />
            </motion.div>
            <motion.div
              className="absolute rounded-full overflow-hidden"
              style={{
                top: peoplePositions[3].top,
                right: peoplePositions[3].right,
                width: `${peoplePositions[3].size}px`,
                height: `${peoplePositions[3].size}px`,
              }}
              animate={{
                y: [0, -13, 0],
                x: [0, -4, 0],
              }}
              transition={{
                duration: peoplePositions[3].duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: peoplePositions[3].delay,
              }}
            >
              <Image
                src={People4}
                alt=""
                width={peoplePositions[3].size}
                height={peoplePositions[3].size}
                className="rounded-full object-cover w-full h-full"
              />
            </motion.div>
            <motion.div
              className="absolute rounded-full overflow-hidden"
              style={{
                top: peoplePositions[4].top,
                right: peoplePositions[4].right,
                width: `${peoplePositions[4].size}px`,
                height: `${peoplePositions[4].size}px`,
              }}
              animate={{
                y: [0, -14, 0],
                x: [0, 3, 0],
              }}
              transition={{
                duration: peoplePositions[4].duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: peoplePositions[4].delay,
              }}
            >
              <Image
                src={People5}
                alt=""
                width={peoplePositions[4].size}
                height={peoplePositions[4].size}
                className="rounded-full object-cover w-full h-full"
              />
            </motion.div>
            <motion.div
              className="absolute rounded-full overflow-hidden"
              style={{
                top: peoplePositions[5].top,
                right: peoplePositions[5].right,
                width: `${peoplePositions[5].size}px`,
                height: `${peoplePositions[5].size}px`,
              }}
              animate={{
                y: [0, -11, 0],
                x: [0, -5, 0],
              }}
              transition={{
                duration: peoplePositions[5].duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: peoplePositions[5].delay,
              }}
            >
              <Image
                src={People6}
                alt=""
                width={peoplePositions[5].size}
                height={peoplePositions[5].size}
                className="rounded-full object-cover w-full h-full"
              />
            </motion.div>
          </div>
          <h3 className='text-white text-center text-[16] md:text-[18] tracking-[-3%] pb-8'>Kali community</h3>
          <h1 className='text-white font-bold text-center text-[50px]  sm:text-[100px] max-w-[270px] sm:max-w-[525px] title  !leading-[90%] sm:!leading-[80px]'>People that leave <span className='recoleta'> a mark</span></h1>
          <a href="#" className="mb-[130px] mt-6">
            <div className='w-[128px] bg-white rounded-[12px] semi-bold text-center font-semibold text-lg px-4 py-3 text-black my-2'>
              Join Kali
            </div>
          </a>
        </div>
        <Image
          src={dividerNotFilledSvg}
          alt="divider"
          width={1512}
          height={193}
          className="absolute bottom-0 left-0 w-full pointer-events-none rotate-180"
        />
      </div>
      <div ref={galleryRef} className='w-full border-t border-red h-[100vh] relative '>
        <motion.div
          initial={{ x: '-50%', y: '-50%', rotate: 0, opacity: 1 }}
          animate={isInView ? {
            x: galleryPositions[0].x,
            y: galleryPositions[0].y,
            rotate: galleryPositions[0].rotate,
            opacity: 0.9,
          } : {
            x: '-50%',
            y: '-50%',
            rotate: 0,
            opacity: 1,
          }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          className="absolute top-[50%] left-[50%] w-[478px] h-[338px] rounded-lg "
          style={{ transformOrigin: 'center center' }}
        >
          <Image
            src={GalleryImage1}
            alt="Gallery Image 1"
            width={478}
            height={338}
            className="w-full h-full object-cover rounded-[24px] rotate-[-15deg]"
          />
        </motion.div>
        <motion.div
          initial={{ x: '-50%', y: '-50%', rotate: 0, opacity: 1 }}
          animate={isInView ? {
            x: galleryPositions[1].x,
            y: galleryPositions[1].y,
            rotate: galleryPositions[1].rotate,
            opacity: 0.9,
          } : {
            x: '-50%',
            y: '-50%',
            rotate: 0,
            opacity: 1,
          }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="absolute top-[50%] left-[50%] w-[478px] h-[338px] rounded-lg "
          style={{ transformOrigin: 'center center' }}
        >
          <Image
            src={GalleryImage2}
            alt="Gallery Image 2"
            width={478}
            height={338}
            className="w-full h-full object-cover rounded-[24px]  rotate-[-15deg]"
          />
        </motion.div>
        <motion.div
          initial={{ x: '-50%', y: '-50%', rotate: 0, opacity: 1 }}
          animate={isInView ? {
            x: galleryPositions[2].x,
            y: galleryPositions[2].y,
            rotate: galleryPositions[2].rotate,
            opacity: 0.9,
          } : {
            x: '-50%',
            y: '-50%',
            rotate: 0,
            opacity: 1,
          }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="absolute top-[50%] left-[50%] w-[478px] h-[338px] rounded-lg "
          style={{ transformOrigin: 'center center' }}
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
          initial={{ x: '-50%', y: '-50%', rotate: 0, opacity: 1 }}
          animate={isInView ? {
            x: galleryPositions[3].x,
            y: galleryPositions[3].y,
            rotate: galleryPositions[3].rotate,
            opacity: 0.9,
          } : {
            x: '-50%',
            y: '-50%',
            rotate: 0,
            opacity: 1,
          }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          className="absolute top-[50%] left-[50%] w-[478px] h-[338px] rounded-lg "
          style={{ transformOrigin: 'center center' }}
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
          initial={{ x: '-50%', y: '-50%', rotate: 0, opacity: 1 }}
          animate={isInView ? {
            x: galleryPositions[4].x,
            y: galleryPositions[4].y,
            rotate: galleryPositions[4].rotate,
            opacity: 0.9,
          } : {
            x: '-50%',
            y: '-50%',
            rotate: 0,
            opacity: 1,
          }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          className="absolute top-[50%] left-[50%] w-[478px] h-[338px] rounded-lg "
          style={{ transformOrigin: 'center center' }}
        >
          <Image
            src={GalleryImage5}
            alt="Gallery Image 5"
            width={478}
            height={338}
            className="w-full h-full object-cover rounded-[24px] "
          />
        </motion.div>
      </div>
      <div className='border-t border-red h-[100vh]'>

      </div>
    </main>
  );
}

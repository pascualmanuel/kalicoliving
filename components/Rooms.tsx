// roomssection
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import homeCard1 from '../public/assets/images/home/home-card-1.webp';
import homeCard2 from '../public/assets/images/home/home-card-2.webp';
import homeCard3 from '../public/assets/images/home/home-card-3.webp';
import homeCard4 from '../public/assets/images/home/home-card-4.webp';

interface RoomData {
  image: any;
  location: string;
  description: string;
  bulletPoints: string[];
}

export default function RoomsSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const STORY_DURATION = 8000; // 8 segundos

  // Datos de cada habitación con su imagen e información asociada
  const rooms: RoomData[] = [
    {
      image: homeCard1,
      location: 'Cuzco-Castillejos, Madrid',
      description: 'Double bed. Fully furnished room. Move-in ready.',
      bulletPoints: [
        'Furnished room',
        'All utilities',
        'High-speed WiFi',
        'Weekly cleaning',
        'Community access',
      ],
    },
    {
      image: homeCard2,
      location: 'Chamberí, Madrid',
      description: 'Single bed. Fully furnished room. Move-in ready.',
      bulletPoints: [
        'Furnished room',
        'All utilities',
        'High-speed WiFi',
        'Weekly cleaning',
        'Community access',
      ],
    },
    {
      image: homeCard3,
      location: 'Malasaña, Madrid',
      description: 'Double bed. Fully furnished room. Move-in ready.',
      bulletPoints: [
        'Furnished room',
        'All utilities',
        'High-speed WiFi',
        'Weekly cleaning',
        'Community access',
      ],
    },
    {
      image: homeCard4,
      location: 'Salamanca, Madrid',
      description: 'Single bed. Fully furnished room. Move-in ready.',
      bulletPoints: [
        'Furnished room',
        'All utilities',
        'High-speed WiFi',
        'Weekly cleaning',
        'Community access2',
      ],
    },
  ];

  const currentRoom = rooms[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % rooms.length);
    setProgress(0);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
    setProgress(0);
  };

  // Auto-play y animación de progreso
  useEffect(() => {
    // Limpiar intervalos anteriores
    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    // Resetear progreso cuando cambia la imagen
    setProgress(0);

    // Actualizar progreso cada 50ms para animación suave
    let currentProgress = 0;
    progressIntervalRef.current = setInterval(() => {
      currentProgress += (50 / STORY_DURATION) * 100;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(progressIntervalRef.current!);
      } else {
        setProgress(currentProgress);
      }
    }, 50);

    // Cambiar de imagen después de 8 segundos
    intervalRef.current = setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % rooms.length);
      setProgress(0);
    }, STORY_DURATION);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentImageIndex, rooms.length]);

  return (
    <div className="flex lg:flex-row flex-col-reverse w-full rounded-[20px] overflow-hidden  border border-[#0000001A]">
      {/* Left Section - Image (55%) */}
      <div className="relative lg:w-[55%] md:h-[700px] h-[520px]">
        <Image
          src={currentRoom.image}
          alt="Room"
          fill
          className="object-cover"
        />
        
        {/* Carousel Indicators - Instagram Style */}
        <div className="absolute top-6 left-6 right-6 flex gap-1 z-10">
          {rooms.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-[#858585] rounded-full overflow-hidden"
            >
              {index === currentImageIndex ? (
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.05, ease: 'linear' }}
                />
              ) : index < currentImageIndex ? (
                <div className="h-full bg-white rounded-full w-full" />
              ) : null}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#FFF2E24D] hover:bg-[#]  rounded-full p-2 transition-all"
          aria-label="Previous image"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#FFF2E24D] hover: rounded-full p-2 transition-all"
          aria-label="Next image"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Text Overlays */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-white title text-[32px] mb-2">{currentRoom.location}</h3>
          <p className="text-white text-[16px] mb-4">{currentRoom.description}</p>
          <button className="w-full bg-red text-white rounded-[12px] font-semibold text-lg px-4 py-3 hover:bg-red/90 transition-colors">
            Apply now
          </button>
        </div>
      </div>

      {/* Right Section - Info (45%) */}
      <div className="lg:w-[45%] bg-white sm:p-12 p-6 flex flex-col justify-center">
        <p className="text-red recoleta sm:text-[18px] text-[16px] mb-4 trcking-[-1%]">Transparent pricing</p>
        <h2 className="text-black title md:text-[64px] text-[45px] leading-[100%] mb-4">
          One price.
          <br />
          <span className="recoleta">Everything included.</span>
        </h2>
        <p className="text-black text-[20px] leading-[130%] max-w-[430px] mb-8">
          Rent covers your private room, shared spaces, utilities, WiFi, weekly cleaning, and be part of the community.
        </p>
        
        {/* Bullet Points */}
        <div className="flex flex-wrap gap-2">
          {currentRoom.bulletPoints.map((point, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-red text-[20px]">•</span>
              <span className="text-black text-[18px]">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
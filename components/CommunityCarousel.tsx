'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Person1 from '../public/assets/images/community/person1.jpg';
import Person2 from '../public/assets/images/community/person2.jpg';
import Person3 from '../public/assets/images/community/person3.jpg';
import Person4 from '../public/assets/images/community/person4.jpg';
import Person5 from '../public/assets/images/community/person5.jpg';
import Person6 from '../public/assets/images/community/person6.jpg';
import NavigationIcon from '../public/assets/icons/navigation.svg';
import QuoiteIcon from '../public/assets/icons/quote.svg';

interface PersonData {
  image: any;
  quote: string;
  name: string;
  role: string;
}

const CommunityCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const people: PersonData[] = [
    {
      image: Person1,
      quote: 'The people here changed my whole experience.',
      name: 'John Doe',
      role: 'Designer from Costa Rica',
    },
    {
      image: Person2,
      quote: 'The people here changed my whole experience.',
      name: 'Jane Smith',
      role: 'Developer from Spain',
    },
    {
      image: Person3,
      quote: 'The people here changed my whole experience.',
      name: 'Mike Johnson',
      role: 'Entrepreneur from USA',
    },
    {
      image: Person4,
      quote: 'The people here changed my whole experience.',
      name: 'Sarah Williams',
      role: 'Artist from France',
    },
    {
      image: Person5,
      quote: 'The people here changed my whole experience.',
      name: 'David Brown',
      role: 'Writer from UK',
    },
    {
      image: Person6,
      quote: 'The people here changed my whole experience.',
      name: 'Emma Davis',
      role: 'Photographer from Italy',
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
        Math.floor(containerWidth / (cardWidth + gap))
      );

      setCardsPerView(visibleCards);

      const totalWidth = people.length * (cardWidth + gap);
      const maxTranslateValue = Math.max(0, totalWidth - containerWidth);
      setMaxTranslate(maxTranslateValue);
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);

    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const nextSlide = () => {
    const maxIndex = Math.max(0, people.length - cardsPerView);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const translateX = -(currentIndex * (cardWidth + gap));

  return (
    <div className='w-full relative'>
      {/* Navigation Buttons - Top Right */}
      <div className='flex justify-end mb-6 pr-4'>
        <div className='flex gap-2'>
          <button
            onClick={prevSlide}

            disabled={currentIndex === 0}
            className=' rounded-full  transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            aria-label="Previous"
          >

            <Image
              src={NavigationIcon}
              alt="Next"
              width={30}
              height={30}
            />
          </button>
          <button
            onClick={nextSlide}
            className='rounded-full  transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            aria-label="Next"
            disabled={currentIndex >= people.length - cardsPerView }


          >
            <Image
              src={NavigationIcon}
              alt="Previous"
              width={30}
              height={30}
              className='rotate-180'
            />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div ref={viewportRef} className='overflow-hidden w-full pl-5 md:pl-20'>
        <motion.div
          ref={carouselRef}
          className='flex gap-6 cursor-grab active:cursor-grabbing'
          drag="x"
          dragConstraints={{ left: -maxTranslate, right: 0 }}
          dragElastic={0.1}
          animate={{ x: translateX }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {people.map((person, index) => (
            <div
              key={index}
              className='relative w-[335px] h-[400px] rounded-[24px] overflow-hidden flex-shrink-0 '
            >
              {/* Background Image */}
              <Image
                src={person.image}
                alt={person.name}
                fill
                className='object-cover'
                style={{ zIndex: 0 }}
              />

              {/* Content Overlay */}
              <div className='absolute inset-0 z-10 flex flex-col items-start justify-between p-6 bg-[black]/40'>
                <div className='flex flex-row items-start justify-start gap-2'>
                  <p className='text-white text-left text-[14px]'>{person.quote}</p>
                  <Image src={QuoiteIcon} alt="Quote" width={30} height={30} />
                </div>
                <div className='flex flex-col items-start justify-start gap-2'>
                  <h5 className='text-white text-left text-[24px] font-bold'>{person.name}</h5>
                  <p className='text-white text-left text-[16px]'>{person.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityCarousel;
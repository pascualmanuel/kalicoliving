'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import galleryImage1 from '../public/assets/images/home/home-card-1.webp';
import galleryImage2 from '../public/assets/images/home/home-card-2.webp';
import galleryImage3 from '../public/assets/images/home/home-card-3.webp';
import galleryImage4 from '../public/assets/images/home/home-card-4.webp';

const GallerySection = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const STORY_DURATION = 8000; // 8 segundos

    const galleryImages = [
        galleryImage1,
        galleryImage2,
        galleryImage3,
        galleryImage4,
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        setProgress(0);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
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
            setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
            setProgress(0);
        }, STORY_DURATION);

        return () => {
            if (intervalRef.current) clearTimeout(intervalRef.current);
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, [currentImageIndex, galleryImages.length]);

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <h2 className='text-black title text-center text-[45px] mb-10'>Gallery</h2>
            <div className='flex flex-col items-center justify-center'>
                <div className="relative max-w-[525px] max-h-[718px] sm:w-[525px] sm:h-[718px] w-[300px] h-[400px] rounded-[20px] overflow-hidden border border-[#0000001A]">
                    <Image
                        src={galleryImages[currentImageIndex]}
                        alt="Kali Coliving community gallery"
                        fill
                        className="object-cover"
                    />

                    {/* Carousel Indicators - Instagram Style */}
                    <div className="absolute top-6 left-6 right-6 flex gap-1 z-10">
                        {galleryImages.map((_, index) => (
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
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#FFF2E24D] hover:bg-[#FFF2E266] rounded-full p-2 transition-all"
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
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#FFF2E24D] hover:bg-[#FFF2E266] rounded-full p-2 transition-all"
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
                </div>
            </div>
        </div>
    );
}

export default GallerySection;
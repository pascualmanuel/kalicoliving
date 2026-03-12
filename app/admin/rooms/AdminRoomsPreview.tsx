"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { AdminRoom } from "@/lib/rooms";

const STORY_DURATION = 8000;

type Props = {
  rooms: AdminRoom[];
};

export default function AdminRoomsPreview({ rooms }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Preview muestra todos los rooms (incl. active: false) para que el admin vea el carrusel completo
  const actualSlides = rooms;
  const current = actualSlides[currentIndex];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % actualSlides.length);
    setProgress(0);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + actualSlides.length) % actualSlides.length,
    );
    setProgress(0);
  };

  useEffect(() => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    setProgress(0);
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

    intervalRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % actualSlides.length);
      setProgress(0);
    }, STORY_DURATION);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, actualSlides.length]);

  if (actualSlides.length === 0 || !current) return null;

  return (
    <div className="flex lg:flex-row flex-col-reverse w-full rounded-[20px] overflow-hidden border border-[#0000001A] bg-white">
      <div className="relative lg:w-[55%] md:h-[700px] h-[380px]">
        {current.image_url ? (
          <Image
            src={current.image_url}
            alt={current.location_es}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFE3C4] via-[#FFF2E2] to-[#FEE1D5]" />
        )}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
          aria-hidden
        />

        <div className="absolute top-6 left-6 right-6 flex gap-1 z-10">
          {actualSlides.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-[#858585] rounded-full overflow-hidden"
            >
              {index === currentIndex ? (
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.05, ease: "linear" }}
                />
              ) : index < currentIndex ? (
                <div className="h-full bg-white rounded-full w-full" />
              ) : null}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={prev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#FFF2E24D] rounded-full p-2 transition-all"
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
          type="button"
          onClick={next}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-[#FFF2E24D] rounded-full p-2 transition-all"
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

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-white title text-[24px] md:text-[32px] mb-2">
            {current.location_es}
          </h3>
          <p className="text-white text-[14px] md:text-[16px] mb-4 line-clamp-3">
            {current.description_es}
          </p>
          <button
            type="button"
            disabled
            className="w-full bg-red text-white rounded-[12px] font-semibold text-base md:text-lg px-4 py-3 opacity-80 cursor-default"
          >
            Apply now (preview)
          </button>
        </div>
      </div>

      <div className="lg:w-[45%] bg-white p-6 md:pl-[50px] md:p-10 xl:pl-[80px] lg:pr-6 flex flex-col justify-center">
        <p className="text-red recoleta sm:text-[18px] text-[16px] mb-4">
          Vista previa interna
        </p>
        <h2 className="text-black title md:text-[40px] text-[32px] leading-[100%] mb-4">
          Así se ve el carrusel
          <br />
          <span className="recoleta">en la home de Kali.</span>
        </h2>
        <p className="text-black text-[16px] leading-[130%] max-w-[430px] mb-6 text-grey/80">
          Usa este panel para añadir, editar u ocultar habitaciones del
          carrusel. Los cambios se reflejarán en la web pública.
        </p>
      </div>
    </div>
  );
}

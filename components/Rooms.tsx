"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useApplyPopup } from "@/context/ApplyPopupContext";
import type { PublicRoomSlide } from "@/lib/rooms";

const STORY_DURATION = 8000;
const ROOM_BULLET_KEYS = [1, 2, 3, 4, 5] as const;

export default function RoomsSection() {
  const locale = useLocale() as "es" | "en";
  const t = useTranslations("pages.home");
  const { openApplyPopup } = useApplyPopup();
  const [rooms, setRooms] = useState<PublicRoomSlide[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/rooms?locale=${locale}`)
      .then((res) => res.json())
      .then((data: PublicRoomSlide[]) => {
        if (!cancelled && Array.isArray(data)) {
          setRooms(data);
          setCurrentImageIndex(0);
        }
      })
      .catch((err) => console.error("Rooms fetch error:", err));
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const currentRoom = rooms[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % rooms.length);
    setProgress(0);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
    setProgress(0);
  };

  useEffect(() => {
    if (rooms.length === 0) return;
    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    setProgress(0);
    let currentProgress = 0;
    progressIntervalRef.current = setInterval(() => {
      currentProgress += (50 / STORY_DURATION) * 100;
      if (currentProgress >= 100) {
        setProgress(100);
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      } else {
        setProgress(currentProgress);
      }
    }, 50);

    intervalRef.current = setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % rooms.length);
      setProgress(0);
    }, STORY_DURATION);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentImageIndex, rooms.length]);

  if (rooms.length === 0) return null;

  return (
    <div className="flex lg:flex-row flex-col-reverse w-full rounded-[20px] overflow-hidden border border-[#0000001A]">
      <div className="relative lg:w-[55%] md:h-[700px] h-[520px]">
        {currentRoom.image_url ? (
          <Image
            src={currentRoom.image_url}
            alt={currentRoom.location}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#FFE3C4] via-[#FFF2E2] to-[#FEE1D5]"
            aria-hidden
          />
        )}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
          aria-hidden
        />

        <div className="absolute top-6 left-6 right-6 flex gap-1 z-10">
          {rooms.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-[#858585] rounded-full overflow-hidden"
            >
              {index === currentImageIndex ? (
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.05, ease: "linear" }}
                />
              ) : index < currentImageIndex ? (
                <div className="h-full bg-white rounded-full w-full" />
              ) : null}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[#FFF2E24D] hover:bg-white/20 rounded-full p-2 transition-all"
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
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[#FFF2E24D] hover:bg-white/20 rounded-full p-2 transition-all"
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
          <h3 className="text-white title text-[32px] mb-2">
            {currentRoom.location}
          </h3>
          <p className="text-white text-[16px] mb-4">{currentRoom.description}</p>
          <button
            type="button"
            onClick={openApplyPopup}
            className="w-full bg-red text-white rounded-[12px] font-semibold text-lg px-4 py-3 hover:bg-red-hover transition-colors"
          >
            {t("rooms.applyNow")}
          </button>
        </div>
      </div>

      <div className="lg:w-[45%] bg-white p-6 md:pl-[50px] md:p-12 xl:pl-[120px] lg:pr-6 flex flex-col justify-center">
        <p className="text-red recoleta sm:text-[18px] text-[16px] mb-4 trcking-[-1%]">
          {t("rooms.transparentPricing")}
        </p>
        <h2 className="text-black title md:text-[64px] text-[45px] leading-[100%] mb-4">
          {t("rooms.onePrice")}
          <br />
          <span className="recoleta">{t("rooms.everythingIncluded")}</span>
        </h2>
        <p className="text-black text-[20px] leading-[130%] max-w-[430px] mb-8">
          {t("rooms.rentDescription")}
        </p>

        <div className="flex flex-wrap gap-2">
          {ROOM_BULLET_KEYS.map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-red text-[20px]">•</span>
              <span className="text-black text-[18px]">
                {t(`rooms.bullet${i}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

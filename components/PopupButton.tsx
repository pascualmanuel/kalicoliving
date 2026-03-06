"use client";

import { useApplyPopup } from "@/context/ApplyPopupContext";
import { useTranslations } from "next-intl";
export default function PopupButton() {
  const { openApplyPopup } = useApplyPopup();
  const t = useTranslations("nav");
  return (
    <button
      type="button"
      onClick={openApplyPopup}
      className="bg-red text-white px-4 py-2 rounded-xl w-[350px] h-[50px] text-center font-semibold text-lg"
    >
      {t("applyNow")}
      {/* Empieza tu experiencia */}
    </button>
  );
}

"use client";

import { useApplyPopup } from "@/context/ApplyPopupContext";

export default function PopupButton() {
  const { openApplyPopup } = useApplyPopup();

  return (
    <button
      type="button"
      onClick={openApplyPopup}
      className="bg-red text-white px-4 py-2 rounded-xl w-[350px] h-[50px] text-center font-semibold text-lg"
    >
      {/* Apply now */}
      Empieza tu experiencia
    </button>
  );
}

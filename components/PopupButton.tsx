"use client";

import { useState } from "react";
import ApplyToKaliPopup from "./ApplyToKaliPopup";

export default function PopupButton() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsPopupOpen(true)}
        className="bg-red text-white px-4 py-2 rounded-xl w-[350px] h-[50px] text-center font-semibold text-lg"
      >
        Apply now
      </button>
      <ApplyToKaliPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
}

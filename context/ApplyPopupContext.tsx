"use client";

import { createContext, useContext, useState } from "react";
import ApplyToKaliPopup from "@/components/ApplyToKaliPopup";

const ApplyPopupContext = createContext<{
  openApplyPopup: () => void;
  closeApplyPopup: () => void;
} | null>(null);

export function useApplyPopup() {
  const ctx = useContext(ApplyPopupContext);
  if (!ctx) throw new Error("useApplyPopup must be used within ApplyPopupProvider");
  return ctx;
}

export function ApplyPopupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ApplyPopupContext.Provider
      value={{
        openApplyPopup: () => setIsOpen(true),
        closeApplyPopup: () => setIsOpen(false),
      }}
    >
      {children}
      <ApplyToKaliPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ApplyPopupContext.Provider>
  );
}

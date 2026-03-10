"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "kali-cookie-consent";

export function getCookieConsent(): "accepted" | "rejected" | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "accepted" || stored === "rejected") return stored;
  return null;
}

export default function CookieBanner() {
  const t = useTranslations("pages.cookieBanner");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();
    if (consent == null) setIsVisible(true);
  }, []);

  const setConsent = (value: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, value);
    setIsVisible(false);
    // Aquí podrías disparar carga de GA/Meta solo si value === "accepted"
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="dialog"
          aria-label={t("message")}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "tween", duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[9999] px-4 py-3 sm:px-6 sm:py-4 md:px-8"
        >
          <div className="mx-auto max-w-[720px] rounded-[12px] border border-[#272727]/12 bg-[#FFF2E2] shadow-[0_-4px_24px_rgba(39,39,39,0.08)] md:ml-auto md:mr-0 md:max-w-[510px]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 p-3 sm:p-5">
              <p className="text-[13px] leading-[1.5] text-[#272727]/90 sm:text-sm">
                {t("message")}{" "}
                <Link
                  href="/cookies"
                  className="font-medium text-[#272727] underline decoration-[#272727]/30 underline-offset-2 hover:decoration-[#272727]"
                >
                  {t("link")}
                </Link>
              </p>
              <div className="flex shrink-0 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setConsent("rejected")}
                  className="rounded-[10px] border border-[#272727]/20 bg-transparent px-4 py-2 text-[13px] font-semibold text-[#272727] transition-colors hover:border-[#272727]/40 hover:bg-[#272727]/05 sm:text-sm"
                >
                  {t("reject")}
                </button>
                <button
                  type="button"
                  onClick={() => setConsent("accepted")}
                  className="rounded-[10px] bg-red px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-red-hover sm:text-sm"
                >
                  {t("accept")}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect } from "react";

export default function SetHtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);
  return null;
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

const STEPS = [1, 2, 3];
const DURATION_KEYS = ["duration1", "duration2", "duration3", "duration4"];
const WORK_KEYS = ["work1", "work2", "work3", "work4", "work5", "work6", "work7"];
const BRING_KEYS = [
  "bring1",
  "bring2",
  "bring3",
  "bring4",
  "bring5",
  "bring6",
  "bring7",
  "bring8",
  "bring9",
];
const ABOUT_MAX_LENGTH = 200;

const dateInputClassName =
  "w-[100vw] md:w-full h-12 px-4 rounded-lg border border-[#D3D3D3] bg-transparent text-base font-normal text-black placeholder:text-gray-500 outline-none focus:border-black transition-colors";

const inputClassName =
  "w-full h-12 px-4 rounded-lg border border-[#D3D3D3] bg-transparent text-base font-normal text-black placeholder:text-gray-500 outline-none focus:border-black transition-colors";
const textareaClassName =
  "w-full min-h-[120px] px-4 py-3 rounded-lg border border-[#D3D3D3] bg-transparent text-base font-normal text-black placeholder:text-gray-500 outline-none focus:border-black transition-colors resize-y";
const labelClassName =
  "block text-black md:text-[20px] text-[17px]  font-semibold md:mb-2 mb-1";

export default function ApplyToKaliPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("pages.applyPopup");
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState<string | null>("duration4");
  const [aboutYourself, setAboutYourself] = useState("");
  const [workStyle, setWorkStyle] = useState<string | null>(null);
  const [bringToKali, setBringToKali] = useState<string[]>([]);
  const [anythingElse, setAnythingElse] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const overlayTransition = {
    type: "tween",
    duration: 0.3,
    ease: [0.32, 0.72, 0, 1],
  };
  const cardTransition = { type: "spring", stiffness: 400, damping: 32 };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="popup-overlay"
          className="fixed inset-0 flex items-center justify-center p-4 z-[999999]"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            key="popup-card"
            className="w-full max-w-[670px] rounded-[20px] bg-[#FFF2E2] shadow-xl overflow-hidden "
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={cardTransition}
            onClick={(e) => e.stopPropagation()}
          >
            {!isSubmitted && (
              <div className="relative pt-8 pb-4 px-5 md:px-10">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-black top-[20px]  right-[20px] "
                  aria-label={t("closeAriaLabel")}
                >
                  <Image
                    src="/assets/icons/close.svg"
                    alt=""
                    width={17}
                    height={17}
                  />
                </button>
                <>
                  <h2 className="text-black text-2xl md:text-3xl font-bold text-center">
                    {t("title")}
                  </h2>

                  {/* Step indicators */}
                  <div className="flex items-center justify-center gap-2 mt-6">
                    {STEPS.map((s, i) => {
                      const isCompleted = step > s;
                      return (
                        <div key={s} className="flex items-center">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                              step === s
                                ? "bg-red text-white border-red"
                                : isCompleted
                                  ? "bg-transparent"
                                  : "bg-[#ECE2D5] text-black"
                            }`}
                          >
                            {isCompleted ? (
                              <Image
                                src="/assets/icons/salmon-tic.svg"
                                alt=""
                                width={28}
                                height={28}
                                className="w-7 h-7 object-contain"
                              />
                            ) : (
                              <span className="text-sm font-semibold">{s}</span>
                            )}
                          </div>
                          {i < STEPS.length - 1 && (
                            <div
                              className={`w-8 h-[0.5px] ml-2 ${
                                step > s ? "bg-red" : "bg-[#BDBDBD]"
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              </div>
            )}

            {/* Step content / Success - cuando enviado solo esto queda visible */}
            <div className="px-5 md:px-10 pb-8 min-w-0 overflow-hidden">
              {isSubmitted ? (
                <div className="flex flex-col gap-7 items-center text-center py-12">
                  <Image
                    src="/assets/icons/send.svg"
                    alt=""
                    width={64}
                    height={64}
                  />
                  <h2 className="font-bold text-[50px] title text-black">
                    {t("successTitle")}
                  </h2>
                  <p className="text-black text-[20px] leading-[22px]">
                    {t("successMessage1")}
                    <br />
                    {t("successMessage2")}
                  </p>
                </div>
              ) : (
                step === 1 && (
                  <form
                    className="form-no-autofill-bg flex flex-col gap-6 min-w-0"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep(2);
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                      <div>
                        <label htmlFor="apply-name" className={labelClassName}>
                          {t("labelName")}
                        </label>
                        <input
                          id="apply-name"
                          name="name"
                          type="text"
                          placeholder={t("placeholderName")}
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label htmlFor="apply-email" className={labelClassName}>
                          {t("labelEmail")}
                        </label>
                        <input
                          id="apply-email"
                          name="email"
                          type="email"
                          placeholder={t("placeholderEmail")}
                          className={inputClassName}
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="apply-date" className={labelClassName}>
                        {t("labelMoveDate")}
                      </label>
                      <div className="relative min-w-0">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                          <Image
                            src="/assets/icons/date-icon.svg"
                            alt=""
                            width={18}
                            height={18}
                          />
                        </span>
                        <input
                          id="apply-date"
                          name="moveDate"
                          type="date"
                          placeholder={t("placeholderDate")}
                          className={`${dateInputClassName} pl-12 min-w-0 max-w-full`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClassName}>
                        {t("labelDuration")}
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {DURATION_KEYS.map((key) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setDuration(key)}
                            className={`px-5 py-2.5  rounded-full text-base font-medium border transition-colors ${
                              duration === key
                                ? "bg-red text-white font-semibold border-red"
                                : " text-black border-[#d3d3d3] hover:border-gray-400"
                            }`}
                          >
                            {t(key)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red text-white font-semibold hover:bg-red/90 transition-colors"
                      >
                        {t("next")}
                      </button>
                    </div>
                  </form>
                )
              )}

              {step === 2 && (
                <form
                  className="form-no-autofill-bg flex flex-col gap-1"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep(3);
                  }}
                >
                  <div>
                    <label htmlFor="apply-about" className={labelClassName}>
                      {t("labelAbout")}
                    </label>
                    <textarea
                      id="apply-about"
                      name="about"
                      maxLength={ABOUT_MAX_LENGTH}
                      placeholder={t("placeholderAbout")}
                      className={textareaClassName}
                      value={aboutYourself}
                      onChange={(e) => setAboutYourself(e.target.value)}
                    />
                    <p className="mt-1 text-right text-sm text-black">
                      {aboutYourself.length}/{ABOUT_MAX_LENGTH}
                    </p>
                  </div>

                  <div>
                    <label className={labelClassName}>{t("labelWork")}</label>
                    <div className="flex flex-wrap gap-3">
                      {WORK_KEYS.map((key) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setWorkStyle(key)}
                          className={`px-5 py-2.5 rounded-full text-base font-medium border transition-colors ${
                            workStyle === key
                              ? "bg-red text-white font-semibold border-red"
                              : "text-black border-[#d3d3d3] hover:border-gray-400"
                          }`}
                        >
                          {t(key)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 text-black font-semibold hover:underline"
                    >
                      {t("back")}
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red text-white font-semibold hover:bg-red/90 transition-colors"
                    >
                      {t("next")}
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <form
                  className="form-no-autofill-bg flex flex-col gap-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // TODO: submit application (e.g. API call)
                    setIsSubmitted(true);
                  }}
                >
                  <div>
                    <label className={labelClassName}>
                      {t("labelBring")}
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {BRING_KEYS.map((key) => {
                        const isSelected = bringToKali.includes(key);
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() =>
                              setBringToKali((prev) =>
                                isSelected
                                  ? prev.filter((x) => x !== key)
                                  : [...prev, key],
                              )
                            }
                            className={`px-5 py-2.5 rounded-full text-base font-medium border transition-colors ${
                              isSelected
                                ? "bg-red text-white font-semibold border-red"
                                : "text-black border-[#d3d3d3] hover:border-gray-400"
                            }`}
                          >
                            {t(key)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="apply-anything" className={labelClassName}>
                      {t("labelAnything")}
                    </label>
                    <textarea
                      id="apply-anything"
                      name="anythingElse"
                      placeholder={t("placeholderAnything")}
                      className={textareaClassName}
                      value={anythingElse}
                      onChange={(e) => setAnythingElse(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 text-black font-semibold hover:underline"
                    >
                      {t("back")}
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red text-white font-semibold hover:bg-red/90 transition-colors"
                    >
                      {t("submit")}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

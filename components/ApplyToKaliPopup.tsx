"use client";

import { useState } from "react";
import Image from "next/image";

const STEPS = [1, 2, 3];
const DURATION_OPTIONS = ["3 meses", "6 meses", "9 meses", "1 año o más"];

const inputClassName =
  "w-full h-12 px-4 rounded-lg border border-[#D3D3D3] bg-[#ECE2D5]/30 text-base font-normal text-black placeholder:text-gray-500 outline-none focus:border-black transition-colors";
const labelClassName = "block text-black text-xl font-semibold mb-2";

export default function ApplyToKaliPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState<string | null>("1 año o más");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(12px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-[670px] rounded-[20px] bg-[#FFF2E2] shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative pt-8 pb-4 px-6 md:px-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-black"
            style={{ top: "50px", right: "50px" }}
            aria-label="Cerrar"
          >
            <Image
              src="/assets/icons/close.svg"
              alt=""
              width={17}
              height={17}
            />
          </button>
          <h2 className="text-black text-2xl md:text-3xl font-bold text-center">
            Apply to Kali
          </h2>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold  ${
                    step === s
                      ? "bg-red text-white border-red"
                      : "bg-[#ECE2D5] text-black "
                  }`}
                >
                  {s}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-8 h-[0.5px] ml-2 ${
                      step > s ? "bg-red" : "bg-[#BDBDBD]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="px-6 md:px-10 pb-8">
          {step === 1 && (
            <form
              className="form-no-autofill-bg flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="apply-name" className={labelClassName}>
                    Your Name
                  </label>
                  <input
                    id="apply-name"
                    name="name"
                    type="text"
                    placeholder="Luke Gordon"
                    className={inputClassName}
                    style={{ fontSize: "16px" }}
                  />
                </div>
                <div>
                  <label htmlFor="apply-email" className={labelClassName}>
                    Email address
                  </label>
                  <input
                    id="apply-email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    className={inputClassName}
                    style={{ fontSize: "16px" }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="apply-date" className={labelClassName}>
                  When are you looking to move?
                </label>
                <div className="relative">
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
                    placeholder="Pick a date"
                    className={`${inputClassName} pl-12`}
                    style={{ fontSize: "16px" }}
                  />
                </div>
              </div>

              <div>
                <label className={labelClassName}>
                  For how long are you planning to stay?
                </label>
                <div className="flex flex-wrap gap-3">
                  {DURATION_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setDuration(opt)}
                      className={`px-5 py-2.5  rounded-full text-base font-medium border transition-colors ${
                        duration === opt
                          ? "bg-red text-white font-semibold border-red"
                          : " text-black border-[#d3d3d3] hover:border-gray-400"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation - Step 1: solo Next */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red text-white font-semibold hover:bg-red/90 transition-colors"
                >
                  Next →
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="py-8 text-center text-gray-500">
              Step 2 — Coming soon
              <div className="flex items-center justify-between pt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-black font-semibold hover:underline"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red text-white font-semibold"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-8 text-center text-gray-500">
              Step 3 — Coming soon
              <div className="flex items-center justify-between pt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 text-black font-semibold hover:underline"
                >
                  ← Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

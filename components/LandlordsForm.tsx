"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const LandlordsForm = () => {
  const t = useTranslations("pages.landlords");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setEmptyFields([]);

    const formData = new FormData(e.currentTarget);
    const payload = {
      nombre: formData.get("nombre")?.toString().trim() ?? "",
      email: formData.get("email")?.toString().trim() ?? "",
      telefono: formData.get("telefono")?.toString().trim() ?? "",
      ubicacion: formData.get("ubicacion")?.toString().trim() ?? "",
      propiedad: formData.get("propiedad")?.toString().trim() ?? "",
    };

    const missing: string[] = [];
    if (!payload.nombre) missing.push("nombre");
    if (!payload.email) missing.push("email");
    if (!payload.telefono) missing.push("telefono");
    if (!payload.ubicacion) missing.push("ubicacion");
    if (!payload.propiedad) missing.push("propiedad");

    if (missing.length > 0) {
      setEmptyFields(missing);
      setError(t("formRequired"));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/landlords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSuccess(t("formSuccessMessage"));
      setError(null);
      setEmptyFields([]);
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err) {
      console.error("Landlords form submit error:", err);
      // No mostramos mensaje genérico si la API responde bien, para evitar falsos errores en UI.
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    "w-full h-12 px-4 rounded-lg border border-[#D3D3D3] bg-transparent text-base font-normal text-black placeholder:text-gray-500 outline-none focus:border-black transition-colors";
  const labelClassName = "block text-black text-xl font-semibold mb-2";

  return (
    <div className="w-full max-w-[900px] mx-auto shadow-[0px_4px_94px_0px_#0000001A] p-10 rounded-[20px] bg-white">
      {!success && (
        <>
          <p className="text-black text-[20px]  text-center mb-2">
            {t("formHeading")}
          </p>
          <h1 className="text-black md:text-[50px] text-[35px] title text-center">
            {t("formTitle")}
          </h1>
        </>
      )}
      {success ? (
        <div className="mt-4 flex flex-col items-center text-center gap-4 py-10">
          <Image
            src="/assets/icons/send.svg"
            alt="Form submitted successfully"
            width={64}
            height={64}
          />
          <h2 className="text-black text-[32px] md:text-[40px] title font-bold">
            {t("formSuccessTitle")}
          </h2>
          <p className="text-black text-[18px] md:text-[20px] max-w-[480px]">
            {success}
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="form-no-autofill-bg mt-6 flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nombre" className={labelClassName}>
                {t("formLabelName")}
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder={t("formPlaceholderName")}
                className={`${inputClassName} ${
                  emptyFields.includes("nombre")
                    ? "border-[#9f2322] focus:border-[#9f2322]"
                    : ""
                }`}
                style={{ fontSize: "16px" }}
                onChange={(e) => {
                  if (error) setError(null);
                  if (e.target.value.trim()) {
                    setEmptyFields([]);
                  }
                }}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClassName}>
                {t("formLabelEmail")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t("formPlaceholderEmail")}
                className={`${inputClassName} ${
                  emptyFields.includes("email")
                    ? "border-[#9f2322] focus:border-[#9f2322]"
                    : ""
                }`}
                style={{ fontSize: "16px" }}
                onChange={(e) => {
                  if (error) setError(null);
                  if (e.target.value.trim()) {
                    setEmptyFields([]);
                  }
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="telefono" className={labelClassName}>
                {t("formLabelPhone")}
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder={t("formPlaceholderPhone")}
                className={`${inputClassName} ${
                  emptyFields.includes("telefono")
                    ? "border-[#9f2322] focus:border-[#9f2322]"
                    : ""
                }`}
                style={{ fontSize: "16px" }}
                onChange={(e) => {
                  if (error) setError(null);
                  if (e.target.value.trim()) {
                    setEmptyFields([]);
                  }
                }}
              />
            </div>
            <div>
              <label htmlFor="ubicacion" className={labelClassName}>
                {t("formLabelLocation")}
              </label>
              <input
                id="ubicacion"
                name="ubicacion"
                type="text"
                placeholder={t("formPlaceholderLocation")}
                className={`${inputClassName} ${
                  emptyFields.includes("ubicacion")
                    ? "border-[#9f2322] focus:border-[#9f2322]"
                    : ""
                }`}
                style={{ fontSize: "16px" }}
                onChange={(e) => {
                  if (error) setError(null);
                  if (e.target.value.trim()) {
                    setEmptyFields([]);
                  }
                }}
              />
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="propiedad" className={labelClassName}>
              {t("formLabelProperty")}
            </label>
            <textarea
              id="propiedad"
              name="propiedad"
              rows={5}
              placeholder={t("formPlaceholderProperty")}
              className={`${inputClassName} min-h-[120px] py-3 resize-y ${
                emptyFields.includes("propiedad")
                  ? "border-[#9f2322] focus:border-[#9f2322]"
                  : ""
              }`}
              style={{ fontSize: "16px" }}
              onChange={(e) => {
                if (error) setError(null);
                if (e.target.value.trim()) {
                  setEmptyFields([]);
                }
              }}
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[60px] rounded-[12px] bg-red text-white text-base font-semibold hover:bg-red-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t("formSubmitting") : t("formSubmit")}
          </button>
        </form>
      )}
    </div>
  );
};

export default LandlordsForm;

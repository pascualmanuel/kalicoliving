"use client";

import { useTranslations } from "next-intl";

const LandlordsForm = () => {
  const t = useTranslations("pages.landlords");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: handle form submission
  };

  const inputClassName =
    "w-full h-12 px-4 rounded-lg border border-[#D3D3D3] bg-transparent text-base font-normal text-black placeholder:text-gray-500 outline-none focus:border-black transition-colors";
  const labelClassName = "block text-black text-xl font-semibold mb-2";

  return (
    <div className="w-full max-w-[900px] mx-auto shadow-[0px_4px_94px_0px_#0000001A] p-10 rounded-[20px] bg-white">
      <p className="text-black text-[20px]  text-center mb-2">
        {t("formHeading")}
      </p>
      <h1 className="text-black md:text-[50px] text-[35px] title text-center">
        {t("formTitle")}
      </h1>
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
              className={inputClassName}
              style={{ fontSize: "16px" }}
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
              className={inputClassName}
              style={{ fontSize: "16px" }}
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
              className={inputClassName}
              style={{ fontSize: "16px" }}
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
              className={inputClassName}
              style={{ fontSize: "16px" }}
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
            className={`${inputClassName} min-h-[120px] py-3 resize-y`}
            style={{ fontSize: "16px" }}
          />
        </div>

        <button
          type="submit"
          className="w-full h-[60px] rounded-[12px] bg-red text-white text-base font-semibold hover:bg-red-hover transition-colors"
        >
          {t("formSubmit")}
        </button>
      </form>
    </div>
  );
};

export default LandlordsForm;

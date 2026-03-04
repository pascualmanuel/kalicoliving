"use client";

const LandlordsForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: handle form submission
  };

  const inputClassName =
    "w-full h-12 px-4 rounded-lg border border-[#D3D3D3] bg-transparent text-base font-normal text-black placeholder:text-gray-500 outline-none focus:border-black transition-colors";
  const labelClassName = "block text-black text-xl font-semibold mb-2";

  return (
    <div className="w-full max-w-[900px] mx-auto shadow-[0px_4px_94px_0px_#0000001A] p-10 rounded-[20px] bg-white">
      <p className="text-black text-[20px]  text-center">Hablemos</p>
      <h1 className="text-black text-[50px] title text-center">
        Alquila tu piso sin preocupaciones
      </h1>
      <form
        onSubmit={handleSubmit}
        className="form-no-autofill-bg mt-6 flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre" className={labelClassName}>
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Tu nombre"
              className={inputClassName}
              style={{ fontSize: "16px" }}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClassName}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              className={inputClassName}
              style={{ fontSize: "16px" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="telefono" className={labelClassName}>
              Teléfono
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              placeholder="+34 600 000 000"
              className={inputClassName}
              style={{ fontSize: "16px" }}
            />
          </div>
          <div>
            <label htmlFor="ubicacion" className={labelClassName}>
              Ubicación de tu propiedad
            </label>
            <input
              id="ubicacion"
              name="ubicacion"
              type="text"
              placeholder="Dirección o zona"
              className={inputClassName}
              style={{ fontSize: "16px" }}
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="propiedad" className={labelClassName}>
            Cuéntanos sobre tu propiedad
          </label>
          <textarea
            id="propiedad"
            name="propiedad"
            rows={5}
            placeholder="Descripción, características, etc."
            className={`${inputClassName} min-h-[120px] py-3 resize-y`}
            style={{ fontSize: "16px" }}
          />
        </div>

        <button
          type="submit"
          className="w-full h-[60px] rounded-[12px] bg-red text-white text-base font-semibold hover:bg-red/90 transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default LandlordsForm;

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "pages.privacyPolicy" });
  const title = `${t("title")} – Kali Coliving`;

  return {
    title,
  };
}

const content = {
  intro: {
    company: "KALIMERA CO-LIVING SL — Kali",
    lastUpdate: "Última actualización: 10 de marzo de 2026",
    paragraph:
      "En Kali nos tomamos muy en serio la privacidad de las personas que interactúan con nosotros. La presente Política de Privacidad explica qué datos personales recogemos, con qué finalidad los tratamos, cuánto tiempo los conservamos y qué derechos tienes como usuario. Te recomendamos leerla con atención antes de facilitarnos cualquier dato personal.",
  },
  sections: [
    {
      title: "¿Quién es el responsable del tratamiento de tus datos?",
      body: [
        "Razón social: KALIMERA CO-LIVING SL",
        "NIF: B21734132",
        "Domicilio: Calle Espronceda 121 G, 28003, Madrid, España",
        "Email de contacto: lorenzopascual@kalicolivings.com",
        "Sitio web: https://kalicoliving.com",
      ],
    },
    {
      title: "¿Qué datos personales recogemos?",
      intro:
        "Dependiendo de cómo interactúes con nuestro sitio web, podemos recoger los siguientes datos:",
      subsections: [
        {
          title: "2.1 Futuros residentes (formulario de solicitud de plaza)",
          items: [
            "Nombre y apellidos",
            "Dirección de correo electrónico",
            "Número de teléfono",
            "Información sobre tus preferencias de alojamiento y sobre ti mismo (campo libre)",
          ],
        },
        {
          title: "2.2 Propietarios de inmuebles (formulario de contacto)",
          items: [
            "Nombre y apellidos",
            "Dirección de correo electrónico",
            "Número de teléfono",
            "Información sobre la propiedad: ubicación, características y descripción general",
          ],
        },
        {
          title: "2.3 Datos de navegación (todos los usuarios)",
          items: [
            "Dirección IP",
            "Tipo de navegador y dispositivo",
            "Páginas visitadas y tiempo de permanencia",
            "Origen del tráfico (campañas publicitarias, redes sociales, búsqueda orgánica, etc.)",
          ],
        },
      ],
      outro:
        "Estos datos se recogen a través de cookies y herramientas de análisis. Para más información, consulta nuestra Política de Cookies.",
    },
    {
      title: "¿Para qué usamos tus datos y con qué base legal?",
      subsections: [
        {
          title: "3.1 Gestión de solicitudes de plaza (residentes)",
          items: [
            "Finalidad: Evaluar tu solicitud, ponernos en contacto contigo y gestionar el proceso de incorporación a la comunidad Kali.",
            "Base legitimadora: Ejecución de medidas precontractuales a petición del interesado (art. 6.1.b RGPD).",
          ],
        },
        {
          title: "3.2 Gestión de solicitudes de propietarios",
          items: [
            "Finalidad: Analizar la viabilidad de la propiedad, presentar una propuesta de gestión y formalizar el acuerdo.",
            "Base legitimadora: Ejecución de medidas precontractuales a petición del interesado (art. 6.1.b RGPD).",
          ],
        },
        {
          title: "3.3 Comunicaciones comerciales y seguimiento",
          items: [
            "Finalidad: Enviarte información sobre espacios disponibles, novedades de la comunidad Kali u otras comunicaciones de interés, siempre que hayas dado tu consentimiento.",
            "Base legitimadora: Consentimiento del interesado (art. 6.1.a RGPD). Puedes retirar tu consentimiento en cualquier momento sin que ello afecte a la licitud del tratamiento previo.",
          ],
        },
        {
          title: "3.4 Análisis web y mejora del sitio",
          items: [
            "Finalidad: Comprender cómo los usuarios interactúan con el sitio web para mejorar su funcionamiento, contenidos y experiencia de usuario.",
            "Base legitimadora: Interés legítimo de KALIMERA CO-LIVING SL (art. 6.1.f RGPD) y, en el caso de cookies no esenciales, consentimiento del usuario.",
          ],
        },
        {
          title: "3.5 Publicidad segmentada",
          items: [
            "Finalidad: Mostrar anuncios relevantes en plataformas como Google y Meta (Facebook/Instagram) a personas con intereses similares a los de nuestra comunidad.",
            "Base legitimadora: Consentimiento del interesado (art. 6.1.a RGPD), obtenido a través del panel de preferencias de cookies.",
          ],
        },
      ],
    },
    {
      title: "¿Qué herramientas de terceros utilizamos?",
      intro:
        "Para ofrecer un servicio de calidad y optimizar nuestra presencia digital, utilizamos las siguientes herramientas de terceros, que pueden acceder a determinados datos de navegación:",
      list: [
        {
          name: "Google Analytics (Google LLC)",
          desc: "Análisis de tráfico web y comportamiento de usuario. Más información en policies.google.com/privacy.",
          url: "https://policies.google.com/privacy",
        },
        {
          name: "Meta Pixel (Meta Platforms Ireland Ltd.)",
          desc: "Seguimiento de conversiones y publicidad en Facebook e Instagram. Más información en es-es.facebook.com/privacy/policy.",
          url: "https://es-es.facebook.com/privacy/policy",
        },
        {
          name: "Google Ads (Google LLC)",
          desc: "Gestión y seguimiento de campañas publicitarias en Google. Más información en policies.google.com/privacy.",
          url: "https://policies.google.com/privacy",
        },
        {
          name: "CRM — HubSpot / Mailchimp",
          desc: "Gestión de contactos y comunicaciones. Más información en la política de privacidad del proveedor correspondiente.",
          url: null,
        },
      ],
      outro:
        "Todas estas herramientas actúan como encargados del tratamiento y solo acceden a los datos necesarios para prestar el servicio para el que han sido contratadas.",
    },
    {
      title: "¿Cuánto tiempo conservamos tus datos?",
      items: [
        "Datos de formularios de contacto y solicitud: se conservan durante el tiempo necesario para gestionar tu solicitud y, en caso de relación contractual, durante la vigencia del contrato y los plazos legales de prescripción aplicables (generalmente 5 años).",
        "Datos para comunicaciones comerciales: hasta que retires tu consentimiento o solicites la supresión.",
        "Datos de navegación y cookies: según lo indicado en nuestra Política de Cookies, con un máximo de 13 meses para cookies analíticas.",
      ],
    },
    {
      title: "¿Con quién compartimos tus datos?",
      paragraphs: [
        "KALIMERA CO-LIVING SL no vende ni cede tus datos personales a terceros con fines comerciales propios. Sin embargo, puede compartir datos con:",
        "Proveedores de servicios tecnológicos (hosting, CRM, herramientas de análisis) que actúan como encargados del tratamiento bajo contrato y garantías adecuadas.",
        "Autoridades públicas o tribunales, cuando así lo exija la legislación vigente.",
        "Algunas de las herramientas mencionadas implican transferencias internacionales de datos (por ejemplo, a Estados Unidos). En estos casos, KALIMERA CO-LIVING SL se asegura de que dichas transferencias se realicen bajo garantías adecuadas, como las Cláusulas Contractuales Tipo aprobadas por la Comisión Europea o el Marco de Privacidad de Datos UE-EE.UU.",
      ],
    },
    {
      title: "¿Cuáles son tus derechos?",
      intro: "De conformidad con el RGPD y la LOPD-GDD, tienes derecho a:",
      items: [
        "Acceso: conocer qué datos tuyos tratamos y obtener una copia de ellos.",
        "Rectificación: corregir datos inexactos o incompletos.",
        "Supresión: solicitar la eliminación de tus datos cuando ya no sean necesarios.",
        "Oposición: oponerte al tratamiento de tus datos en determinadas circunstancias.",
        "Limitación del tratamiento: solicitar que suspendamos el uso de tus datos en ciertos supuestos.",
        "Portabilidad: recibir tus datos en un formato estructurado y de uso común.",
        "Retirada del consentimiento: en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.",
      ],
      paragraphs: [
        "Para ejercer cualquiera de estos derechos, puedes dirigirte a nosotros por escrito a la dirección postal o al email indicados en el apartado 1. Deberás acreditar tu identidad adjuntando una copia de tu DNI o documento equivalente.",
        "Si consideras que el tratamiento de tus datos vulnera la normativa vigente, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD): www.aepd.es.",
      ],
    },
    {
      title: "¿Cómo protegemos tus datos?",
      paragraph:
        "KALIMERA CO-LIVING SL aplica medidas técnicas y organizativas adecuadas para garantizar la seguridad de tus datos personales y evitar su pérdida, alteración, acceso no autorizado o tratamiento ilícito. Entre otras, utilizamos conexiones cifradas (HTTPS), acceso restringido a los datos por parte del personal autorizado y acuerdos de confidencialidad con nuestros proveedores.",
    },
    {
      title: "Menores de edad",
      paragraph:
        "El sitio web de Kali no está dirigido a menores de 14 años. KALIMERA CO-LIVING SL no recoge conscientemente datos personales de menores. Si tienes conocimiento de que un menor nos ha facilitado datos sin el consentimiento de sus tutores, te rogamos que lo comuniques a través de nuestro email de contacto para proceder a su eliminación.",
    },
    {
      title: "Modificaciones de la Política de Privacidad",
      paragraph:
        "KALIMERA CO-LIVING SL se reserva el derecho a actualizar la presente Política de Privacidad para adaptarla a cambios legislativos, jurisprudenciales o de negocio. Cualquier modificación será publicada en esta página con indicación de la fecha de última actualización. Te recomendamos revisarla periódicamente.",
    },
    {
      title: "Contacto",
      paragraph:
        "Si tienes cualquier pregunta sobre esta Política de Privacidad o sobre el tratamiento de tus datos, puedes contactarnos en:",
      contact: [
        "Email: lorenzo.pascual@kalicolivings.com",
        "Dirección postal: Calle Espronceda 121 G, 28003, Madrid, España",
        "Sitio web: https://kalicoliving.com",
      ],
    },
  ],
};

export default async function PrivacyPolicyPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "pages.privacyPolicy" });

  return (
    <>
      <main className="min-h-screen bg-[#FFF2E2]">
        <article className="w-full px-5 py-12 sm:px-8 md:px-16 lg:px-24 md:py-16 lg:py-20">
          <div className="mx-auto max-w-[720px]">
            {/* Header */}
            <header className="mb-12 md:mb-16 mt-20">
              <h1 className="title mb-4 text-[28px] font-bold leading-tight text-[#272727] sm:text-[36px] md:text-[44px]">
                {t("title")}
              </h1>
              <p className="text-sm font-medium uppercase tracking-wide text-[#272727]/70 md:text-base">
                {content.intro.company}
              </p>
              <p className="mt-1 text-sm text-[#272727]/60 md:text-base">
                {content.intro.lastUpdate}
              </p>
              <p className="mt-6 text-[#272727]/90 leading-[1.65] md:text-lg md:leading-[1.7]">
                {content.intro.paragraph}
              </p>
            </header>

            {/* Sections */}
            <div className="space-y-12 md:space-y-14">
              {content.sections.map((section, index) => (
                <section
                  key={index}
                  className="border-b border-[#272727]/10 pb-10 last:border-0 last:pb-0 md:pb-12"
                >
                  <h2 className="title mb-5 text-xl font-bold text-[#272727] sm:text-2xl md:mb-6 md:text-[28px]">
                    {index + 1}. {section.title}
                  </h2>

                  {"intro" in section && section.intro && (
                    <p className="mb-4 text-[#272727]/90 leading-[1.65] md:mb-5 md:text-lg md:leading-[1.7]">
                      {section.intro}
                    </p>
                  )}

                  {"body" in section && section.body && (
                    <ul className="space-y-2 text-[#272727]/90 leading-[1.65] md:text-lg md:leading-[1.7]">
                      {section.body.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}

                  {"paragraph" in section && section.paragraph && (
                    <p className="text-[#272727]/90 leading-[1.65] md:text-lg md:leading-[1.7]">
                      {section.paragraph}
                    </p>
                  )}

                  {"items" in section && section.items && (
                    <ul className="mt-4 space-y-3 text-[#272727]/90 leading-[1.65] md:mt-5 md:space-y-4 md:text-lg md:leading-[1.7]">
                      {section.items.map((item, i) => (
                        <li
                          key={i}
                          className="relative pl-5 before:absolute before:left-0 before:content-['·'] before:font-bold before:text-[#272727]/50"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {"paragraphs" in section && section.paragraphs && (
                    <div className="mt-6 space-y-4 md:mt-8">
                      {section.paragraphs.map((p, i) => (
                        <p
                          key={i}
                          className="text-[#272727]/90 leading-[1.65] md:text-lg md:leading-[1.7]"
                        >
                          {p.includes("www.aepd.es") ? (
                            <>
                              {p.split("www.aepd.es")[0]}
                              <a
                                href="https://www.aepd.es"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-[#272727]/40 underline-offset-2 transition-colors hover:decoration-[#272727]"
                              >
                                www.aepd.es
                              </a>
                              {p.split("www.aepd.es")[1]}
                            </>
                          ) : (
                            p
                          )}
                        </p>
                      ))}
                    </div>
                  )}

                  {"subsections" in section &&
                    section.subsections?.map((sub, subIndex) => (
                      <div key={subIndex} className="mt-6 md:mt-8">
                        <h3 className="title mb-3 text-base font-semibold text-[#272727] sm:text-lg md:mb-4">
                          {sub.title}
                        </h3>
                        <ul className="space-y-2 pl-0 text-[#272727]/90 leading-[1.65] md:space-y-2.5 md:text-lg md:leading-[1.7]">
                          {sub.items.map((item, i) => (
                            <li key={i} className="pl-0">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                  {"list" in section &&
                    section.list &&
                    section.list.some(
                      (x: unknown) =>
                        typeof x === "object" && x !== null && "name" in x,
                    ) && (
                      <ul className="space-y-4 md:space-y-5">
                        {section.list.map(
                          (
                            item: {
                              name: string;
                              desc: string;
                              url: string | null;
                            },
                            i: number,
                          ) => (
                            <li
                              key={i}
                              className="text-[#272727]/90 leading-[1.65] md:text-lg md:leading-[1.7]"
                            >
                              {item.url ? (
                                <>
                                  <strong className="font-semibold text-[#272727]">
                                    {item.name}:
                                  </strong>{" "}
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline decoration-[#272727]/40 underline-offset-2 transition-colors hover:decoration-[#272727]"
                                  >
                                    {item.desc}
                                  </a>
                                </>
                              ) : (
                                <>
                                  <strong className="font-semibold text-[#272727]">
                                    {item.name}:
                                  </strong>{" "}
                                  {item.desc}
                                </>
                              )}
                            </li>
                          ),
                        )}
                      </ul>
                    )}

                  {"contact" in section && section.contact && (
                    <ul className="mt-4 space-y-1 text-[#272727]/90 leading-[1.65] md:mt-5 md:text-lg md:leading-[1.7]">
                      {section.contact.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}

                  {"outro" in section && section.outro && (
                    <p className="mt-5 text-[#272727]/90 leading-[1.65] md:mt-6 md:text-lg md:leading-[1.7]">
                      {section.outro.includes("Política de Cookies") ? (
                        <>
                          {section.outro.split("Política de Cookies")[0]}
                          <Link
                            href="/cookies"
                            className="underline decoration-[#272727]/40 underline-offset-2 transition-colors hover:decoration-[#272727]"
                          >
                            Política de Cookies
                          </Link>
                          {section.outro.split("Política de Cookies")[1]}
                        </>
                      ) : (
                        section.outro
                      )}
                    </p>
                  )}
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

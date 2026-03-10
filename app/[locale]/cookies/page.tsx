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
  const t = await getTranslations({ locale, namespace: "pages.cookies" });
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
      "Esta Política de Cookies explica qué son las cookies, qué tipos utilizamos en kalicoliving.com, para qué sirven y cómo puedes gestionarlas. Te recomendamos leerla junto con nuestra Política de Privacidad.",
  },
  sections: [
    {
      title: "¿Qué son las cookies?",
      paragraph:
        "Las cookies son pequeños archivos de texto que se descargan en tu dispositivo (ordenador, tablet o móvil) cuando visitas nuestro sitio web. Permiten al sitio recordar tus preferencias, mejorar la navegación y analizar el uso que haces de la web. Las cookies pueden ser de sesión (se borran al cerrar el navegador) o persistentes (permanecen un tiempo determinado). Solo se asocian a un usuario anónimo y a su dispositivo; por sí solas no permiten identificar datos personales sin información adicional.",
    },
    {
      title: "Marco legal",
      paragraph:
        "El uso de cookies en relación con la prestación de servicios de la sociedad de la información está regulado en España por la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE) y por el Real Decreto Ley 13/2012, de 30 de marzo. Las cookies técnicas y las estrictamente necesarias para el funcionamiento del sitio no requieren consentimiento previo; las analíticas y publicitarias sí. Al continuar navegando en nuestro sitio, aceptas el uso de las cookies según lo descrito en esta política.",
    },
    {
      title: "Tipos de cookies que utilizamos",
      intro:
        "En función de su finalidad y titularidad, utilizamos las siguientes categorías:",
      subsections: [
        {
          title: "Cookies necesarias o técnicas",
          items: [
            "Son imprescindibles para el correcto funcionamiento del sitio (por ejemplo, preferencia de idioma, gestión de sesión o seguridad). No requieren consentimiento y no pueden desactivarse si quieres usar la web con normalidad.",
          ],
        },
        {
          title: "Cookies de personalización",
          items: [
            "Permiten recordar opciones como el idioma o la región para que no tengas que configurarlas cada vez que nos visitas.",
          ],
        },
        {
          title: "Cookies analíticas",
          items: [
            "Recogen información sobre cómo se usa el sitio (páginas visitadas, tiempo de permanencia, origen del tráfico) de forma agregada y, en su caso, anónima. Nos ayudan a mejorar contenidos y experiencia de usuario. Solo se cargan con tu consentimiento.",
          ],
        },
        {
          title: "Cookies publicitarias o de marketing",
          items: [
            "Permiten mostrar anuncios relevantes en plataformas como Google o Meta (Facebook/Instagram) y medir la eficacia de las campañas. Solo se utilizan con tu consentimiento.",
          ],
        },
      ],
    },
    {
      title: "Listado de cookies utilizadas",
      intro:
        "A continuación se detallan las cookies que pueden instalarse en tu dispositivo al usar kalicoliving.com. La lista puede actualizarse si incorporamos nuevas funcionalidades o proveedores.",
      cookieGroups: [
        {
          name: "Cookies necesarias (propias)",
          cookies: [
            { name: "NEXT_LOCALE", purpose: "Guardar preferencia de idioma.", duration: "1 año", type: "Propia" },
            { name: "Cookies de sesión", purpose: "Mantener la sesión y la seguridad durante la navegación.", duration: "Sesión", type: "Propia" },
          ],
        },
        {
          name: "Cookies analíticas (Google Analytics 4)",
          cookies: [
            { name: "_ga", purpose: "Distinguir usuarios. Análisis de uso del sitio.", duration: "2 años", type: "Terceros (Google LLC)" },
            { name: "_ga_*", purpose: "Persistencia de sesión en Google Analytics.", duration: "2 años", type: "Terceros (Google LLC)" },
            { name: "_gid", purpose: "Distinguir usuarios.", duration: "24 horas", type: "Terceros (Google LLC)" },
          ],
        },
        {
          name: "Cookies publicitarias (Meta Pixel)",
          cookies: [
            { name: "_fbp", purpose: "Publicidad y medición en Facebook/Instagram.", duration: "3 meses", type: "Terceros (Meta Platforms)" },
            { name: "_fbc", purpose: "Atribución de conversiones desde anuncios de Facebook.", duration: "3 meses", type: "Terceros (Meta Platforms)" },
          ],
        },
        {
          name: "Cookies publicitarias (Google Ads)",
          cookies: [
            { name: "_gcl_au", purpose: "Almacenar información de campañas de Google Ads.", duration: "3 meses", type: "Terceros (Google LLC)" },
            { name: "IDE", purpose: "Mostrar anuncios y medir rendimiento en la Red de Display de Google.", duration: "13 meses", type: "Terceros (Google LLC)" },
          ],
        },
      ],
      outro:
        "Los datos obtenidos mediante estas cookies pueden compartirse con los proveedores indicados según sus propias políticas. Para más detalle sobre el tratamiento de datos personales, consulta nuestra Política de Privacidad.",
    },
    {
      title: "Herramientas de terceros",
      intro:
        "Utilizamos las siguientes herramientas que pueden instalar cookies o tecnologías similares en tu dispositivo:",
      list: [
        {
          name: "Google Analytics 4 (Google LLC)",
          desc: "Análisis de tráfico y comportamiento en el sitio. Más información en policies.google.com/privacy.",
          url: "https://policies.google.com/privacy",
        },
        {
          name: "Meta Pixel (Meta Platforms Ireland Ltd.)",
          desc: "Seguimiento de conversiones y publicidad en Facebook e Instagram. Más información en es-es.facebook.com/privacy/policy.",
          url: "https://es-es.facebook.com/privacy/policy",
        },
        {
          name: "Google Ads (Google LLC)",
          desc: "Gestión y seguimiento de campañas publicitarias. Más información en policies.google.com/privacy.",
          url: "https://policies.google.com/privacy",
        },
        {
          name: "HubSpot / Mailchimp",
          desc: "Gestión de contactos y comunicaciones (formularios, newsletters). Consulta la política de privacidad del proveedor correspondiente.",
          url: null,
        },
      ],
    },
    {
      title: "Consentimiento y gestión de cookies",
      paragraphs: [
        "Las cookies no esenciales (analíticas y publicitarias) solo se instalan con tu consentimiento. En la actualidad no disponemos de un banner de cookies en el sitio; mientras tanto, puedes gestionar o revocar el consentimiento mediante la configuración de tu navegador.",
        "Puedes permitir, bloquear o eliminar las cookies desde las opciones de privacidad o seguridad de tu navegador. Cada navegador tiene instrucciones propias (Chrome, Firefox, Safari, Edge, etc.). Si bloqueas las cookies, es posible que algunas partes del sitio no funcionen correctamente.",
        "Para más información sobre cómo gestionar cookies en tu navegador, puedes visitar aboutcookies.org o la sección de ayuda de tu navegador.",
      ],
    },
    {
      title: "Conservación de las cookies",
      items: [
        "Las cookies de sesión se eliminan al cerrar el navegador.",
        "Las cookies persistentes se mantienen durante el plazo indicado en el listado anterior (por ejemplo, hasta 13 meses para cookies analíticas, según nuestra Política de Privacidad) o hasta que las borres manualmente.",
        "Las preferencias de consentimiento, cuando se implemente un mecanismo de gestión en el sitio, se conservarán según el periodo que se indique en ese momento.",
      ],
    },
    {
      title: "Modificaciones",
      paragraph:
        "KALIMERA CO-LIVING SL puede actualizar esta Política de Cookies para adaptarla a cambios normativos, jurisprudenciales o de los servicios utilizados. Cualquier cambio se publicará en esta página con la nueva fecha de última actualización. Te recomendamos revisarla de forma periódica.",
    },
    {
      title: "Contacto",
      paragraph:
        "Si tienes dudas sobre el uso de cookies o sobre esta política, puedes contactarnos en:",
      contact: [
        "Email: lorenzopascual@kalicolivings.com",
        "Dirección postal: Calle Espronceda 121 G, 28003, Madrid, España",
        "Sitio web: https://kalicoliving.com",
      ],
    },
  ],
};

export default async function CookiesPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "pages.cookies" });

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

                  {"paragraph" in section && section.paragraph && (
                    <p className="text-[#272727]/90 leading-[1.65] md:text-lg md:leading-[1.7]">
                      {section.paragraph}
                    </p>
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

                  {"cookieGroups" in section && section.cookieGroups && (
                    <div className="mt-6 space-y-8 md:mt-8 md:space-y-10">
                      {section.cookieGroups.map((group, gi) => (
                        <div key={gi}>
                          <h3 className="title mb-3 text-base font-semibold text-[#272727] sm:text-lg md:mb-4">
                            {group.name}
                          </h3>
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[480px] border-collapse text-left text-[#272727]/90 md:text-base">
                              <thead>
                                <tr className="border-b border-[#272727]/20">
                                  <th className="pb-2 pr-3 font-semibold text-[#272727] md:pb-3">Cookie</th>
                                  <th className="pb-2 pr-3 font-semibold text-[#272727] md:pb-3">Finalidad</th>
                                  <th className="pb-2 pr-3 font-semibold text-[#272727] md:pb-3">Duración</th>
                                  <th className="pb-2 font-semibold text-[#272727] md:pb-3">Tipo</th>
                                </tr>
                              </thead>
                              <tbody className="leading-[1.6]">
                                {group.cookies.map((c, ci) => (
                                  <tr key={ci} className="border-b border-[#272727]/10">
                                    <td className="py-2.5 pr-3 font-medium text-[#272727] md:py-3">{c.name}</td>
                                    <td className="py-2.5 pr-3 md:py-3">{c.purpose}</td>
                                    <td className="py-2.5 pr-3 md:py-3">{c.duration}</td>
                                    <td className="py-2.5 md:py-3">{c.type}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {"outro" in section && section.outro && (
                    <p className="mt-5 text-[#272727]/90 leading-[1.65] md:mt-6 md:text-lg md:leading-[1.7]">
                      {section.outro.includes("Política de Privacidad") ? (
                        <>
                          {section.outro.split("Política de Privacidad")[0]}
                          <Link
                            href="/privacy-policy"
                            className="underline decoration-[#272727]/40 underline-offset-2 transition-colors hover:decoration-[#272727]"
                          >
                            Política de Privacidad
                          </Link>
                          {section.outro.split("Política de Privacidad")[1]}
                        </>
                      ) : (
                        section.outro
                      )}
                    </p>
                  )}

                  {"list" in section &&
                    section.list &&
                    section.list.some((x: unknown) => typeof x === "object" && x !== null && "name" in x) && (
                    <ul className="mt-4 space-y-4 md:space-y-5">
                      {section.list.map((item: { name: string; desc: string; url: string | null }, i: number) => (
                        <li key={i} className="text-[#272727]/90 leading-[1.65] md:text-lg md:leading-[1.7]">
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
                      ))}
                    </ul>
                  )}

                  {"paragraphs" in section && section.paragraphs && (
                    <div className="mt-4 space-y-4 md:mt-5">
                      {section.paragraphs.map((p, i) => (
                        <p
                          key={i}
                          className="text-[#272727]/90 leading-[1.65] md:text-lg md:leading-[1.7]"
                        >
                          {p.includes("aboutcookies.org") ? (
                            <>
                              {p.split("aboutcookies.org")[0]}
                              <a
                                href="https://www.aboutcookies.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-[#272727]/40 underline-offset-2 transition-colors hover:decoration-[#272727]"
                              >
                                aboutcookies.org
                              </a>
                              {p.split("aboutcookies.org")[1]}
                            </>
                          ) : (
                            p
                          )}
                        </p>
                      ))}
                    </div>
                  )}

                  {"items" in section && section.items && (
                    <ul className="mt-4 space-y-3 text-[#272727]/90 leading-[1.65] md:mt-5 md:space-y-4 md:text-lg md:leading-[1.7]">
                      {section.items.map((item, i) => (
                        <li key={i} className="relative pl-5 before:absolute before:left-0 before:content-['·'] before:font-bold before:text-[#272727]/50">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {"contact" in section && section.contact && (
                    <ul className="mt-4 space-y-1 text-[#272727]/90 leading-[1.65] md:mt-5 md:text-lg md:leading-[1.7]">
                      {section.contact.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
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

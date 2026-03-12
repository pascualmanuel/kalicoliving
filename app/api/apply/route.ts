import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      moveDate,
      durationLabel,
      aboutYourself,
      workStyleLabel,
      expectFromKaliLabels,
      anythingElse,
      locale,
    } = body as {
      name?: string;
      email?: string;
      phone?: string;
      moveDate?: string;
      durationLabel?: string;
      aboutYourself?: string;
      workStyleLabel?: string | null;
      expectFromKaliLabels?: string[];
      anythingElse?: string;
      locale?: string;
    };

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "RESEND_API_KEY not configured" },
        { status: 500 },
      );
    }

    const safeExpect =
      Array.isArray(expectFromKaliLabels) && expectFromKaliLabels.length > 0
        ? expectFromKaliLabels
        : [];

    const html = `
      <h1 style="color: #9f2322;">Nueva solicitud de Kali</h1>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ""}
      ${moveDate ? `<p><strong>Fecha de mudanza:</strong> ${moveDate}</p>` : ""}
      ${
        durationLabel
          ? `<p><strong>Duración estimada de la estancia:</strong> ${durationLabel}</p>`
          : ""
      }
      ${
        aboutYourself
          ? `<p><strong>Sobre la persona:</strong><br />${aboutYourself.replace(/\n/g, "<br />")}</p>`
          : ""
      }
      ${
        workStyleLabel
          ? `<p><strong>Cómo trabaja:</strong> ${workStyleLabel}</p>`
          : ""
      }
      ${
        safeExpect.length
          ? `<p><strong>Qué espera de Kali:</strong><br />${safeExpect
              .map((item) => `• ${item}`)
              .join("<br />")}</p>`
          : ""
      }
      ${
        anythingElse
          ? `<p><strong>Comentario adicional:</strong><br />${anythingElse.replace(/\n/g, "<br />")}</p>`
          : ""
      }
      ${
        locale ? `<p><strong>Idioma del formulario:</strong> ${locale}</p>` : ""
      }
    `;

    const { error } = await resend.emails.send({
      from: "Kali Coliving <no-reply@kalicoliving.com>",
      to: ["manuelnpascual@gmail.com"],
      subject: "Nueva solicitud Apply to Kali",
      reply_to: email,
      html,
    } as any);

    if (error) {
      console.error("Resend Apply error:", error);
      return NextResponse.json(
        { error: "Error sending email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Apply to Kali form error:", error);
    return NextResponse.json(
      { error: "Unexpected error processing request" },
      { status: 500 },
    );
  }
}

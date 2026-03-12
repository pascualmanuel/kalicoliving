import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { nombre, email, telefono, ubicacion, propiedad } = body as {
      nombre?: string;
      email?: string;
      telefono?: string;
      ubicacion?: string;
      propiedad?: string;
    };

    if (!nombre || !email || !telefono || !ubicacion || !propiedad) {
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

    const html = `
       <h1 style="color: #9f2322;"> Nuevo contacto de propietario</h1>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
      <p><strong>Ubicación:</strong> ${ubicacion}</p>
      <p><strong>Propiedad:</strong></p>
      <p>${propiedad.replace(/\n/g, "<br />")}</p>
    `;

    const { error } = await resend.emails.send({
      from: "Kali Coliving <no-reply@kalicoliving.com>",
      to: ["manuelnpascual@gmail.com"],
      subject: "Nuevo formulario de propietarios",
      reply_to: email,
      html,
    } as any);

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Error sending email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Landlords form error:", error);
    return NextResponse.json(
      { error: "Unexpected error processing request" },
      { status: 500 },
    );
  }
}

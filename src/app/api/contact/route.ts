// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Nombre demasiado corto"),
  email: z.string().email("Email inválido"),
  subject: z.string().optional().default(""),
  message: z.string().min(10, "Mensaje demasiado corto"),
});

// Utilidad mínima para normalizar arrays por coma
const list = (val?: string) =>
  (val ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const parsed = schema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "VALIDATION", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;
    const provider = (process.env.CONTACT_PROVIDER || "").toLowerCase();

    if (!process.env.CONTACT_TO) {
      return NextResponse.json(
        { error: "SERVER_MISCONFIGURED", detail: "CONTACT_TO faltante" },
        { status: 500 }
      );
    }

    // Contenido base
    const finalSubject =
      subject?.trim() || `Nuevo contacto: ${name} — Portafolio`;
    const textBody =
      `Nombre: ${name}\nEmail: ${email}\nAsunto: ${subject}\n\n` + message;

    if (provider === "resend") {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from =
        process.env.CONTACT_FROM || "Portfolio <no-reply@example.com>";
      const to = list(process.env.CONTACT_TO);
      if (!process.env.RESEND_API_KEY) {
        return NextResponse.json(
          { error: "SERVER_MISCONFIGURED", detail: "RESEND_API_KEY faltante" },
          { status: 500 }
        );
      }

      const result = await resend.emails.send({
        from,
        to,
        reply_to: email,
        subject: finalSubject,
        text: textBody,
      });

      if ((result as any)?.error) {
        console.error("Resend error:", (result as any).error);
        return NextResponse.json({ error: "SEND_FAILED" }, { status: 502 });
      }

      return NextResponse.json({ ok: true });
    }

    if (provider === "smtp") {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || "Portfolio <no-reply@example.com>",
        to: process.env.CONTACT_TO,
        replyTo: email,
        subject: finalSubject,
        text: textBody,
      });

      if (!info.messageId) {
        return NextResponse.json({ error: "SEND_FAILED" }, { status: 502 });
      }

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { error: "SERVER_MISCONFIGURED", detail: "CONTACT_PROVIDER inválido" },
      { status: 500 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}

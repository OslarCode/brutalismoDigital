// components/Contact.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "El nombre es demasiado corto"),
  email: z.string().email("Email inválido"),
  subject: z.string().optional().default(""),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

// Tipos para el estado de errores
type FormValues = z.infer<typeof schema>;
type FormErrors = Partial<Record<keyof FormValues, string>>;

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay: d },
  viewport: { once: true, amount: 0.25 },
});

export const Contact = () => {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // Valida un objeto completo
  const validateAll = (values: FormValues) => {
    const parsed = schema.safeParse(values);
    if (parsed.success) {
      setErrors({});
      return { ok: true as const, data: parsed.data };
    }
    const fieldErrors: FormErrors = {};
    const fl = parsed.error.flatten();
    if (fl.fieldErrors.name) fieldErrors.name = fl.fieldErrors.name[0]!;
    if (fl.fieldErrors.email) fieldErrors.email = fl.fieldErrors.email[0]!;
    if (fl.fieldErrors.subject)
      fieldErrors.subject = fl.fieldErrors.subject[0]!;
    if (fl.fieldErrors.message)
      fieldErrors.message = fl.fieldErrors.message[0]!;
    setErrors(fieldErrors);
    return { ok: false as const };
  };

  // Valida un campo individual (onBlur)
  const validateField = (name: keyof FormValues, value: string) => {
    const single = z.object({ [name]: (schema.shape as any)[name] });
    const parsed = single.safeParse({ [name]: value });
    setErrors((prev) => ({
      ...prev,
      [name]: parsed.success
        ? undefined
        : parsed.error.flatten().fieldErrors[name]?.[0],
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    // Anti-spam honeypot
    if ((data.get("website") as string)?.length) {
      setSubmitting(false);
      return;
    }

    const payload: FormValues = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      subject: String(data.get("subject") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    // Validación cliente
    const v = validateAll(payload);
    if (!v.ok) {
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v.data),
      });

      if (!res.ok) {
        setStatus("error");
        setSubmitting(false);
        return;
      }

      setStatus("ok");
      setSubmitting(false);
      form.reset();
    } catch {
      setStatus("error");
      setSubmitting(false);
    }
  };

  // Helper de clases para inputs con error
  const inputClass = (hasError: boolean) =>
    `w-full border-2 px-4 py-3 bg-white outline-none rounded-none ${
      hasError ? "border-primary" : "border-black"
    } focus:border-black`;

  return (
    <section id="contact" className="bg-paper text-ink py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Cabecera editorial */}
        <div className="grid grid-cols-12 gap-6 mb-10">
          <motion.h2
            className="col-span-12 lg:col-span-7 font-serif text-display leading-[0.9] tracking-tight"
            {...fadeUp(0)}
          >
            Conversemos
          </motion.h2>
          <motion.p
            className="col-span-12 lg:col-span-5 text-sm leading-relaxed text-ink/80 lg:pt-3"
            {...fadeUp(0.1)}
          >
            Cuéntanos tu idea. Respondemos normalmente en 24–48h. Trabajamos con
            enfoque editorial, brutalismo digital y performance-first.
          </motion.p>
        </div>

        {/* Contenido: ficha + formulario */}
        <div className="grid grid-cols-12 gap-6">
          {/* Ficha lateral */}
          <motion.aside
            className="col-span-12 lg:col-span-4 border-2 border-black bg-white shadow-brutal p-6 space-y-6"
            {...fadeUp(0.15)}
          >
            <div>
              <h3 className="font-serif text-2xl leading-tight">
                Disponibilidad
              </h3>
              <p className="mt-2 text-sm text-ink/80">
                Proyectos web, UI/Frontend y consultoría de diseño/arquitectura.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-4 text-[12px] uppercase tracking-wider">
              <div>
                <dt className="text-ink/60">Ubicación</dt>
                <dd className="mt-1 text-ink">España (remoto)</dd>
              </div>
              <div>
                <dt className="text-ink/60">Stack</dt>
                <dd className="mt-1 text-ink">Next · Tailwind · Motion</dd>
              </div>
              <div>
                <dt className="text-ink/60">Entrega</dt>
                <dd className="mt-1 text-ink">Mobile-first</dd>
              </div>
              <div>
                <dt className="text-ink/60">Ritmo</dt>
                <dd className="mt-1 text-ink">Iterativo</dd>
              </div>
            </dl>
          </motion.aside>

          {/* Formulario */}
          <motion.form
            onSubmit={onSubmit}
            noValidate
            className="col-span-12 lg:col-span-8 border-2 border-black bg-white shadow-brutal p-6"
            {...fadeUp(0.2)}
          >
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm uppercase tracking-wider mb-2"
                >
                  Tu nombre
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "err-name" : undefined}
                  className={inputClass(!!errors.name)}
                  placeholder="Jane Doe"
                  onBlur={(e) => validateField("name", e.currentTarget.value)}
                />
                {errors.name && (
                  <p id="err-name" className="mt-1 text-[12px] text-primary">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm uppercase tracking-wider mb-2"
                >
                  Tu email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-email" : undefined}
                  className={inputClass(!!errors.email)}
                  placeholder="jane@email.com"
                  onBlur={(e) => validateField("email", e.currentTarget.value)}
                />
                {errors.email && (
                  <p id="err-email" className="mt-1 text-[12px] text-primary">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Asunto */}
              <div className="md:col-span-2">
                <label
                  htmlFor="subject"
                  className="block text-sm uppercase tracking-wider mb-2"
                >
                  Asunto
                </label>
                <input
                  id="subject"
                  name="subject"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "err-subject" : undefined}
                  className={inputClass(!!errors.subject)}
                  placeholder="Rediseño web, auditoría, etc."
                  onBlur={(e) =>
                    validateField("subject", e.currentTarget.value)
                  }
                />
                {errors.subject && (
                  <p id="err-subject" className="mt-1 text-[12px] text-primary">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Mensaje */}
              <div className="md:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm uppercase tracking-wider mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "err-message" : undefined}
                  className={inputClass(!!errors.message) + " resize-y"}
                  placeholder="Cuéntame el contexto, objetivos y plazos."
                  onBlur={(e) =>
                    validateField("message", e.currentTarget.value)
                  }
                />
                {errors.message && (
                  <p id="err-message" className="mt-1 text-[12px] text-primary">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className={`brutal-btn ${
                  submitting ? "opacity-70 pointer-events-none" : ""
                }`}
              >
                {submitting ? "Enviando…" : "Enviar mensaje"}
              </button>
              {status === "ok" && (
                <span className="text-sm text-ink/80">
                  ¡Gracias! Te respondo pronto.
                </span>
              )}
              {status === "error" && (
                <span className="text-sm text-primary">
                  Hubo un problema. Inténtalo de nuevo.
                </span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

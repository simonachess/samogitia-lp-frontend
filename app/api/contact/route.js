// app/api/contact/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, message, botField } = body;

    // simple bot honeypot
    if (botField) {
      return NextResponse.json({ ok: true });
    }

    if (!email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    if (!toEmail) {
      return NextResponse.json(
        { ok: false, error: "Server is not configured" },
        { status: 500 },
      );
    }

    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    const { data, error } = await resend.emails.send({
      // FOR NOW: Resend test sender
      from: "Samogitia Group <onboarding@resend.dev>",
      to: toEmail,
      reply_to: email,
      subject: `Nauja užklausa iš svetainės: ${fullName || email}`,
      text: `
Gauta nauja užklausa iš kontaktų formos.

Vardas, pavardė: ${fullName || "nenurodyta"}
El. paštas: ${email}

Žinutė:
${message}
      `.trim(),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send message" },
        { status: 500 },
      );
    }

    console.log("Email sent:", data?.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send message" },
      { status: 500 },
    );
  }
}

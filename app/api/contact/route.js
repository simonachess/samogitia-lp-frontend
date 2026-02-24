// app/api/contact/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limit: max 5 requests per 15 min per IP
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requests = new Map();

function getClientIp(req) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  let timestamps = requests.get(ip) || [];
  timestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  requests.set(ip, timestamps);
  return false;
}

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Per daug užklausų. Bandykite vėliau." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const { firstName, lastName, email, phone, message, botField } = body;

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

    const emailStr = String(email).trim();
    const messageStr = String(message).trim();

    if (emailStr.length > 254) {
      return NextResponse.json(
        { ok: false, error: "Email too long" },
        { status: 400 },
      );
    }
    if (messageStr.length > 5000) {
      return NextResponse.json(
        { ok: false, error: "Message too long" },
        { status: 400 },
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailStr)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email format" },
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

    const fullName = [
      String(firstName || "").trim(),
      String(lastName || "").trim(),
    ]
      .filter(Boolean)
      .join(" ")
      .slice(0, 200);
    const phoneStr = String(phone || "")
      .trim()
      .slice(0, 50);

    const { data, error } = await resend.emails.send({
      from: "Samogitia Group <onboarding@resend.dev>",
      to: toEmail,
      reply_to: emailStr,
      subject: `Nauja užklausa iš svetainės: ${fullName || emailStr}`,
      text: `
Gauta nauja užklausa iš kontaktų formos.

Vardas, pavardė: ${fullName || "nenurodyta"}
El. paštas: ${emailStr}
${phoneStr ? `Telefonas: ${phoneStr}` : ""}

Žinutė:
${messageStr}
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

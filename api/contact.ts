// Vercel Serverless Function: /api/contact
// Sends enquiry emails to hello@ragecreative.co.za via Web3Forms
// Environment variable required: WEB3FORMS_ACCESS_KEY (set in Vercel Project Settings)

import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name,
    email,
    phone,
    company,
    service,
    budget,
    timeline,
    message,
    formType,
    // collaborator fields
    discipline,
    portfolioUrl,
    experience,
    bio,
    // booking modal extra fields
    preferredDate,
    notes,
  } = req.body as Record<string, string>;

  // Basic validation
  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Name, email and phone are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("WEB3FORMS_ACCESS_KEY is not set");
    return res.status(500).json({ error: "Server configuration error." });
  }

  // Build a clean email body depending on form type
  let subjectLine = "";
  let htmlBody = "";

  if (formType === "collaborator") {
    subjectLine = `[Rage Creative] New Collaborator Application — ${name} (${discipline || "Unknown Discipline"})`;
    htmlBody = `
      <h2 style="font-family:sans-serif;color:#181818;">New Collaborator Application</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;width:100%;max-width:600px;">
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;width:200px;">Full Name</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${name}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${email}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Phone / WhatsApp</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${phone}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Primary Discipline</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${discipline || "—"}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Years of Experience</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${experience || "—"}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Portfolio / Showreel URL</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;"><a href="${portfolioUrl || "#"}">${portfolioUrl || "—"}</a></td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Bio &amp; Notable Work</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${bio || "—"}</td></tr>
      </table>
      <p style="font-family:sans-serif;font-size:12px;color:#736e67;margin-top:24px;">Submitted via RageCreative.co.za Collaborator Form</p>
    `;
  } else if (formType === "booking") {
    subjectLine = `[Rage Creative] Project Brief — ${service || "Discovery Call"} — ${name} (${company || "No Company"})`;
    htmlBody = `
      <h2 style="font-family:sans-serif;color:#181818;">New Project Brief &amp; Discovery Request</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;width:100%;max-width:600px;">
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;width:200px;">Client Name</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${name}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Company / Brand</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${company || "—"}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${email}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Phone / WhatsApp</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${phone}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Selected Service / Package</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;"><strong>${service || "—"}</strong></td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Anticipated Budget</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${budget || "—"}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Target Launch Window</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${timeline || "—"}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Preferred Call Date/Time</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${preferredDate || "—"}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Project Notes &amp; Aspirations</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${notes || "—"}</td></tr>
      </table>
      <p style="font-family:sans-serif;font-size:12px;color:#736e67;margin-top:24px;">Submitted via RageCreative.co.za Project Booking Modal</p>
    `;
  } else {
    // Default: contact section form
    subjectLine = `[Rage Creative Brief] ${service || "Enquiry"} — ${name} (${company || "No Company"})`;
    htmlBody = `
      <h2 style="font-family:sans-serif;color:#181818;">New Project Brief — Rage Creative</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;width:100%;max-width:600px;">
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;width:200px;">Client Name</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${name}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Company / Brand</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${company || "—"}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${email}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Phone / WhatsApp</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${phone}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Primary Project Scope</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;"><strong>${service || "—"}</strong></td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Anticipated Budget (ZAR)</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${budget || "—"}</td></tr>
        <tr><td style="padding:8px 12px;background:#f8f7f5;font-weight:600;">Brief Summary / Objectives</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${message || "—"}</td></tr>
      </table>
      <p style="font-family:sans-serif;font-size:12px;color:#736e67;margin-top:24px;">Submitted via RageCreative.co.za Contact Form</p>
    `;
  }

  // Submit to Web3Forms — delivers to hello@ragecreative.co.za via their relay
  const payload = {
    access_key: accessKey,
    subject: subjectLine,
    from_name: `${name} via Rage Creative Website`,
    replyto: email,
    html: htmlBody,
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    const result = (await response.json()) as { success: boolean; message?: string };

    if (result.success) {
      return res.status(200).json({ success: true });
    } else {
      console.error("Web3Forms error:", result.message);
      return res.status(502).json({ error: "Email relay error. Please contact us directly." });
    }
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
}

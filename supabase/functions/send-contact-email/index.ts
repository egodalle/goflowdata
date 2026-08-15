import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const CONTACT_TO_EMAIL = Deno.env.get("CONTACT_TO_EMAIL") || "egodalle@yahoo.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  company?: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function sendViaFormSubmit(payload: {
  name: string;
  email: string;
  company: string;
  message: string;
}): Promise<{ emailed: boolean; detail: string }> {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_TO_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://goflowdata.com",
        Referer: "https://goflowdata.com/contact",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        company: payload.company || "Not provided",
        message: payload.message,
        _replyto: payload.email,
        _subject: `New GoFlow inquiry from ${payload.name}`,
        _template: "table",
        _captcha: "false",
      }),
    },
  );

  const raw = await response.text();
  let parsed: { success?: string | boolean; message?: string } = {};
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = { message: raw.slice(0, 300) };
  }

  const successValue = String(parsed.success ?? "").toLowerCase();
  const emailed = response.ok && (successValue === "true" || parsed.success === true);
  const detail = parsed.message || `FormSubmit HTTP ${response.status}`;

  if (!emailed) {
    console.error("FormSubmit error:", response.status, raw.slice(0, 500));
  }

  return { emailed, detail };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, message }: ContactEmailRequest = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, and message are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const cleanName = name.trim().slice(0, 100);
    const cleanEmail = email.trim().slice(0, 255);
    const cleanCompany = (company || "").trim().slice(0, 100);
    const cleanMessage = message.trim().slice(0, 2000);

    console.log("Received contact form submission:", { name: cleanName, email: cleanEmail, company: cleanCompany });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );

    const { error: insertError } = await supabase.from("contact_submissions").insert({
      name: cleanName,
      email: cleanEmail,
      company: cleanCompany || null,
      message: cleanMessage,
    });

    if (insertError) {
      console.error("contact_submissions insert failed:", insertError.message);
      return new Response(
        JSON.stringify({ error: "Failed to save your message. Please try again." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const { emailed, detail } = await sendViaFormSubmit({
      name: cleanName,
      email: cleanEmail,
      company: cleanCompany,
      message: cleanMessage,
    });

    if (emailed) {
      console.log("Notification email sent via FormSubmit");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: emailed
          ? "Email sent successfully"
          : "Message received. We'll get back to you soon.",
        emailed,
        emailProvider: "formsubmit",
        emailDetail: detail,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send email";
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }
};

serve(handler);

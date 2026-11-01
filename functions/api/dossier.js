// Cloudflare Pages Functions - Private Architectural Dossier Unlock
export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { name, phone, email, investment_horizon } = body;

    if (!name || !phone) {
      return new Response(JSON.stringify({ ok: false, error: "Name and phone are required for confidential dossier access." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const id = "dossier_" + Date.now().toString(36);

    if (env && env.DB) {
      await env.DB.prepare(
        "INSERT INTO dossier_leads (id, name, phone, email, investment_horizon) VALUES (?, ?, ?, ?, ?)"
      ).bind(id, name, phone, email || '', investment_horizon || 'Immediate').run();
    }

    return new Response(JSON.stringify({
      ok: true,
      message: "Confidential masterplan dossier unlocked.",
      dossier_url: "/assets/Aurelia_Private_Sanctuary_Dossier_2026.pdf"
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

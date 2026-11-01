// Cloudflare Pages Functions - Site Visits API
export async function onRequestGet({ env }) {
  try {
    if (env && env.DB) {
      const res = await env.DB.prepare("SELECT * FROM site_visits ORDER BY created_at DESC").all();
      return new Response(JSON.stringify({ ok: true, data: res.results || [] }), {
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
      });
    }

    return new Response(JSON.stringify({
      ok: true,
      data: [
        { id: 'visit_001', guest_name: 'Vikramaditya Oberoi', phone: '+91 98201 44520', email: 'voberoi@oberoicapital.com', preferred_date: '2026-11-04', time_slot: '11:00 AM', chauffeur_requested: 1, vip_status: 'hnw_client', assigned_advisor: 'Eleanor Vance', status: 'confirmed' },
        { id: 'visit_002', guest_name: 'Anya Deshmukh', phone: '+91 99302 11980', email: 'anya@aurorafilm.co', preferred_date: '2026-11-06', time_slot: '04:30 PM (Golden Hour)', chauffeur_requested: 1, vip_status: 'qualified', assigned_advisor: 'Marcus Sterling', status: 'confirmed' }
      ]
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

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { guest_name, phone, email, preferred_date, time_slot, pickup_address } = body;

    if (!guest_name || !phone) {
      return new Response(JSON.stringify({ ok: false, error: "Guest name and contact phone are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const id = "visit_" + Date.now().toString(36);

    if (env && env.DB) {
      await env.DB.prepare(
        "INSERT INTO site_visits (id, guest_name, phone, email, preferred_date, time_slot, chauffeur_requested, pickup_address, status) VALUES (?, ?, ?, ?, ?, ?, 1, ?, 'confirmed')"
      ).bind(id, guest_name, phone, email || '', preferred_date || 'Flexible', time_slot || 'Golden Hour (4:30 PM)', pickup_address || 'Hotel / Private Residence').run();
    }

    return new Response(JSON.stringify({
      ok: true,
      message: "Private chauffeur site visit confirmed! Our senior client partner will reach out within 2 hours.",
      visit_id: id
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

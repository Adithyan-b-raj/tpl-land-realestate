// Cloudflare Pages Functions - Units API
export async function onRequestGet({ env }) {
  try {
    if (env && env.DB) {
      const res = await env.DB.prepare("SELECT * FROM units ORDER BY unit_code ASC").all();
      return new Response(JSON.stringify({ ok: true, data: res.results || [] }), {
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
      });
    }

    // Default mock data
    return new Response(JSON.stringify({
      ok: true,
      data: [
        { id: 'unit_101', unit_code: 'Villa 01', villa_type: 'Villa Alassio', sqft: 4850, bedrooms: 4, price_inr: 185000000, status: 'sold', buyer_name: 'Rajiv Singhania' },
        { id: 'unit_102', unit_code: 'Villa 02', villa_type: 'Villa Alassio', sqft: 4850, bedrooms: 4, price_inr: 185000000, status: 'available', buyer_name: null },
        { id: 'unit_103', unit_code: 'Villa 03', villa_type: 'Villa Bellagio', sqft: 6200, bedrooms: 5, price_inr: 245000000, status: 'token_received', buyer_name: 'Dr. Alistair Sterling' },
        { id: 'unit_104', unit_code: 'Villa 04', villa_type: 'Villa Bellagio', sqft: 6200, bedrooms: 5, price_inr: 245000000, status: 'reserved', buyer_name: 'Mehta Family Trust' },
        { id: 'unit_105', unit_code: 'Villa 05', villa_type: 'Grand Penthouse', sqft: 8400, bedrooms: 6, price_inr: 380000000, status: 'available', buyer_name: null },
        { id: 'unit_106', unit_code: 'Villa 06', villa_type: 'Villa Alassio', sqft: 4850, bedrooms: 4, price_inr: 190000000, status: 'available', buyer_name: null }
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

export async function onRequestPatch({ request, env }) {
  try {
    const body = await request.json();
    const { id, status, buyer_name, price_inr } = body;

    if (!id || !status) {
      return new Response(JSON.stringify({ ok: false, error: "ID and status required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (env && env.DB) {
      await env.DB.prepare(
        "UPDATE units SET status = ?, buyer_name = COALESCE(?, buyer_name), price_inr = COALESCE(?, price_inr) WHERE id = ?"
      ).bind(status, buyer_name || null, price_inr || null, id).run();
    }

    return new Response(JSON.stringify({ ok: true, updated: id, status }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

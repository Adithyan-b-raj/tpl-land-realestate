export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.pathname === '/api/leads' && context.request.method === 'GET') {
    return new Response(JSON.stringify([{"id":"SV-401","name":"Dr. Kurian Thomas (NRI — Dubai)","phone":"919847122334","detail":"4BHK Waterfront Villa (18th Floor) • Private Yacht Visit Sat 4PM","status":"UNIT BLOCKED","amount":"₹4.20 Cr"},{"id":"SV-402","name":"Meera & Sanjay Menon (Kochi)","phone":"919447233445","detail":"3BHK Marina Sky Residence • HDFC Pre-Approved Loan","status":"SITE VISIT DONE","amount":"₹2.85 Cr"},{"id":"SV-403","name":"Arjun Varma (Bangalore Tech VP)","phone":"919895344556","detail":"5BHK Sky Mansion Penthouse • Requested RERA Legal Pack","status":"BROCHURE UNLOCKED","amount":"₹6.50 Cr"}]), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=120'
      }
    });
  }
  if (url.pathname === '/api/leads' && context.request.method === 'POST') {
    const body = await context.request.json().catch(() => ({}));
    return new Response(JSON.stringify({ ok: true, id: body.id || 'REQ-LIVE' }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  }
  return new Response(JSON.stringify({ service: 'tpl-land-realestate', status: 'ok' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

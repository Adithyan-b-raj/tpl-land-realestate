-- ============================================================
-- AURELIA ESTATES SEED DATA
-- ============================================================

INSERT OR IGNORE INTO properties (id, name, location, tagline, starting_price, total_units, available_units) VALUES
  ('prop_01', 'The Aurelia Sanctuary', 'North Goa Coastal Bluffs & Vagator Hill', 'Where Raw Earth Meets Uncompromising Architectural Grandeur', 185000000, 18, 6);

INSERT OR IGNORE INTO units (id, unit_code, villa_type, sqft, bedrooms, price_inr, status, buyer_name, notes) VALUES
  ('unit_101', 'Villa 01', 'Villa Alassio', 4850, 4, 185000000, 'sold', 'Rajiv Singhania', 'Full payment realized. Handover Q3 2027.'),
  ('unit_102', 'Villa 02', 'Villa Alassio', 4850, 4, 185000000, 'available', NULL, 'Prime sunset cliff-edge view with double infinity pool.'),
  ('unit_103', 'Villa 03', 'Villa Bellagio', 6200, 5, 245000000, 'token_received', 'Dr. Alistair Sterling', '₹2.5 Cr earnest token deposit received via Escrow.'),
  ('unit_104', 'Villa 04', 'Villa Bellagio', 6200, 5, 245000000, 'reserved', 'Mehta Family Trust', 'Legal KYC verification in progress.'),
  ('unit_105', 'Villa 05', 'Grand Penthouse', 8400, 6, 380000000, 'available', NULL, 'Includes private cantilevered sky-helipad and 1,200 bottle wine vault.'),
  ('unit_106', 'Villa 06', 'Villa Alassio', 4850, 4, 190000000, 'available', NULL, 'Surrounded by 100-year-old banyan and cashew trees.');

INSERT OR IGNORE INTO site_visits (id, guest_name, phone, email, preferred_date, time_slot, chauffeur_requested, pickup_address, vip_status, assigned_advisor, status) VALUES
  ('visit_001', 'Vikramaditya Oberoi', '+91 98201 44520', 'voberoi@oberoicapital.com', '2026-11-04', '11:00 AM', 1, 'The Leela Palace, Panaji', 'hnw_client', 'Eleanor Vance', 'confirmed'),
  ('visit_002', 'Anya Deshmukh', '+91 99302 11980', 'anya@aurorafilm.co', '2026-11-06', '04:30 PM (Golden Hour)', 1, 'Taj Fort Aguada Resort', 'qualified', 'Marcus Sterling', 'confirmed');

-- ============================================================
-- AURELIA ESTATES D1 DATABASE SCHEMA
-- ============================================================

CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  tagline TEXT,
  starting_price INTEGER NOT NULL,
  total_units INTEGER DEFAULT 18,
  available_units INTEGER DEFAULT 6,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS units (
  id TEXT PRIMARY KEY,
  unit_code TEXT NOT NULL UNIQUE,
  villa_type TEXT NOT NULL, -- 'Villa Alassio', 'Villa Bellagio', 'Grand Penthouse'
  sqft INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  price_inr INTEGER NOT NULL,
  status TEXT DEFAULT 'available', -- 'available', 'token_received', 'reserved', 'sold'
  buyer_name TEXT,
  notes TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_visits (
  id TEXT PRIMARY KEY,
  guest_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  preferred_date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  chauffeur_requested INTEGER DEFAULT 1,
  pickup_address TEXT,
  vip_status TEXT DEFAULT 'qualified', -- 'prospect', 'qualified', 'hnw_client'
  assigned_advisor TEXT DEFAULT 'Eleanor Vance',
  status TEXT DEFAULT 'confirmed', -- 'confirmed', 'in_transit', 'completed', 'cancelled'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dossier_leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  investment_horizon TEXT,
  downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_units_status ON units(status);
CREATE INDEX IF NOT EXISTS idx_visits_date ON site_visits(preferred_date);

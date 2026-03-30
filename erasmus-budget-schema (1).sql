-- ============================================================
-- Erasmus+ Budget Wizard -- Database Schema v1.0
-- Generated: 2026-03-30
-- Compatible: PostgreSQL 14+ / Supabase
-- 17 tables
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Core project record. One per Erasmus+ application.
CREATE TABLE projects (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name                     varchar(100) NOT NULL,
  type                     varchar(60) NOT NULL,
  description              text,
  start_date               date NOT NULL,
  duration_months          integer NOT NULL,
  eu_grant                 decimal(12,2) NOT NULL,
  cofin_pct                integer NOT NULL,
  indirect_pct             decimal(5,2) NOT NULL,
  status                   varchar(20) NOT NULL,
  created_at               timestamptz NOT NULL,
  updated_at               timestamptz NOT NULL,
  created_by               uuid REFERENCES users.id ON DELETE CASCADE
);

-- Consortium members. One applicant + one or more partners per project.
CREATE TABLE partners (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id               uuid NOT NULL REFERENCES projects.id ON DELETE CASCADE,
  name                     varchar(100) NOT NULL,
  legal_name               varchar(200),
  city                     varchar(100),
  country                  varchar(100) NOT NULL,
  role                     varchar(20) NOT NULL,
  order_index              integer NOT NULL
);

-- Per diem rates per partner (Erasmus+ country groups).
CREATE TABLE partner_rates (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id               uuid NOT NULL REFERENCES partners.id ON DELETE CASCADE,
  accommodation_rate       decimal(8,2) NOT NULL,
  subsistence_rate         decimal(8,2) NOT NULL
);

-- Staff day rates per partner and job category.
CREATE TABLE worker_rates (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id               uuid NOT NULL REFERENCES partners.id ON DELETE CASCADE,
  category                 varchar(60) NOT NULL,
  rate                     decimal(8,2) NOT NULL
);

-- Travel routes between any two endpoints.
CREATE TABLE routes (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id               uuid NOT NULL REFERENCES projects.id ON DELETE CASCADE,
  endpoint_a               varchar(60) NOT NULL,
  endpoint_b               varchar(60) NOT NULL,
  distance_km              integer,
  eco_travel               boolean NOT NULL,
  custom_rate              decimal(8,2),
  distance_band            varchar(20)
);

-- Non-partner travel destinations.
CREATE TABLE extra_destinations (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id               uuid NOT NULL REFERENCES projects.id ON DELETE CASCADE,
  name                     varchar(100) NOT NULL,
  country                  varchar(100),
  accommodation_rate       decimal(8,2) NOT NULL,
  subsistence_rate         decimal(8,2) NOT NULL
);

-- Work packages within a project. WP1 is always management.
CREATE TABLE work_packages (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id               uuid NOT NULL REFERENCES projects.id ON DELETE CASCADE,
  order_index              integer NOT NULL,
  code                     varchar(10) NOT NULL,
  title                    varchar(200) NOT NULL,
  category                 varchar(60),
  leader_id                uuid REFERENCES partners.id ON DELETE CASCADE
);

-- Activities within a WP.
CREATE TABLE activities (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wp_id                    uuid NOT NULL REFERENCES work_packages.id ON DELETE CASCADE,
  type                     varchar(20) NOT NULL,
  label                    varchar(200) NOT NULL,
  order_index              integer NOT NULL
);

-- Config for mobility activities (meeting, ltta).
CREATE TABLE activity_mobility (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id              uuid NOT NULL REFERENCES activities.id ON DELETE CASCADE,
  host_partner_id          varchar(60) NOT NULL,
  host_active              boolean NOT NULL,
  pax_per_partner          integer NOT NULL,
  duration_days            integer NOT NULL,
  local_pax                integer NOT NULL,
  local_transport          decimal(8,2) NOT NULL,
  mat_cost_per_pax         decimal(8,2) NOT NULL
);

-- Which partners participate in a mobility activity.
CREATE TABLE activity_mobility_participants (
  activity_id              uuid NOT NULL REFERENCES activities.id ON DELETE CASCADE,
  partner_id               uuid NOT NULL REFERENCES partners.id ON DELETE CASCADE,
  active                   boolean NOT NULL
);

-- Config for management and coordination activities.
CREATE TABLE activity_management (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id              uuid NOT NULL REFERENCES activities.id ON DELETE CASCADE,
  rate_applicant           decimal(8,2) NOT NULL,
  rate_partner             decimal(8,2) NOT NULL
);

-- Active/inactive flag per partner for management activities.
CREATE TABLE activity_management_partners (
  activity_id              uuid NOT NULL REFERENCES activities.id ON DELETE CASCADE,
  partner_id               uuid NOT NULL REFERENCES partners.id ON DELETE CASCADE,
  active                   boolean NOT NULL
);

-- Config for Intellectual Output activities.
CREATE TABLE activity_intellectual_outputs (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id              uuid NOT NULL REFERENCES activities.id ON DELETE CASCADE,
  partner_id               uuid NOT NULL REFERENCES partners.id ON DELETE CASCADE,
  days                     integer NOT NULL,
  worker_category          varchar(60)
);

-- Config for Multiplier Event activities (per partner).
CREATE TABLE activity_multiplier_events (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id              uuid NOT NULL REFERENCES activities.id ON DELETE CASCADE,
  partner_id               uuid NOT NULL REFERENCES partners.id ON DELETE CASCADE,
  active                   boolean NOT NULL,
  local_pax                integer NOT NULL,
  intl_pax                 integer NOT NULL,
  local_rate               decimal(8,2) NOT NULL,
  intl_rate                decimal(8,2) NOT NULL
);

-- Config for Local Workshop activities (per partner).
CREATE TABLE activity_local_workshops (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id              uuid NOT NULL REFERENCES activities.id ON DELETE CASCADE,
  partner_id               uuid NOT NULL REFERENCES partners.id ON DELETE CASCADE,
  active                   boolean NOT NULL,
  participants             integer NOT NULL,
  sessions                 integer NOT NULL,
  cost_per_pax             decimal(8,2) NOT NULL
);

-- Config for dissemination campaign activities (per partner).
CREATE TABLE activity_campaigns (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id              uuid NOT NULL REFERENCES activities.id ON DELETE CASCADE,
  partner_id               uuid NOT NULL REFERENCES partners.id ON DELETE CASCADE,
  active                   boolean NOT NULL,
  monthly_amount           decimal(8,2) NOT NULL,
  months                   integer NOT NULL,
  cpm                      decimal(8,2) NOT NULL
);

-- Config for generic cost activities: website, artistic_fees, extraordinary, equipment, consumables, other.
CREATE TABLE activity_generic_costs (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id              uuid NOT NULL REFERENCES activities.id ON DELETE CASCADE,
  partner_id               uuid NOT NULL REFERENCES partners.id ON DELETE CASCADE,
  active                   boolean NOT NULL,
  note                     text,
  amount                   decimal(12,2) NOT NULL,
  project_pct              decimal(5,2),
  lifetime_pct             decimal(5,2)
);

// ============================================================
// COUNTRIES — Reference data v1.0
// Erasmus+ Budget Wizard Ecosystem
// ============================================================
// cost_group:   A | B | C | D  (based on Erasmus+ official rates for EU/associated,
//               World Bank income classification for the rest)
// income_class: H = high | UM = upper-middle | LM = lower-middle | L = low
// eligibility:  full | partial | none
// aloj:         accommodation reference rate €/day
// mant:         subsistence reference rate €/day
// ============================================================

const PERDIEM_GROUPS = {
  A: { aloj: 125, mant: 55 },
  B: { aloj: 115, mant: 45 },
  C: { aloj: 105, mant: 40 },
  D: { aloj:  95, mant: 35 },
};

const COUNTRIES = [

  // ── EU MEMBER STATES ─────────────────────────────────────
  // Groups from official Erasmus+ reference rates
  { code:'AT', name:'Austria',             region:'eu_member',          cost_group:'A', income_class:'H',  eligibility:'full' },
  { code:'BE', name:'Bélgica',             region:'eu_member',          cost_group:'B', income_class:'H',  eligibility:'full' },
  { code:'BG', name:'Bulgaria',            region:'eu_member',          cost_group:'D', income_class:'UM', eligibility:'full' },
  { code:'CY', name:'Chipre',              region:'eu_member',          cost_group:'C', income_class:'H',  eligibility:'full' },
  { code:'CZ', name:'Chequia',             region:'eu_member',          cost_group:'C', income_class:'H',  eligibility:'full' },
  { code:'DE', name:'Alemania',            region:'eu_member',          cost_group:'B', income_class:'H',  eligibility:'full' },
  { code:'DK', name:'Dinamarca',           region:'eu_member',          cost_group:'A', income_class:'H',  eligibility:'full' },
  { code:'EE', name:'Estonia',             region:'eu_member',          cost_group:'D', income_class:'H',  eligibility:'full' },
  { code:'ES', name:'España',              region:'eu_member',          cost_group:'C', income_class:'H',  eligibility:'full' },
  { code:'FI', name:'Finlandia',           region:'eu_member',          cost_group:'B', income_class:'H',  eligibility:'full' },
  { code:'FR', name:'Francia',             region:'eu_member',          cost_group:'B', income_class:'H',  eligibility:'full' },
  { code:'GR', name:'Grecia',              region:'eu_member',          cost_group:'C', income_class:'H',  eligibility:'full' },
  { code:'HR', name:'Croacia',             region:'eu_member',          cost_group:'D', income_class:'H',  eligibility:'full' },
  { code:'HU', name:'Hungría',             region:'eu_member',          cost_group:'D', income_class:'UM', eligibility:'full' },
  { code:'IE', name:'Irlanda',             region:'eu_member',          cost_group:'A', income_class:'H',  eligibility:'full' },
  { code:'IT', name:'Italia',              region:'eu_member',          cost_group:'B', income_class:'H',  eligibility:'full' },
  { code:'LT', name:'Lituania',            region:'eu_member',          cost_group:'D', income_class:'H',  eligibility:'full' },
  { code:'LU', name:'Luxemburgo',          region:'eu_member',          cost_group:'A', income_class:'H',  eligibility:'full' },
  { code:'LV', name:'Letonia',             region:'eu_member',          cost_group:'D', income_class:'H',  eligibility:'full' },
  { code:'MT', name:'Malta',               region:'eu_member',          cost_group:'C', income_class:'H',  eligibility:'full' },
  { code:'NL', name:'Países Bajos',        region:'eu_member',          cost_group:'A', income_class:'H',  eligibility:'full' },
  { code:'PL', name:'Polonia',             region:'eu_member',          cost_group:'D', income_class:'H',  eligibility:'full' },
  { code:'PT', name:'Portugal',            region:'eu_member',          cost_group:'C', income_class:'H',  eligibility:'full' },
  { code:'RO', name:'Rumanía',             region:'eu_member',          cost_group:'D', income_class:'UM', eligibility:'full' },
  { code:'SE', name:'Suecia',              region:'eu_member',          cost_group:'A', income_class:'H',  eligibility:'full' },
  { code:'SI', name:'Eslovenia',           region:'eu_member',          cost_group:'C', income_class:'H',  eligibility:'full' },
  { code:'SK', name:'Eslovaquia',          region:'eu_member',          cost_group:'D', income_class:'H',  eligibility:'full' },

  // ── THIRD COUNTRIES ASSOCIATED ───────────────────────────
  { code:'IS', name:'Islandia',            region:'associated',         cost_group:'A', income_class:'H',  eligibility:'full' },
  { code:'LI', name:'Liechtenstein',       region:'associated',         cost_group:'A', income_class:'H',  eligibility:'full' },
  { code:'MK', name:'Macedonia del Norte', region:'associated',         cost_group:'D', income_class:'UM', eligibility:'full' },
  { code:'NO', name:'Noruega',             region:'associated',         cost_group:'A', income_class:'H',  eligibility:'full' },
  { code:'RS', name:'Serbia',              region:'associated',         cost_group:'D', income_class:'UM', eligibility:'full' },
  { code:'TR', name:'Türkiye',             region:'associated',         cost_group:'D', income_class:'UM', eligibility:'full' },

  // ── WESTERN BALKANS — Region 1 ───────────────────────────
  { code:'AL', name:'Albania',             region:'western_balkans',    cost_group:'D', income_class:'UM', eligibility:'partial' },
  { code:'BA', name:'Bosnia-Herzegovina',  region:'western_balkans',    cost_group:'D', income_class:'UM', eligibility:'partial' },
  { code:'ME', name:'Montenegro',          region:'western_balkans',    cost_group:'D', income_class:'UM', eligibility:'partial' },
  { code:'XK', name:'Kosovo',              region:'western_balkans',    cost_group:'D', income_class:'LM', eligibility:'partial' },

  // ── NEIGHBOURHOOD EAST — Region 2 ───────────────────────
  { code:'AM', name:'Armenia',             region:'neighbourhood_east', cost_group:'D', income_class:'UM', eligibility:'partial' },
  { code:'AZ', name:'Azerbaiyán',          region:'neighbourhood_east', cost_group:'D', income_class:'UM', eligibility:'partial' },
  { code:'BY', name:'Bielorrusia',         region:'neighbourhood_east', cost_group:'D', income_class:'UM', eligibility:'partial' },
  { code:'GE', name:'Georgia',             region:'neighbourhood_east', cost_group:'D', income_class:'UM', eligibility:'partial' },
  { code:'MD', name:'Moldavia',            region:'neighbourhood_east', cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'UA', name:'Ucrania',             region:'neighbourhood_east', cost_group:'D', income_class:'LM', eligibility:'partial' },

  // ── SOUTH MEDITERRANEAN — Region 3 ──────────────────────
  { code:'DZ', name:'Argelia',             region:'south_med',          cost_group:'C', income_class:'LM', eligibility:'partial' },
  { code:'EG', name:'Egipto',              region:'south_med',          cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'IL', name:'Israel',              region:'south_med',          cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'JO', name:'Jordania',            region:'south_med',          cost_group:'D', income_class:'UM', eligibility:'partial' },
  { code:'LB', name:'Líbano',              region:'south_med',          cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'LY', name:'Libia',               region:'south_med',          cost_group:'D', income_class:'UM', eligibility:'partial' },
  { code:'MA', name:'Marruecos',           region:'south_med',          cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'PS', name:'Palestina',           region:'south_med',          cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'SY', name:'Siria',               region:'south_med',          cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'TN', name:'Túnez',               region:'south_med',          cost_group:'D', income_class:'LM', eligibility:'partial' },

  // ── ASIA — Region 5 ──────────────────────────────────────
  { code:'BD', name:'Bangladesh',          region:'asia',               cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'BT', name:'Bután',               region:'asia',               cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'CN', name:'China',               region:'asia',               cost_group:'B', income_class:'UM', eligibility:'partial' },
  { code:'HK', name:'Hong Kong',           region:'asia',               cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'ID', name:'Indonesia',           region:'asia',               cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'IN', name:'India',               region:'asia',               cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'JP', name:'Japón',               region:'asia',               cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'KH', name:'Camboya',             region:'asia',               cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'KR', name:'Corea del Sur',       region:'asia',               cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'LA', name:'Laos',                region:'asia',               cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'LK', name:'Sri Lanka',           region:'asia',               cost_group:'C', income_class:'LM', eligibility:'partial' },
  { code:'MN', name:'Mongolia',            region:'asia',               cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'MV', name:'Maldivas',            region:'asia',               cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'MY', name:'Malasia',             region:'asia',               cost_group:'B', income_class:'UM', eligibility:'partial' },
  { code:'MM', name:'Myanmar',             region:'asia',               cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'NP', name:'Nepal',               region:'asia',               cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'PH', name:'Filipinas',           region:'asia',               cost_group:'C', income_class:'LM', eligibility:'partial' },
  { code:'PK', name:'Pakistán',            region:'asia',               cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'SG', name:'Singapur',            region:'asia',               cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'TH', name:'Tailandia',           region:'asia',               cost_group:'B', income_class:'UM', eligibility:'partial' },
  { code:'TW', name:'Taiwán',              region:'asia',               cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'VN', name:'Vietnam',             region:'asia',               cost_group:'C', income_class:'LM', eligibility:'partial' },

  // ── CENTRAL ASIA — Region 6 ──────────────────────────────
  { code:'AF', name:'Afganistán',          region:'central_asia',       cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'KG', name:'Kirguistán',          region:'central_asia',       cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'KZ', name:'Kazajistán',          region:'central_asia',       cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'TJ', name:'Tayikistán',          region:'central_asia',       cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'TM', name:'Turkmenistán',        region:'central_asia',       cost_group:'D', income_class:'UM', eligibility:'partial' },
  { code:'UZ', name:'Uzbekistán',          region:'central_asia',       cost_group:'D', income_class:'LM', eligibility:'partial' },

  // ── MIDDLE EAST — Region 7 ───────────────────────────────
  { code:'AE', name:'Emiratos Árabes',     region:'middle_east',        cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'BH', name:'Baréin',              region:'middle_east',        cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'IQ', name:'Iraq',                region:'middle_east',        cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'IR', name:'Irán',                region:'middle_east',        cost_group:'C', income_class:'LM', eligibility:'partial' },
  { code:'KW', name:'Kuwait',              region:'middle_east',        cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'OM', name:'Omán',                region:'middle_east',        cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'QA', name:'Catar',               region:'middle_east',        cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'SA', name:'Arabia Saudí',        region:'middle_east',        cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'YE', name:'Yemen',               region:'middle_east',        cost_group:'D', income_class:'L',  eligibility:'partial' },

  // ── SUB-SAHARAN AFRICA — Region 9 ───────────────────────
  { code:'AO', name:'Angola',              region:'sub_saharan',        cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'BF', name:'Burkina Faso',        region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'BI', name:'Burundi',             region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'BJ', name:'Benín',               region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'BW', name:'Botsuana',            region:'sub_saharan',        cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'CD', name:'Congo (RD)',          region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'CF', name:'Rep. Centroafricana', region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'CG', name:'Congo',               region:'sub_saharan',        cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'CI', name:'Costa de Marfil',     region:'sub_saharan',        cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'CM', name:'Camerún',             region:'sub_saharan',        cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'CV', name:'Cabo Verde',          region:'sub_saharan',        cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'DJ', name:'Yibuti',              region:'sub_saharan',        cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'ER', name:'Eritrea',             region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'ET', name:'Etiopía',             region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'GA', name:'Gabón',               region:'sub_saharan',        cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'GH', name:'Ghana',               region:'sub_saharan',        cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'GM', name:'Gambia',              region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'GN', name:'Guinea',              region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'GQ', name:'Guinea Ecuatorial',   region:'sub_saharan',        cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'GW', name:'Guinea-Bisáu',        region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'KE', name:'Kenia',               region:'sub_saharan',        cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'KM', name:'Comoras',             region:'sub_saharan',        cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'LS', name:'Lesoto',              region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'LR', name:'Liberia',             region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'MG', name:'Madagascar',          region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'ML', name:'Mali',                region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'MR', name:'Mauritania',          region:'sub_saharan',        cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'MU', name:'Mauricio',            region:'sub_saharan',        cost_group:'B', income_class:'UM', eligibility:'partial' },
  { code:'MW', name:'Malaui',              region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'MZ', name:'Mozambique',          region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'NA', name:'Namibia',             region:'sub_saharan',        cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'NE', name:'Níger',               region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'NG', name:'Nigeria',             region:'sub_saharan',        cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'RW', name:'Ruanda',              region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'SC', name:'Seychelles',          region:'sub_saharan',        cost_group:'B', income_class:'H',  eligibility:'partial' },
  { code:'SD', name:'Sudán',               region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'SL', name:'Sierra Leona',        region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'SN', name:'Senegal',             region:'sub_saharan',        cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'SO', name:'Somalia',             region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'SS', name:'Sudán del Sur',       region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'ST', name:'Santo Tomé y Príncipe',region:'sub_saharan',       cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'SZ', name:'Esuatini',            region:'sub_saharan',        cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'TD', name:'Chad',                region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'TG', name:'Togo',                region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'TZ', name:'Tanzania',            region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'UG', name:'Uganda',              region:'sub_saharan',        cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'ZA', name:'Sudáfrica',           region:'sub_saharan',        cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'ZM', name:'Zambia',              region:'sub_saharan',        cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'ZW', name:'Zimbabue',            region:'sub_saharan',        cost_group:'D', income_class:'LM', eligibility:'partial' },

  // ── LATIN AMERICA — Region 10 ────────────────────────────
  { code:'AR', name:'Argentina',           region:'latin_america',      cost_group:'B', income_class:'UM', eligibility:'partial' },
  { code:'BO', name:'Bolivia',             region:'latin_america',      cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'BR', name:'Brasil',              region:'latin_america',      cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'CL', name:'Chile',               region:'latin_america',      cost_group:'B', income_class:'H',  eligibility:'partial' },
  { code:'CO', name:'Colombia',            region:'latin_america',      cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'CR', name:'Costa Rica',          region:'latin_america',      cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'EC', name:'Ecuador',             region:'latin_america',      cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'GT', name:'Guatemala',           region:'latin_america',      cost_group:'D', income_class:'UM', eligibility:'partial' },
  { code:'HN', name:'Honduras',            region:'latin_america',      cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'MX', name:'México',              region:'latin_america',      cost_group:'B', income_class:'UM', eligibility:'partial' },
  { code:'NI', name:'Nicaragua',           region:'latin_america',      cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'PA', name:'Panamá',              region:'latin_america',      cost_group:'B', income_class:'H',  eligibility:'partial' },
  { code:'PE', name:'Perú',                region:'latin_america',      cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'PY', name:'Paraguay',            region:'latin_america',      cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'SV', name:'El Salvador',         region:'latin_america',      cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'UY', name:'Uruguay',             region:'latin_america',      cost_group:'B', income_class:'H',  eligibility:'partial' },
  { code:'VE', name:'Venezuela',           region:'latin_america',      cost_group:'D', income_class:'UM', eligibility:'partial' },

  // ── CARIBBEAN — Region 11 ────────────────────────────────
  { code:'AG', name:'Antigua y Barbuda',   region:'caribbean',          cost_group:'B', income_class:'H',  eligibility:'partial' },
  { code:'BB', name:'Barbados',            region:'caribbean',          cost_group:'B', income_class:'H',  eligibility:'partial' },
  { code:'BS', name:'Bahamas',             region:'caribbean',          cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'BZ', name:'Belice',              region:'caribbean',          cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'CU', name:'Cuba',                region:'caribbean',          cost_group:'D', income_class:'UM', eligibility:'partial' },
  { code:'DM', name:'Dominica',            region:'caribbean',          cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'DO', name:'Rep. Dominicana',     region:'caribbean',          cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'GD', name:'Granada',             region:'caribbean',          cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'GY', name:'Guyana',              region:'caribbean',          cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'HT', name:'Haití',               region:'caribbean',          cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'JM', name:'Jamaica',             region:'caribbean',          cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'KN', name:'San Cristóbal y Nieves',region:'caribbean',        cost_group:'B', income_class:'H',  eligibility:'partial' },
  { code:'LC', name:'Santa Lucía',         region:'caribbean',          cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'SR', name:'Surinam',             region:'caribbean',          cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'TT', name:'Trinidad y Tobago',   region:'caribbean',          cost_group:'B', income_class:'H',  eligibility:'partial' },
  { code:'VC', name:'San Vicente y Granadinas',region:'caribbean',      cost_group:'C', income_class:'UM', eligibility:'partial' },

  // ── PACIFIC — Region 8 ───────────────────────────────────
  { code:'AU', name:'Australia',           region:'pacific',            cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'FJ', name:'Fiyi',                region:'pacific',            cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'FM', name:'Micronesia',          region:'pacific',            cost_group:'C', income_class:'LM', eligibility:'partial' },
  { code:'KI', name:'Kiribati',            region:'pacific',            cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'MH', name:'Islas Marshall',      region:'pacific',            cost_group:'C', income_class:'UM', eligibility:'partial' },
  { code:'NR', name:'Nauru',               region:'pacific',            cost_group:'B', income_class:'H',  eligibility:'partial' },
  { code:'NZ', name:'Nueva Zelanda',       region:'pacific',            cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'PG', name:'Papúa Nueva Guinea',  region:'pacific',            cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'PW', name:'Palaos',              region:'pacific',            cost_group:'B', income_class:'H',  eligibility:'partial' },
  { code:'SB', name:'Islas Salomón',       region:'pacific',            cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'TL', name:'Timor-Leste',         region:'pacific',            cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'TO', name:'Tonga',               region:'pacific',            cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'TV', name:'Tuvalu',              region:'pacific',            cost_group:'D', income_class:'LM', eligibility:'partial' },
  { code:'VU', name:'Vanuatu',             region:'pacific',            cost_group:'D', income_class:'L',  eligibility:'partial' },
  { code:'WS', name:'Samoa',               region:'pacific',            cost_group:'D', income_class:'LM', eligibility:'partial' },

  // ── OTHERS — Regions 12–14 ───────────────────────────────
  { code:'AD', name:'Andorra',             region:'other',              cost_group:'B', income_class:'H',  eligibility:'partial' },
  { code:'CA', name:'Canadá',              region:'other',              cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'CH', name:'Suiza',               region:'other',              cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'FO', name:'Islas Feroe',         region:'other',              cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'GB', name:'Reino Unido',         region:'other',              cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'MC', name:'Mónaco',              region:'other',              cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'RU', name:'Rusia',               region:'other',              cost_group:'D', income_class:'UM', eligibility:'none'    },
  { code:'SM', name:'San Marino',          region:'other',              cost_group:'B', income_class:'H',  eligibility:'partial' },
  { code:'US', name:'Estados Unidos',      region:'other',              cost_group:'A', income_class:'H',  eligibility:'partial' },
  { code:'VA', name:'Ciudad del Vaticano', region:'other',              cost_group:'A', income_class:'H',  eligibility:'partial' },

].map(c => ({
  ...c,
  aloj: PERDIEM_GROUPS[c.cost_group].aloj,
  mant: PERDIEM_GROUPS[c.cost_group].mant,
}));

// ── HELPERS ──────────────────────────────────────────────────────────────────

// Get country by ISO code
// getCountry('ES') → { code:'ES', name:'España', cost_group:'C', aloj:105, mant:40, ... }
function getCountry(code) {
  return COUNTRIES.find(c => c.code === code) || null;
}

// Get perdiem for a country by name (used in wizard partner lookup)
// getPerdiemByCountryName('España') → { aloj:105, mant:40 }
function getPerdiemByCountryName(name) {
  const c = COUNTRIES.find(c => c.name.toLowerCase() === (name||'').toLowerCase());
  if (c) return { aloj: c.aloj, mant: c.mant };
  return PERDIEM_GROUPS['C']; // default fallback
}

// Get cost group for a country name
function getCostGroupByCountryName(name) {
  const c = COUNTRIES.find(c => c.name.toLowerCase() === (name||'').toLowerCase());
  return c ? c.cost_group : 'C';
}

// Get sorted unique list of country names for dropdowns
function getCountryNames() {
  return COUNTRIES.map(c => c.name).sort((a,b) => a.localeCompare(b, 'es'));
}

// Get countries by region
function getCountriesByRegion(region) {
  return COUNTRIES.filter(c => c.region === region);
}

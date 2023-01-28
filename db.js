const { createClient } = require("@supabase/supabase-js");

require("dotenv").config();

const supabaseAdmin = createClient(
  process.env.SUPABASE_PUBLIC_URL,
  process.env.SUPABASE_API_KEY
);

module.exports = supabaseAdmin;

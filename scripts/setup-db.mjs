import { sql } from "@vercel/postgres";

async function setupDatabase() {
  console.log("🔧 Setting up database...");

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        parent_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        relationship VARCHAR(50) NOT NULL,
        kid_name VARCHAR(255) NOT NULL,
        kid_age_group VARCHAR(20) NOT NULL,
        pool VARCHAR(30) NOT NULL DEFAULT '',
        selected_date VARCHAR(20) NOT NULL,
        selected_time_slot VARCHAR(30) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;
    console.log("✅ registrations table created");

    await sql`
      CREATE INDEX IF NOT EXISTS idx_registrations_date 
      ON registrations(selected_date)
    `;
    console.log("✅ index on selected_date created");

    await sql`
      CREATE INDEX IF NOT EXISTS idx_registrations_email_date 
      ON registrations(email, selected_date)
    `;
    console.log("✅ index on email + selected_date created");

    await sql`
      CREATE INDEX IF NOT EXISTS idx_registrations_date_slot 
      ON registrations(selected_date, selected_time_slot)
    `;
    console.log("✅ index on selected_date + selected_time_slot created");

    await sql`
      CREATE INDEX IF NOT EXISTS idx_registrations_pool_date 
      ON registrations(pool, selected_date)
    `;
    console.log("✅ index on pool + selected_date created");

    console.log("\n🎉 Database setup complete!");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  }
}

setupDatabase();

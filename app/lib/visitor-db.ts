import { sql } from "../lib/db";

export async function initializeVisitorDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS site_stats (
      id INTEGER PRIMARY KEY,
      total_visits BIGINT NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    INSERT INTO site_stats (id, total_visits)
    VALUES (1, 0)
    ON CONFLICT (id) DO NOTHING
  `;
}

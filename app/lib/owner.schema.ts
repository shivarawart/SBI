import { sql } from "./db";

export async function initializeOwnerDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS owners (
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

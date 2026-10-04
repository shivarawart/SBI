import { sql } from "../lib/db";

export async function initializeVideoDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS videos (
      id UUID PRIMARY KEY,

      owner_id UUID NOT NULL,

      video_url TEXT NOT NULL,
      description TEXT NOT NULL,

      imagekit_file_id TEXT,
      imagekit_file_path TEXT,
      thumbnail_url TEXT,

      original_name TEXT,
      mime_type VARCHAR(150),
      file_size BIGINT,

      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

      CONSTRAINT fk_videos_owner
        FOREIGN KEY (owner_id)
        REFERENCES owners(id)
        ON DELETE CASCADE
    )
  `;

  /*
   * Migration for an already-existing videos table.
   * These columns will be added only if they don't already exist.
   */

  await sql`
    ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS imagekit_file_id TEXT
  `;

  await sql`
    ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS imagekit_file_path TEXT
  `;

  await sql`
    ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS thumbnail_url TEXT
  `;

  await sql`
    ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS original_name TEXT
  `;

  await sql`
    ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS mime_type VARCHAR(150)
  `;

  await sql`
    ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS file_size BIGINT
  `;
}
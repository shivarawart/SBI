import { NextResponse } from "next/server";

import { sql } from "../../lib/db";
import { initializeVisitorDatabase } from "../../lib/visitor-db";

export async function POST() {
  try {
    // Make sure the database/table exists.
    await initializeVisitorDatabase();

    // Every request = one visitor/page visit.
    const result = await sql`
      UPDATE site_stats
      SET
        total_visits = total_visits + 1,
        updated_at = NOW()
      WHERE id = 1
      RETURNING total_visits
    `;

    const totalVisits = Number(result[0]?.total_visits ?? 0);

    return NextResponse.json({
      success: true,
      totalVisits,
    });
  } catch (error) {
    console.error("Visitor tracking error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to count visitor",
        error:
          error instanceof Error ? error.message : "Unknown database error",
      },
      {
        status: 500,
      },
    );
  }
}

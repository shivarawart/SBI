import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

import { sql } from "@/app/lib/db";
import { initializeFeedbackDatabase } from "@/app/lib/feedback.schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/feedback
 */
export async function GET() {
  try {
    await initializeFeedbackDatabase();

    const feedback = await sql`
      SELECT
        id,
        name,
        rating,
        message,
        created_at
      FROM feedback
      ORDER BY created_at DESC
    `;

    return NextResponse.json(
      {
        success: true,
        feedback,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("GET FEEDBACK ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch feedback.",
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/feedback
 */
export async function POST(request: NextRequest) {
  try {
    await initializeFeedbackDatabase();

    let body: {
      name?: unknown;
      rating?: unknown;
      message?: unknown;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Request body must be valid JSON.",
        },
        { status: 400 },
      );
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";

    const message = typeof body.message === "string" ? body.message.trim() : "";

    const rating = Number(body.rating);

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is required.",
        },
        { status: 400 },
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: "Name cannot exceed 100 characters.",
        },
        { status: 400 },
      );
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          success: false,
          error: "Rating must be between 1 and 5.",
        },
        { status: 400 },
      );
    }

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error: "Feedback is required.",
        },
        { status: 400 },
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        {
          success: false,
          error: "Feedback cannot exceed 2000 characters.",
        },
        { status: 400 },
      );
    }

    const feedbackId = randomUUID();

    const result = await sql`
      INSERT INTO feedback (
        id,
        name,
        rating,
        message
      )
      VALUES (
        ${feedbackId},
        ${name},
        ${rating},
        ${message}
      )
      RETURNING
        id,
        name,
        rating,
        message,
        created_at
    `;

    return NextResponse.json(
      {
        success: true,
        message: "Feedback submitted successfully.",
        feedback: result[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST FEEDBACK ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to submit feedback.",
      },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

import { sql } from "@/app/lib/db";
import { initializeDatabase } from "@/app/lib/index";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/videos
 *
 * Returns all published videos.
 */
export async function GET() {
  try {
    await initializeDatabase();

    const videos = await sql`
      SELECT
        v.id,
        v.video_url,
        v.description,
        v.created_at,

        o.id AS owner_id,
        o.name AS owner_name,
        o.email AS owner_email

      FROM videos v

      INNER JOIN owners o
        ON o.id = v.owner_id

      ORDER BY v.created_at DESC
    `;

    return NextResponse.json(
      {
        success: true,
        videos,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("GET VIDEOS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch videos.",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/videos
 *
 * Saves an already-uploaded ImageKit video
 * into Neon.
 */
export async function POST(
  request: NextRequest
) {
  try {
    await initializeDatabase();

    /*
     * -----------------------------------------
     * READ REQUEST
     * -----------------------------------------
     */

    let body: {
      ownerEmail?: unknown;
      videoUrl?: unknown;
      description?: unknown;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Request body must be valid JSON.",
        },
        { status: 400 }
      );
    }

    /*
     * -----------------------------------------
     * OWNER EMAIL
     * -----------------------------------------
     */

    const ownerEmail =
      typeof body.ownerEmail === "string"
        ? body.ownerEmail.trim().toLowerCase()
        : "";

    /*
     * -----------------------------------------
     * VIDEO URL
     * -----------------------------------------
     */

    const videoUrl =
      typeof body.videoUrl === "string"
        ? body.videoUrl.trim()
        : "";

    /*
     * -----------------------------------------
     * DESCRIPTION
     * -----------------------------------------
     */

    const description =
      typeof body.description === "string"
        ? body.description.trim()
        : "";

    /*
     * -----------------------------------------
     * VALIDATE OWNER EMAIL
     * -----------------------------------------
     */

    if (!ownerEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "Owner email is required.",
        },
        { status: 400 }
      );
    }

    /*
     * -----------------------------------------
     * VALIDATE VIDEO URL
     * -----------------------------------------
     */

    if (!videoUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Video URL is required.",
        },
        { status: 400 }
      );
    }

    /*
     * -----------------------------------------
     * VALIDATE URL FORMAT
     * -----------------------------------------
     *
     * We only require HTTPS here.
     *
     * We DO NOT require IMAGEKIT_URL_ENDPOINT
     * because ImageKit has already returned this
     * URL after the successful upload.
     */

    let parsedVideoUrl: URL;

    try {
      parsedVideoUrl = new URL(videoUrl);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid video URL.",
        },
        { status: 400 }
      );
    }

    if (parsedVideoUrl.protocol !== "https:") {
      return NextResponse.json(
        {
          success: false,
          error: "Video URL must use HTTPS.",
        },
        { status: 400 }
      );
    }

    /*
     * -----------------------------------------
     * DESCRIPTION VALIDATION
     * -----------------------------------------
     */

    if (!description) {
      return NextResponse.json(
        {
          success: false,
          error: "Description is required.",
        },
        { status: 400 }
      );
    }

    if (description.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Description cannot exceed 1000 characters.",
        },
        { status: 400 }
      );
    }

    /*
     * -----------------------------------------
     * FIND OWNER
     * -----------------------------------------
     */

    const owners = await sql`
      SELECT
        id,
        name,
        email

      FROM owners

      WHERE email = ${ownerEmail}

      LIMIT 1
    `;

    if (owners.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Owner not found. Make sure the signed-in Clerk email exists in the owners table.",
        },
        { status: 404 }
      );
    }

    const owner = owners[0];

    /*
     * -----------------------------------------
     * CREATE VIDEO ID
     * -----------------------------------------
     */

    const videoId = randomUUID();

    /*
     * -----------------------------------------
     * SAVE VIDEO
     * -----------------------------------------
     */

    const result = await sql`
      INSERT INTO videos (
        id,
        owner_id,
        video_url,
        description
      )

      VALUES (
        ${videoId},
        ${owner.id},
        ${videoUrl},
        ${description}
      )

      RETURNING
        id,
        owner_id,
        video_url,
        description,
        created_at
    `;

    /*
     * -----------------------------------------
     * SUCCESS
     * -----------------------------------------
     */

    return NextResponse.json(
      {
        success: true,

        message: "Video published successfully.",

        video: {
          ...result[0],

          owner: {
            id: owner.id,
            name: owner.name,
            email: owner.email,
          },
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST VIDEOS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to publish video.",
      },
      { status: 500 }
    );
  }
}
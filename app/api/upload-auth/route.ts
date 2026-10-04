import { NextRequest, NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import { sql } from "@/app/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    /*
     * -----------------------------------------
     * CHECK ENVIRONMENT
     * -----------------------------------------
     */

    if (!process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_PUBLIC_KEY) {
      console.error("ImageKit environment variables are missing.");

      return NextResponse.json(
        {
          success: false,
          error: "ImageKit configuration is missing on the server.",
        },
        { status: 500 },
      );
    }

    /*
     * -----------------------------------------
     * READ BODY
     * -----------------------------------------
     */

    let body: {
      ownerEmail?: unknown;
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

    const ownerEmail =
      typeof body.ownerEmail === "string"
        ? body.ownerEmail.trim().toLowerCase()
        : "";

    /*
     * -----------------------------------------
     * VALIDATE EMAIL
     * -----------------------------------------
     */

    if (!ownerEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "Owner email is required.",
        },
        { status: 400 },
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
          error: "Owner account was not found in the database.",
        },
        { status: 404 },
      );
    }

    const owner = owners[0];

    /*
     * -----------------------------------------
     * CREATE IMAGEKIT AUTH
     * -----------------------------------------
     */

    const { token, expire, signature } = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });

    /*
     * -----------------------------------------
     * RESPONSE
     * -----------------------------------------
     */

    return NextResponse.json(
      {
        success: true,

        token,

        expire,

        signature,

        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,

        owner: {
          id: owner.id,
          name: owner.name,
          email: owner.email,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("IMAGEKIT AUTH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate ImageKit authentication.",
      },
      { status: 500 },
    );
  }
}

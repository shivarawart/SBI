import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { sql } from "@/app/lib/db";
import { initializeOwnerDatabase } from "@/app/lib/owner.schema";

export async function POST(request: NextRequest) {
  try {
    await initializeOwnerDatabase();

    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is required",
        },
        { status: 400 },
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is required",
        },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email address",
        },
        { status: 400 },
      );
    }

    const existingOwner = await sql`
      SELECT id
      FROM owners
      WHERE email = ${email}
      LIMIT 1
    `;

    if (existingOwner.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Owner with this email already exists",
        },
        { status: 409 },
      );
    }

    const ownerId = randomUUID();

    const result = await sql`
      INSERT INTO owners (
        id,
        name,
        email
      )
      VALUES (
        ${ownerId},
        ${name},
        ${email}
      )
      RETURNING
        id,
        name,
        email,
        created_at
    `;

    return NextResponse.json(
      {
        success: true,
        message: "Owner created successfully",
        owner: result[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE OWNER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create owner",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await initializeOwnerDatabase();

    const owners = await sql`
      SELECT
        id,
        name,
        email,
        created_at
      FROM owners
      ORDER BY created_at DESC
    `;

    return NextResponse.json({
      success: true,
      owners,
    });
  } catch (error) {
    console.error("GET OWNERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch owners",
      },
      { status: 500 },
    );
  }
}

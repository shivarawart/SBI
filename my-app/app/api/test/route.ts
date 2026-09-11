import { NextResponse } from "next/server";
import dns from "node:dns/promises";

export async function GET() {
  const hostname = "_mongodb._tcp.cluster0.zs21u.mongodb.net";

  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);

    // Test DNS only
    await dns.resolveSrv(hostname);

    return NextResponse.json({
      success: true,
      message: "✅ MongoDB DNS is working",
    });
  } catch (error) {
    console.error("❌ DNS Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "❌ MongoDB DNS failed",
        error: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      },
    );
  }
}

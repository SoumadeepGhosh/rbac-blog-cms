import { NextResponse } from "next/server";
import { hasPermission } from "@/lib/permissions";

export async function GET() {

  const allowed = await hasPermission(
    "manage_users"
  );

  if (!allowed) {
    return NextResponse.json(
      {
        success: false,
        message: "Forbidden",
      },
      {
        status: 403,
      }
    );
  }


  return NextResponse.json({
    success: true,
    message: "Welcome Admin",
  });
}
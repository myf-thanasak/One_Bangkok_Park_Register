import { NextRequest, NextResponse } from "next/server";
import { getAllSlotsForDate } from "@/lib/db";
import { EVENT_DATES, POOL_IDS } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const pool = searchParams.get("pool");

    if (!date || !EVENT_DATES.includes(date as typeof EVENT_DATES[number])) {
      return NextResponse.json(
        { error: "Invalid date" },
        { status: 400 }
      );
    }

    if (!pool || !POOL_IDS.includes(pool as typeof POOL_IDS[number])) {
      return NextResponse.json(
        { error: "Invalid pool" },
        { status: 400 }
      );
    }

    const slots = await getAllSlotsForDate(date, pool);
    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Slots API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

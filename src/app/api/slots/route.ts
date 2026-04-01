import { NextRequest, NextResponse } from "next/server";
import { getAllSlotsForDate } from "@/lib/db";
import { EVENT_DATES } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date || !EVENT_DATES.includes(date as typeof EVENT_DATES[number])) {
      return NextResponse.json(
        { error: "Invalid date" },
        { status: 400 }
      );
    }

    const slots = await getAllSlotsForDate(date);
    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Slots API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createRegistration, getSlotCount, getUserRoundsForDay, getRegistrationsByDate } from "@/lib/db";
import { EVENT_DATES, MAX_PER_SLOT, MAX_ROUNDS_PER_DAY, getPoolByAgeGroup } from "@/lib/constants";
import { sendConfirmationEmail } from "@/lib/email";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { parentName, email, phone, relationship, kidName, kidAgeGroup, selectedDate, selectedTimeSlot } = body;

    if (!parentName || !email || !phone || !relationship || !kidName || !kidAgeGroup || !selectedDate || !selectedTimeSlot) {
      return NextResponse.json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน / All fields are required" }, { status: 400 });
    }

    const poolInfo = getPoolByAgeGroup(kidAgeGroup);
    if (!poolInfo) {
      return NextResponse.json({ error: "ช่วงอายุไม่ถูกต้อง / Invalid age group" }, { status: 400 });
    }
    const pool = poolInfo.id;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "รูปแบบอีเมลไม่ถูกต้อง / Invalid email format" }, { status: 400 });
    }

    const phoneRegex = /^0\d{8,9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: "เบอร์โทรต้อง 9-10 หลัก ขึ้นต้นด้วย 0 / Phone must be 9-10 digits starting with 0" }, { status: 400 });
    }

    if (!EVENT_DATES.includes(selectedDate as typeof EVENT_DATES[number])) {
      return NextResponse.json({ error: "วันที่ไม่ถูกต้อง / Invalid date" }, { status: 400 });
    }

    const poolTimeSlots = poolInfo.timeSlots as readonly string[];
    if (!poolTimeSlots.includes(selectedTimeSlot)) {
      return NextResponse.json({ error: "รอบไม่ถูกต้อง / Invalid time slot for this pool" }, { status: 400 });
    }

    const slotCount = await getSlotCount(selectedDate, selectedTimeSlot, pool);
    if (slotCount >= MAX_PER_SLOT) {
      return NextResponse.json({ error: "รอบนี้เต็มแล้ว / This slot is full" }, { status: 400 });
    }

    const userRounds = await getUserRoundsForDay(parentName, email, phone, selectedDate);
    if (userRounds >= MAX_ROUNDS_PER_DAY) {
      return NextResponse.json({
        error: "คุณลงทะเบียนครบ 2 รอบ/วันแล้ว / You have already registered for 2 rounds today",
      }, { status: 400 });
    }

    const registration = await createRegistration({
      parentName,
      email,
      phone,
      relationship,
      kidName,
      kidAgeGroup,
      pool,
      selectedDate,
      selectedTimeSlot,
    });

    try {
      await sendConfirmationEmail({
        parentName,
        email,
        kidName,
        pool,
        selectedDate,
        selectedTimeSlot,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return NextResponse.json({ success: true, registration }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาด / Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    const pool = searchParams.get("pool") || undefined;
    const registrations = await getRegistrationsByDate(date, pool);
    return NextResponse.json({ registrations });
  } catch (error) {
    console.error("Get registrations error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

"use client";

import { useSearchParams } from "next/navigation";
import { EVENT_DATE_LABELS, getPoolById } from "@/lib/constants";
import { Suspense } from "react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const parent = searchParams.get("parent") || "";
  const kid = searchParams.get("kid") || "";
  const poolParam = searchParams.get("pool") || "";
  const poolInfo = getPoolById(poolParam);
  const dateLabel = EVENT_DATE_LABELS[date];

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="card text-center">
          <div className="text-6xl mb-4 animate-splash">🎉</div>
          <h1 className="text-3xl font-extrabold text-water-600 mb-2">
            The Whimsical Water Park
          </h1>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-green-700 font-bold text-lg mb-1">
              ✅ ขอบคุณสำหรับการลงทะเบียน!
            </p>
            <p className="text-green-600 text-sm">
              Thank you for registering for the activity.
            </p>
          </div>

          {parent && (
            <div className="text-left bg-water-50 rounded-xl p-4 mb-4 space-y-2 text-sm">
              {poolInfo && (
                <div className="flex justify-between">
                  <span className="text-gray-500">สระ / Pool:</span>
                  <span className="font-semibold text-water-600">{poolInfo.name}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">ผู้ปกครอง / Parent:</span>
                <span className="font-semibold">{parent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">เด็ก / Kid:</span>
                <span className="font-semibold">{kid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">วันที่ / Date:</span>
                <span className="font-semibold">
                  {dateLabel?.th || date}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">รอบ / Time:</span>
                <span className="font-bold text-water-600 text-lg">{time}</span>
              </div>
            </div>
          )}

          <div className="bg-sunshine-50 border border-sunshine-200 rounded-xl p-4 mb-6 text-left text-sm space-y-2">
            <p className="font-bold text-sunshine-700">📌 ข้อมูลสำคัญ / Important Notes:</p>
            <ul className="space-y-1 text-gray-600 list-disc list-inside">
              <li>
                กรุณาแจ้งชื่อ นามสกุล พร้อมแสดงหน้าสมาชิก One Bangkok เพื่อร่วมกิจกรรมที่หน้างาน
              </li>
              <li>
                Please provide your full name and present One Bangkok Membership ID to check in at the event.
              </li>
              <li>
                ผู้เข้าร่วมจะต้องมาถึงก่อนเวลา 15 นาที หากมาสายจะถือว่าสละสิทธิ์
              </li>
              <li>
                Participant must arrive at least 15 minutes in advance; late arrivals will forfeit their slot.
              </li>
              <li>
                หากสมาชิกลงทะเบียนเกิน 2 รอบ/วัน ทางบริษัทขอสงวนสิทธิ์นับเฉพาะการลงทะเบียน 2 รอบแรกเท่านั้น
              </li>
              <li>
                If a member registers more than 2 rounds/day, the company reserves the right to count only the first two registrations.
              </li>
            </ul>
          </div>

          <a
            href="/"
            className="btn-primary inline-block"
          >
            🏠 กลับหน้าหลัก / Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-water-500 text-xl">Loading...</div></div>}>
      <ThankYouContent />
    </Suspense>
  );
}

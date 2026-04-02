"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EVENT_DATES, EVENT_DATE_LABELS, TIME_SLOTS } from "@/lib/constants";
import * as XLSX from "xlsx";

interface Registration {
  id: number;
  parent_name: string;
  email: string;
  phone: string;
  relationship: string;
  kid_name: string;
  kid_age_group: string;
  selected_date: string;
  selected_time_slot: string;
  created_at: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<typeof EVENT_DATES[number]>(EVENT_DATES[0]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session && selectedDate) {
      setLoading(true);
      fetch(`/api/registrations?date=${selectedDate}`)
        .then((r) => r.json())
        .then((data) => {
          setRegistrations(data.registrations || []);
          setLoading(false);
        })
        .catch(() => {
          setRegistrations([]);
          setLoading(false);
        });
    }
  }, [session, selectedDate]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-water-500 text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  const groupedBySlot: Record<string, Registration[]> = {};
  TIME_SLOTS.forEach((slot) => {
    groupedBySlot[slot] = registrations.filter((r) => r.selected_time_slot === slot);
  });

  const totalRegistrations = registrations.length;

  const exportToExcel = () => {
    if (registrations.length === 0) {
      alert("ไม่มีข้อมูลสำหรับวันที่เลือก / No data for selected date");
      return;
    }

    const dateLabel = EVENT_DATE_LABELS[selectedDate];
    const rows = registrations.map((reg, idx) => ({
      "#": idx + 1,
      "Time Slot / รอบ": reg.selected_time_slot,
      "Parent / ผู้ปกครอง": reg.parent_name,
      "Email": reg.email,
      "Phone / โทรศัพท์": reg.phone,
      "Relationship / ความสัมพันธ์": reg.relationship,
      "Kid / ชื่อเด็ก": reg.kid_name,
      "Age Group / ช่วงอายุ": reg.kid_age_group,
      "Registered At / ลงทะเบียนเมื่อ": new Date(reg.created_at).toLocaleString("th-TH"),
    }));

    const ws = XLSX.utils.json_to_sheet(rows);

    // Auto column widths
    const colWidths = Object.keys(rows[0]).map((key) => ({
      wch: Math.max(key.length, ...rows.map((r) => String((r as Record<string, unknown>)[key] || "").length)) + 2,
    }));
    ws["!cols"] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${selectedDate}`);
    XLSX.writeFile(wb, `Registrations_${selectedDate}_${dateLabel?.en?.replace(/\s/g, "_") || selectedDate}.xlsx`);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-water text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">🌊 Admin Dashboard</h1>
            <p className="text-sm opacity-80">The Whimsical Water Park</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-80">👤 {session.user?.name}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Date Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {EVENT_DATES.map((date) => {
            const label = EVENT_DATE_LABELS[date];
            const day = date.split("-")[2];
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  selectedDate === date
                    ? "bg-water-500 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-water-50 border border-gray-200"
                }`}
              >
                {day} {label.en.replace("th April 2026", " Apr")}
              </button>
            );
          })}
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="card bg-water-50 border-water-200">
            <div className="text-3xl font-extrabold text-water-600">{totalRegistrations}</div>
            <div className="text-sm text-gray-500">Total Registrations</div>
          </div>
          <div className="card bg-green-50 border-green-200">
            <div className="text-3xl font-extrabold text-green-600">
              {TIME_SLOTS.filter((s) => (groupedBySlot[s]?.length || 0) > 0).length}
            </div>
            <div className="text-sm text-gray-500">Active Slots</div>
          </div>
          <div className="card bg-sunshine-50 border-sunshine-200">
            <div className="text-3xl font-extrabold text-sunshine-600">
              {TIME_SLOTS.filter((s) => (groupedBySlot[s]?.length || 0) >= 30).length}
            </div>
            <div className="text-sm text-gray-500">Full Slots</div>
          </div>
          <div className="card bg-purple-50 border-purple-200">
            <div className="text-3xl font-extrabold text-purple-600">
              {TIME_SLOTS.length * 30 - totalRegistrations}
            </div>
            <div className="text-sm text-gray-500">Remaining Capacity</div>
          </div>
        </div>

        {/* Date Title + Export */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-700">
            📅 {EVENT_DATE_LABELS[selectedDate]?.th} / {EVENT_DATE_LABELS[selectedDate]?.en}
          </h2>
          <button
            onClick={exportToExcel}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all shadow-md flex items-center gap-2"
          >
            📥 Export Excel
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : (
          <div className="space-y-4">
            {TIME_SLOTS.map((slot) => {
              const slotRegs = groupedBySlot[slot] || [];
              const count = slotRegs.length;
              if (count === 0) return (
                <div key={slot} className="card opacity-50">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-400">{slot}</span>
                    <span className="text-sm text-gray-400">0 / 30</span>
                  </div>
                </div>
              );
              return (
                <div key={slot} className="card">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-water-700 text-lg">🕐 {slot}</span>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      count >= 30
                        ? "bg-red-100 text-red-600"
                        : count >= 20
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-600"
                    }`}>
                      {count} / 30
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        count >= 30 ? "bg-red-500" : count >= 20 ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min((count / 30) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500 border-b">
                          <th className="py-2 pr-3">#</th>
                          <th className="py-2 pr-3">Parent</th>
                          <th className="py-2 pr-3">Email</th>
                          <th className="py-2 pr-3">Phone</th>
                          <th className="py-2 pr-3">Relationship</th>
                          <th className="py-2 pr-3">Kid</th>
                          <th className="py-2 pr-3">Age Group</th>
                          <th className="py-2">Registered At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {slotRegs.map((reg, idx) => (
                          <tr key={reg.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 pr-3 text-gray-400">{idx + 1}</td>
                            <td className="py-2 pr-3 font-semibold">{reg.parent_name}</td>
                            <td className="py-2 pr-3 text-water-600">{reg.email}</td>
                            <td className="py-2 pr-3">{reg.phone}</td>
                            <td className="py-2 pr-3 capitalize">{reg.relationship}</td>
                            <td className="py-2 pr-3 font-semibold">{reg.kid_name}</td>
                            <td className="py-2 pr-3">{reg.kid_age_group}</td>
                            <td className="py-2 text-gray-400 text-xs">
                              {new Date(reg.created_at).toLocaleString("th-TH")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

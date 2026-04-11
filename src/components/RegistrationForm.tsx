"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  EVENT_DATES,
  EVENT_DATE_LABELS,
  POOLS,
  MAX_PER_SLOT,
  RELATIONSHIPS,
  AGE_GROUPS,
  getPoolByAgeGroup,
} from "@/lib/constants";

interface SlotData {
  [timeSlot: string]: number;
}

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [slotData, setSlotData] = useState<SlotData>({});
  const [error, setError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [consentPDPA, setConsentPDPA] = useState(false);
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");
  const [kidName, setKidName] = useState("");
  const [kidAgeGroup, setKidAgeGroup] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [consentRules, setConsentRules] = useState(false);

  const selectedPool = getPoolByAgeGroup(kidAgeGroup);
  const poolTimeSlots = selectedPool?.timeSlots ?? [];

  useEffect(() => {
    if (selectedDate && selectedPool) {
      fetch(`/api/slots?date=${selectedDate}&pool=${selectedPool.id}`)
        .then((r) => r.json())
        .then((data) => setSlotData(data.slots || {}))
        .catch(() => setSlotData({}));
      setSelectedTimeSlot("");
    }
  }, [selectedDate, selectedPool]);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName,
          email,
          phone,
          relationship,
          kidName,
          kidAgeGroup,
          selectedDate,
          selectedTimeSlot,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "เกิดข้อผิดพลาด / An error occurred");
        setLoading(false);
        return;
      }
      window.location.href = `/thank-you?date=${selectedDate}&time=${encodeURIComponent(selectedTimeSlot)}&parent=${encodeURIComponent(parentName)}&kid=${encodeURIComponent(kidName)}&pool=${selectedPool?.id || ""}`;
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่ / An error occurred, please try again");
      setLoading(false);
    }
  };

  const canProceedStep1 = consentPDPA;
  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isValidPhone = (val: string) => /^0\d{8,9}$/.test(val);

  const validateStep2 = () => {
    let valid = true;
    setEmailError("");
    setPhoneError("");

    if (!isValidEmail(email)) {
      setEmailError("กรุณากรอกอีเมลให้ถูกต้อง / Please enter a valid email");
      valid = false;
    }
    if (!isValidPhone(phone)) {
      setPhoneError("กรุณากรอกเบอร์โทร 9-10 หลัก ขึ้นต้นด้วย 0 / Phone must be 9-10 digits starting with 0");
      valid = false;
    }
    return valid;
  };

  const canProceedStep2 = parentName && email && phone && relationship && kidName && kidAgeGroup;
  const canProceedStep3 = selectedDate && selectedTimeSlot;
  const canSubmit = consentRules;

  return (
    <div className="space-y-6">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                step >= s
                  ? "bg-water-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {s}
            </div>
            {s < 4 && (
              <div
                className={`w-12 h-1 mx-1 rounded ${
                  step > s ? "bg-water-400" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: PDPA Consent */}
      {step === 1 && (
        <div className="card">
          <h2 className="text-xl font-bold text-water-700 mb-4">
            🔒 ความยินยอมข้อมูลส่วนบุคคล / PDPA Consent
          </h2>
          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 max-h-64 overflow-y-auto mb-4 leading-relaxed border border-gray-200">
            <p className="mb-3">
              ข้าพเจ้าขอให้ความยินยอมตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562 แก่บริษัท วัน แบงค็อก จำกัด (&quot;บริษัทฯ&quot;) รวมถึงบริษัทในเครือ และตัวแทน ในการเก็บรวบรวม ใช้ เปิดเผย และ/หรือโอนข้อมูลส่วนบุคคลของข้าพเจ้าไปยังผู้ที่ได้รับการแต่งตั้งโดยบริษัทฯ หรือบุคคลที่สาม จากการที่ข้าพเจ้าได้เข้าร่วมกิจกรรม &quot;The Whimsical Water Park&quot; ที่จัดโดยบริษัท แอ๊บโซลูท อีเว้นท์ จำกัด ในวันที่ 10 ถึง 15 เมษายน รวมถึง เผยแพร่ ประชาสัมพันธ์ ข้อมูลส่วนบุคคลของข้าพเจ้าผ่านทางสื่ออิเลคทรอนิกส์ สื่อสิ่งพิมพ์ เว็บไซต์ อินเตอร์เน็ต หรือสื่อสังคมออนไลน์ต่างๆ เพื่อวัตถุประสงค์ในการเผยแพร่ ประชาสัมพันธ์ การดำเนินการและการจัดกิจกรรมต่างๆที่เกี่ยวข้องของบริษัทฯ รวมทั้ง เพื่อแจ้งข้อมูลทางการตลาด การขาย ข้อเสนอพิเศษ โปรโมชั่น ประกาศ ข่าวสาร และข้อมูลเกี่ยวกับสินค้าและบริการต่าง ๆ จากกลุ่มบริษัทฯ รวมถึงบริษัทในเครือ บริษัทย่อย บุคคลภายนอก และ/หรือหุ้นส่วนทางธุรกิจ และท่านยืนยันแล้วว่าท่านมีอายุ 10 ปี ขึ้นไป
            </p>
            <p className="mb-3">
              ตรวจสอบนโยบายความเป็นส่วนตัวของบริษัทฯได้ที่{" "}
              <a href="https://www.onebangkok.com/th/privacy-policy" target="_blank" className="text-water-500 underline">
                https://www.onebangkok.com/th/privacy-policy
              </a>
            </p>
            <hr className="my-3" />
            <p className="mb-3">
              I hereby give my consent in accordance with the Personal Data Protection Act B.E. 2562 to One Bangkok Co., Ltd. (&quot;the Company&quot;), including its affiliates and agents, to collect, use, disclose and/or transfer of my Personal Data to an authorized person or third parties from participation in the Event &quot;The Whimsical Water Park&quot; organized by the ABSOLUTE EVENT CO.,LTD. on 10th to 15th April and publish my Personal Data through any electronic media, print media, website, internet or online social media for the purposes of the dissemination, publicity, operations and organizing any related activities of the Company, including to provide marketing communications, sales, special offers, promotions, notices, news, and information about products and services from the Company, our affiliates, subsidiaries, third parties and/or business partners, and confirm that you are at least 10 years old.
            </p>
            <p>
              Check the Company&apos;s Privacy Policy at{" "}
              <a href="https://www.onebangkok.com/en/privacy-policy/" target="_blank" className="text-water-500 underline">
                https://www.onebangkok.com/en/privacy-policy/
              </a>
            </p>
          </div>
          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-water-50 transition">
            <input
              type="checkbox"
              checked={consentPDPA}
              onChange={(e) => setConsentPDPA(e.target.checked)}
              className="mt-1 w-5 h-5 accent-water-500"
            />
            <span className="font-semibold text-gray-700">
              &quot;ให้&quot; ความยินยอม / I consent <span className="text-red-500">*</span>
            </span>
          </label>
          <div className="mt-6 text-right">
            <button
              disabled={!canProceedStep1}
              onClick={() => setStep(2)}
              className="btn-primary"
            >
              ถัดไป / Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Personal Information */}
      {step === 2 && (
        <div className="card">
          <h2 className="text-xl font-bold text-water-700 mb-2">
            📝 ข้อมูลผู้ลงทะเบียน / Registration Info
          </h2>
          <p className="text-sm text-gray-500 mb-1">
            กรุณากรอกข้อมูลให้ถูกต้อง และครบถ้วนเพื่อร่วมกิจกรรม The Whimsical Water Park
          </p>
          <p className="text-sm text-gray-500 mb-1">
            Please complete all required information to participate in The Whimsical Water Park.
          </p>
          <div className="bg-sunshine-50 border border-sunshine-200 rounded-xl p-3 mb-6 text-sm">
            <p className="font-semibold text-sunshine-700">⚠️ สงวนสิทธิ์สำหรับสมาชิก ONE BANGKOK เท่านั้น</p>
            <p className="text-sunshine-600 text-xs mt-1">
              สิทธิ์มีจำนวนจำกัด, จำกัด 1 สิทธิ์ / การจอง และ สูงสุดลงทะเบียนได้ 2 รอบ / สมาชิก / วัน
            </p>
            <p className="text-sunshine-600 text-xs mt-1">
              Reserved for ONE BANGKOK members only. (Slots are limited: 1 reservation per booking, up to 2 bookings per member per day.)
            </p>
          </div>

          <div className="space-y-5">
            {/* Parent Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                ชื่อ – นามสกุลผู้ปกครอง / Parent&apos;s Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="input-field"
                placeholder="กรุณากรอกชื่อ-นามสกุล"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                อีเมล / Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                className={`input-field ${emailError ? "border-red-400 ring-1 ring-red-400" : ""}`}
                placeholder="example@email.com"
              />
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                เบอร์โทรติดต่อ / Contact Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => { const v = e.target.value.replace(/\D/g, "").slice(0, 10); setPhone(v); setPhoneError(""); }}
                className={`input-field ${phoneError ? "border-red-400 ring-1 ring-red-400" : ""}`}
                placeholder="0xxxxxxxxx"
                maxLength={10}
                inputMode="numeric"
              />
              {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
            </div>

            {/* Relationship */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ความสัมพันธ์ / Relationship <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {RELATIONSHIPS.map((rel) => (
                  <div
                    key={rel.value}
                    onClick={() => setRelationship(rel.value)}
                    className={`radio-card text-center ${
                      relationship === rel.value ? "selected" : ""
                    }`}
                  >
                    <div className="text-2xl mb-1">
                      {rel.value === "father" ? "👨" : rel.value === "mother" ? "👩" : "👤"}
                    </div>
                    <div className="text-sm font-semibold">{rel.th}</div>
                    <div className="text-xs text-gray-500">{rel.en}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kid Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                ชื่อ – นามสกุล (เด็ก) / Kid&apos;s Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={kidName}
                onChange={(e) => setKidName(e.target.value)}
                className="input-field"
                placeholder="กรุณากรอกชื่อ-นามสกุลเด็ก"
              />
            </div>

            {/* Kid Age Group / Pool Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                อายุเด็ก / Kid&apos;s Age <span className="text-red-500">*</span>
              </label>
              <div className="space-y-4">
                {AGE_GROUPS.map((age) => {
                  const pool = POOLS[age.pool];
                  return (
                    <div
                      key={age.value}
                      onClick={() => {
                        setKidAgeGroup(age.value);
                        setSelectedDate("");
                        setSelectedTimeSlot("");
                      }}
                      className={`radio-card overflow-hidden ${
                        kidAgeGroup === age.value ? "selected" : ""
                      }`}
                    >
                      <div className="relative w-full h-40 -mx-4 -mt-4 mb-3">
                        <Image
                          src={pool.image}
                          alt={pool.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="font-bold text-base text-water-700">{pool.name}</div>
                      <div className="font-semibold text-sm mt-1">{age.th}</div>
                      <div className="text-xs text-gray-500">{age.en}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(1)} className="text-water-500 font-semibold hover:underline">
              ← ย้อนกลับ / Back
            </button>
            <button
              disabled={!canProceedStep2}
              onClick={() => { if (validateStep2()) setStep(3); }}
              className="btn-primary"
            >
              ถัดไป / Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Date & Time Selection */}
      {step === 3 && (
        <div className="card">
          <h2 className="text-xl font-bold text-water-700 mb-2">
            📅 เลือกวันและรอบกิจกรรม / Select Date & Time
          </h2>
          {selectedPool && (
            <div className="bg-water-50 border border-water-200 rounded-xl p-3 mb-6 text-sm">
              <div className="relative w-full h-32 -mx-3 -mt-3 mb-3 rounded-t-xl overflow-hidden" style={{ width: "calc(100% + 1.5rem)" }}>
                <Image
                  src={selectedPool.image}
                  alt={selectedPool.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
              <p className="font-semibold text-water-700">🏄 {selectedPool.name}</p>
              <p className="text-water-600 text-xs mt-1">{selectedPool.heightTh}</p>
              <p className="text-water-600 text-xs">{selectedPool.heightEn}</p>
              <p className="text-red-500 text-xs mt-1">
                {selectedPool.remarkTh} / {selectedPool.remarkEn}
              </p>
            </div>
          )}

          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              กรุณาเลือกวันที่ต้องการเข้าร่วมกิจกรรม / Please select preferred date <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {EVENT_DATES.map((date) => {
                const label = EVENT_DATE_LABELS[date];
                const day = date.split("-")[2];
                return (
                  <div
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`date-card ${selectedDate === date ? "selected" : ""}`}
                  >
                    <div className="text-3xl font-extrabold text-sunshine-500">{day}</div>
                    <div className="text-xs font-semibold text-gray-600 mt-1">
                      {label.th.replace(`วันที่ ${day} `, "")}
                    </div>
                    <div className="text-xs text-gray-400">{label.en}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Slot Selection */}
          {selectedDate && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                รอบกิจกรรม / Activity Rounds — {EVENT_DATE_LABELS[selectedDate]?.th} <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {poolTimeSlots.map((slot: string) => {
                  const count = slotData[slot] || 0;
                  const isFull = count >= MAX_PER_SLOT;
                  const remaining = MAX_PER_SLOT - count;
                  return (
                    <div
                      key={slot}
                      onClick={() => !isFull && setSelectedTimeSlot(slot)}
                      className={`slot-card ${
                        selectedTimeSlot === slot
                          ? "selected"
                          : isFull
                          ? "full"
                          : ""
                      }`}
                    >
                      <div className="text-sm font-semibold">{slot}</div>
                      <div className={`text-xs mt-1 ${isFull ? "text-red-400" : "text-green-500"}`}>
                        {isFull ? "เต็ม / Full" : `เหลือ ${remaining} ที่`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(2)} className="text-water-500 font-semibold hover:underline">
              ← ย้อนกลับ / Back
            </button>
            <button
              disabled={!canProceedStep3}
              onClick={() => setStep(4)}
              className="btn-primary"
            >
              ถัดไป / Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Rules & Submit */}
      {step === 4 && (
        <div className="card">
          <h2 className="text-xl font-bold text-water-700 mb-4">
            📋 ข้อกำหนดและกฎระเบียบ / Rules & Regulations
          </h2>

          <div className="space-y-4 text-sm mb-6">
            {/* Dress Code */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h3 className="font-bold text-water-700 mb-2">👕 การแต่งกาย / Dress Code</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• ต้องสวมชุดว่ายน้ำ / Proper swimwear or appropriate attire is required</li>
                <li>• ห้ามสวมเสื้อผ้าที่มีซิป กระดุม โลหะ หรือของมีคม / Clothing with zippers, buttons, metal parts, or sharp objects is prohibited</li>
                <li>• ไม่สวมรองเท้า แว่นตา นาฬิกา หรือเครื่องประดับขณะเล่น / Shoes, glasses, watches, and accessories are not allowed during play</li>
              </ul>
            </div>

            {/* Prohibited Behavior */}
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <h3 className="font-bold text-red-600 mb-2">🚫 ข้อห้ามในการเล่น / Prohibited Behavior</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• ห้ามผลัก ดึง กระโดดทับ หรือเล่นรุนแรง / No pushing, pulling, jumping on others, or rough play</li>
                <li>• ห้ามปีน ขึ้นขอบด้านนอก หรือจุดที่ไม่ได้ออกแบบให้เล่น / Do not climb on edges, outer structures, or restricted areas</li>
                <li>• ห้ามนำอาหาร เครื่องดื่ม หรือของเล่นแข็งเข้าไปในสวนน้ำ / No food, drinks, or hard toys allowed inside the water park</li>
              </ul>
            </div>

            {/* Health */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <h3 className="font-bold text-green-700 mb-2">🏥 สุขภาพ / Health & Safety</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• ผู้ที่มีโรคประจำตัว เช่น โรคหัวใจ โรคลมชัก หรือสตรีมีครรภ์ ควรหลีกเลี่ยงการเล่น / Individuals with medical conditions (e.g. heart disease, epilepsy) or pregnant guardians are advised to refrain from participation</li>
                <li>• หากรู้สึกไม่สบาย ให้หยุดเล่นและแจ้งเจ้าหน้าที่ทันที / If you feel unwell, please stop immediately and inform staff</li>
              </ul>
            </div>

            {/* Staff Authority */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <h3 className="font-bold text-purple-700 mb-2">👮 การดูแลของเจ้าหน้าที่ / Staff Authority</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• กรุณาปฏิบัติตามคำแนะนำของเจ้าหน้าที่อย่างเคร่งครัด / Please strictly follow all staff instructions</li>
                <li>• เจ้าหน้าที่ขอสงวนสิทธิ์ในการยุติการเล่น หากพบพฤติกรรมที่ไม่ปลอดภัย / Staff reserve the right to stop any activity if unsafe behavior is observed</li>
              </ul>
            </div>
          </div>

          {/* Agreement */}
          <div className="bg-sunshine-50 rounded-xl p-4 border border-sunshine-200 mb-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentRules}
                onChange={(e) => setConsentRules(e.target.checked)}
                className="mt-1 w-5 h-5 accent-sunshine-500"
              />
              <div>
                <p className="font-semibold text-gray-700 text-sm">
                  Agreement <span className="text-red-500">*</span>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  ข้าพเจ้าได้อ่านและเข้าใจกฎระเบียบ ข้อกำหนด และเงื่อนไขทั้งหมดของกิจกรรมแล้ว
                  และยินยอมปฏิบัติตามทุกประการ รวมถึงยอมรับความเสี่ยงที่อาจเกิดขึ้นจากการเข้าร่วมกิจกรรม
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  I have read and understood all rules, terms, and conditions of the activity.
                  I agree to comply with all regulations and acknowledge any risks associated with participation.
                </p>
              </div>
            </label>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 rounded-xl p-3 text-sm border border-red-200 mb-4">
              ⚠️ {error}
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(3)} className="text-water-500 font-semibold hover:underline">
              ← ย้อนกลับ / Back
            </button>
            <button
              disabled={!canSubmit || loading}
              onClick={handleSubmit}
              className="btn-sunshine text-lg"
            >
              {loading ? "กำลังส่ง... / Submitting..." : "🎉 ลงทะเบียน / Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

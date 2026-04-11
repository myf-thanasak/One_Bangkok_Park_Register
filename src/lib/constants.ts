export const EVENT_DATES = [
  "2026-04-10",
  "2026-04-11",
  "2026-04-12",
  "2026-04-13",
  "2026-04-14",
  "2026-04-15",
] as const;

export const EVENT_DATE_LABELS: Record<string, { th: string; en: string }> = {
  "2026-04-10": {
    th: "วันที่ 10 เมษายน 2569",
    en: "10th April 2026",
  },
  "2026-04-11": {
    th: "วันที่ 11 เมษายน 2569",
    en: "11th April 2026",
  },
  "2026-04-12": {
    th: "วันที่ 12 เมษายน 2569",
    en: "12th April 2026",
  },
  "2026-04-13": {
    th: "วันที่ 13 เมษายน 2569",
    en: "13th April 2026",
  },
  "2026-04-14": {
    th: "วันที่ 14 เมษายน 2569",
    en: "14th April 2026",
  },
  "2026-04-15": {
    th: "วันที่ 15 เมษายน 2569",
    en: "15th April 2026",
  },
};

export const TIME_SLOTS = [
  "10:00 - 10:30",
  "10:35 - 11:05",
  "11:10 - 11:40",
  "11:45 - 12:15",
  "12:20 - 12:50",
  "12:55 - 13:25",
  "14:00 - 14:30",
  "14:35 - 15:05",
  "15:10 - 15:40",
  "16:15 - 16:45",
  "16:50 - 17:20",
  "17:25 - 17:55",
  "18:00 - 18:30",
  "18:35 - 19:05",
  "19:10 - 19:40",
] as const;

export const MAX_PER_SLOT = 30;
export const MAX_ROUNDS_PER_DAY = 2;

export const RELATIONSHIPS = [
  { value: "father", th: "พ่อ", en: "Father" },
  { value: "mother", th: "แม่", en: "Mother" },
  { value: "guardian", th: "ผู้ปกครอง", en: "Guardian" },
] as const;

export const AGE_GROUPS = [
  {
    value: "4-8",
    th: "อายุ 4-8 ปี (Little Bloom Water Park)",
    en: "4-8 years old (Little Bloom Water Park)",
  },
  {
    value: "9-12",
    th: "อายุ 9-12 ปี (Sunshine Water Park)",
    en: "9-12 years old (Sunshine Water Park)",
  },
] as const;

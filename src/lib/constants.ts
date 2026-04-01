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
  "10:15 - 10:45",
  "10:50 - 11:20",
  "11:25 - 11:55",
  "12:00 - 12:30",
  "13:05 - 13:35",
  "13:40 - 14:10",
  "14:15 - 14:45",
  "14:50 - 15:20",
  "15:25 - 15:55",
  "16:30 - 17:00",
  "17:05 - 17:35",
  "17:40 - 18:10",
  "18:15 - 18:45",
  "18:50 - 19:20",
  "19:25 - 19:55",
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

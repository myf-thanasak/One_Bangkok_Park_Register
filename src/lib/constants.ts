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

export const POOLS = {
  "little-bloom": {
    id: "little-bloom",
    name: "Little Bloom Water Park",
    image: "/LittleBloomWaterPark.webp",
    ageGroup: "4-8",
    heightTh: "ผู้เล่นต้องมีส่วนสูง 100 – 135 ซม. หรือ อายุ 4 – 8 ปี",
    heightEn: "Participants must be 100 – 135 cm in height or 4 – 8 years old",
    remarkTh: "*หมายเหตุ เด็กเล็กต้องอยู่ในความดูแลของผู้ปกครองตลอดเวลา",
    remarkEn: "*Remark Children must be under parental supervision at all times",
    timeSlots: [
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
    ] as const,
  },
  "sunshine": {
    id: "sunshine",
    name: "Sunshine Water Park",
    image: "/SunshineWaterPark.webp",
    ageGroup: "9-12",
    heightTh: "ผู้เล่นต้องมีส่วนสูง 135 - 160 ซม. หรือ อายุ 9 - 12 ปี",
    heightEn: "Participants must be 135 – 160 cm in height or 9 - 12 years old",
    remarkTh: "*หมายเหตุ เด็กเล็กต้องอยู่ในความดูแลของผู้ปกครองตลอดเวลา",
    remarkEn: "*Remark Children must be under parental supervision at all times",
    timeSlots: [
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
    ] as const,
  },
} as const;

export type PoolId = keyof typeof POOLS;
export const POOL_IDS = Object.keys(POOLS) as PoolId[];

export const ALL_TIME_SLOTS = [
  ...POOLS["little-bloom"].timeSlots,
  ...POOLS["sunshine"].timeSlots,
];

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
    pool: "little-bloom" as PoolId,
    th: "อายุ 4-8 ปี / 4-8 years old",
    en: "Little Bloom Water Park",
  },
  {
    value: "9-12",
    pool: "sunshine" as PoolId,
    th: "อายุ 9-12 ปี / 9-12 years old",
    en: "Sunshine Water Park",
  },
] as const;

export function getPoolByAgeGroup(ageGroup: string): typeof POOLS[PoolId] | null {
  const ag = AGE_GROUPS.find((a) => a.value === ageGroup);
  if (!ag) return null;
  return POOLS[ag.pool];
}

export function getPoolById(poolId: string): typeof POOLS[PoolId] | null {
  if (poolId in POOLS) return POOLS[poolId as PoolId];
  return null;
}

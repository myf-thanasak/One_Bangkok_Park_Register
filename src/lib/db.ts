import { sql } from "@vercel/postgres";

export async function getSlotCount(
  date: string,
  timeSlot: string
): Promise<number> {
  const result = await sql`
    SELECT COUNT(*) as count FROM registrations 
    WHERE selected_date = ${date} AND selected_time_slot = ${timeSlot}
  `;
  return parseInt(result.rows[0].count, 10);
}

export async function getUserRoundsForDay(
  parentName: string,
  email: string,
  phone: string,
  date: string
): Promise<number> {
  const result = await sql`
    SELECT COUNT(*) as count FROM registrations 
    WHERE selected_date = ${date}
      AND (parent_name = ${parentName} OR email = ${email} OR phone = ${phone})
  `;
  return parseInt(result.rows[0].count, 10);
}

export async function getAllSlotsForDate(
  date: string
): Promise<Record<string, number>> {
  const result = await sql`
    SELECT selected_time_slot, COUNT(*) as count 
    FROM registrations 
    WHERE selected_date = ${date}
    GROUP BY selected_time_slot
  `;
  const slots: Record<string, number> = {};
  for (const row of result.rows) {
    slots[row.selected_time_slot] = parseInt(row.count, 10);
  }
  return slots;
}

export interface Registration {
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

export async function createRegistration(data: {
  parentName: string;
  email: string;
  phone: string;
  relationship: string;
  kidName: string;
  kidAgeGroup: string;
  selectedDate: string;
  selectedTimeSlot: string;
}): Promise<Registration> {
  const result = await sql`
    INSERT INTO registrations (parent_name, email, phone, relationship, kid_name, kid_age_group, selected_date, selected_time_slot)
    VALUES (${data.parentName}, ${data.email}, ${data.phone}, ${data.relationship}, ${data.kidName}, ${data.kidAgeGroup}, ${data.selectedDate}, ${data.selectedTimeSlot})
    RETURNING *
  `;
  return result.rows[0] as Registration;
}

export async function getRegistrationsByDate(
  date: string
): Promise<Registration[]> {
  const result = await sql`
    SELECT * FROM registrations 
    WHERE selected_date = ${date}
    ORDER BY selected_time_slot ASC, created_at ASC
  `;
  return result.rows as Registration[];
}

export async function getRegistrationsSummary(): Promise<
  { selected_date: string; count: number }[]
> {
  const result = await sql`
    SELECT selected_date, COUNT(*) as count 
    FROM registrations 
    GROUP BY selected_date 
    ORDER BY selected_date ASC
  `;
  return result.rows as { selected_date: string; count: number }[];
}

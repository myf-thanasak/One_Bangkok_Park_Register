import { Resend } from "resend";
import { EVENT_DATE_LABELS, getPoolById } from "./constants";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendConfirmationEmail(data: {
  parentName: string;
  email: string;
  kidName: string;
  pool: string;
  selectedDate: string;
  selectedTimeSlot: string;
}) {
  const dateLabel = EVENT_DATE_LABELS[data.selectedDate];
  const poolInfo = getPoolById(data.pool);
  const poolName = poolInfo?.name || data.pool;

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0099e6 0%, #4dc3ff 50%, #00c9ff 100%); padding: 3px; border-radius: 16px;">
      <div style="background: white; border-radius: 14px; padding: 40px 30px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0099e6; margin: 0; font-size: 28px;">🌊 The Whimsical Water Park</h1>
          <p style="color: #666; margin-top: 8px; font-size: 14px;">${poolName} Registration Confirmation</p>
        </div>

        <div style="background: #f0f9ff; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h2 style="color: #0077b3; margin: 0 0 16px 0; font-size: 18px;">
            ✅ การลงทะเบียนสำเร็จ / Registration Confirmed
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 40%;">สระ / Pool:</td>
              <td style="padding: 8px 0; color: #0099e6; font-weight: 700;">${poolName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; width: 40%;">ชื่อผู้ปกครอง / Parent:</td>
              <td style="padding: 8px 0; color: #333; font-weight: 600;">${data.parentName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">ชื่อเด็ก / Kid:</td>
              <td style="padding: 8px 0; color: #333; font-weight: 600;">${data.kidName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">วันที่ / Date:</td>
              <td style="padding: 8px 0; color: #333; font-weight: 600;">${dateLabel?.th || data.selectedDate}<br/>${dateLabel?.en || ""}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">รอบ / Time:</td>
              <td style="padding: 8px 0; color: #0099e6; font-weight: 700; font-size: 18px;">${data.selectedTimeSlot}</td>
            </tr>
          </table>
        </div>

        <div style="background: #fff7ed; border-left: 4px solid #ffc61a; padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
          <p style="margin: 0 0 8px 0; color: #92400e; font-weight: 600;">📌 ข้อมูลสำคัญ / Important Notes:</p>
          <ul style="margin: 0; padding-left: 20px; color: #78350f; font-size: 14px; line-height: 1.8;">
            <li>กรุณาแจ้งชื่อ นามสกุล พร้อมแสดงหน้าสมาชิก One Bangkok เพื่อร่วมกิจกรรมที่หน้างาน</li>
            <li>Please provide your full name and present One Bangkok Membership ID to check in at the event.</li>
            <li>ผู้เข้าร่วมจะต้องมาถึงก่อนเวลา 15 นาที หากมาสายจะถือว่าสละสิทธิ์</li>
            <li>Participant must arrive at least 15 minutes in advance; late arrivals will forfeit their slot.</li>
          </ul>
        </div>

        <div style="text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px;">
          <p>One Bangkok Park | The Whimsical Water Park</p>
          <p>วันที่ 10 - 15 เม.ย. 2569 | 10 - 15 Apr 2026</p>
        </div>
      </div>
    </div>
  `;

  try {
    await getResend().emails.send({
      from: process.env.EMAIL_FROM || "Waterpark <noreply@resend.dev>",
      to: [data.email],
      subject:
        "✅ ยืนยันการลงทะเบียน The Whimsical Water Park / Registration Confirmed",
      html: htmlContent,
    });
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}

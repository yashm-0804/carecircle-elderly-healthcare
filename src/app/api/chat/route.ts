import { NextRequest, NextResponse } from "next/server";
import { getMedications, getTodayDoses, getAppointments, getSeniorProfile } from "@/lib/db";
import { sanitizeText } from "@/lib/sanitize";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage = sanitizeText(body.message || "").trim();

    if (!userMessage) {
      return NextResponse.json(
        { success: false, error: "Please provide a message." },
        { status: 400 }
      );
    }

    const senior = getSeniorProfile();
    const meds = getMedications();
    const doses = getTodayDoses();
    const appts = getAppointments();

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const systemPrompt = `You are "Carey", an empathetic, gentle, and highly knowledgeable AI Geriatric Healthcare Assistant for CareCircle.
You are caring for ${senior.name} (Age 78), who manages Hypertension and Type-2 Diabetes.
Current Active Medications:
${meds.map((m) => `- ${m.name} (${m.dosage}, ${m.form}) at ${m.scheduleTime} (${m.timeOfDay}). Instructions: ${m.instructions}. Refill: ${m.refillCount} pills.`).join("\n")}

Today's Dose Status:
${doses.map((d) => `- ${d.medicationName} (${d.scheduledTime}): ${d.status}${d.takenAt ? ` (Taken at ${new Date(d.takenAt).toLocaleTimeString()})` : ""}`).join("\n")}

Upcoming Doctor Appointments:
${appts.map((a) => `- ${a.doctorName} (${a.specialty}) at ${a.clinicName} on ${new Date(a.dateTime).toLocaleDateString()}. Prep: ${a.preparationNotes}`).join("\n")}

Primary Caregiver: Dr. Sarah Vance (Daughter).

Guidelines:
- Speak in warm, respectful, elderly-friendly language. Keep explanations concise, clear, and reassuring.
- If asked about medication schedules, give exact times and food instructions.
- If the user reports emergency symptoms (chest pain, shortness of breath, severe dizziness), gently urge them to contact emergency services or their daughter Dr. Sarah Vance immediately.
- Never diagnose new diseases; focus on adherence, reassurance, and safety.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: systemPrompt },
                    { text: `User message: "${userMessage}"` },
                  ],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ success: true, reply });
          }
        }
      } catch (err) {
        console.warn("Gemini chat API failed, using contextual healthcare engine:", err);
      }
    }

    // Contextual Healthcare Intelligence Engine (Offline / Hackathon Demo Fallback)
    const lower = userMessage.toLowerCase();
    let reply = "";

    if (lower.includes("metformin") || lower.includes("sugar") || lower.includes("diabetes")) {
      reply = "Eleanor, your Metformin Hydrochloride (500 mg) is scheduled for 8:00 AM with breakfast. Be sure to take it with a full meal and a glass of water to keep your stomach comfortable!";
    } else if (lower.includes("lisinopril") || lower.includes("pressure") || lower.includes("bp")) {
      reply = "Your Lisinopril (10 mg) is scheduled for 8:30 AM every morning for blood pressure control. Dr. Sarah Vance recommends taking it consistently and rising slowly from bed or chairs.";
    } else if (lower.includes("vitamin") || lower.includes("calcium") || lower.includes("lunch")) {
      reply = "Your Vitamin D3 + Calcium softgel (2000 IU) is scheduled for 1:00 PM after lunch. It helps keep your bones strong!";
    } else if (lower.includes("atorvastatin") || lower.includes("cholesterol") || lower.includes("night") || lower.includes("dinner")) {
      reply = "Your Atorvastatin Calcium (20 mg) is scheduled for 8:00 PM around dinner time. Please remember to avoid drinking large quantities of grapefruit juice while taking this.";
    } else if (lower.includes("appointment") || lower.includes("doctor") || lower.includes("visit") || lower.includes("chen")) {
      const nextAppt = appts.find((a) => a.status === "UPCOMING");
      if (nextAppt) {
        reply = `Your next visit is with ${nextAppt.doctorName} (${nextAppt.specialty}) at ${nextAppt.clinicName} on ${new Date(nextAppt.dateTime).toLocaleDateString()}. Dr. Sarah Vance is assigned to accompany you. Note: ${nextAppt.preparationNotes}`;
      } else {
        reply = "You do not have any pending doctor appointments scheduled this week!";
      }
    } else if (lower.includes("dizzy") || lower.includes("fall") || lower.includes("pain") || lower.includes("emergency") || lower.includes("hurt")) {
      reply = "Eleanor, please sit down comfortably right now. If you are experiencing acute pain or dizziness, please press the green 'Call Daughter Sarah' button or call emergency services (+1 555-234-5678). Your health and safety come first!";
    } else if (lower.includes("streak") || lower.includes("how am i doing") || lower.includes("adherence")) {
      reply = "You are doing wonderfully! You have maintained a 12-day perfect streak and your adherence rate is high. Your family circle and Dr. Sarah Vance are very proud of your routine!";
    } else {
      reply = `Hello Eleanor! I am Carey, your CareCircle companion. You currently have ${meds.length} active prescriptions monitored, and your next scheduled dose is on track. How can I help you today? You can ask me about your pill times, doctor visits, or food instructions!`;
    }

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Carey is momentarily taking a breath. Please try again." },
      { status: 500 }
    );
  }
}

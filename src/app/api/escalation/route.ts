import { NextRequest, NextResponse } from "next/server";
import { getAlerts, triggerEscalation } from "@/lib/db";
import { EscalationTriggerSchema } from "@/lib/validations";
import { getEmailAuditLog } from "@/lib/email";

export async function GET() {
  const alerts = getAlerts();
  const recentEmails = getEmailAuditLog();
  return NextResponse.json({ success: true, alerts, recentEmails });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = EscalationTriggerSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { doseId, reason } = parseResult.data;
    const alert = await triggerEscalation(doseId, reason);

    if (!alert) {
      return NextResponse.json(
        { success: false, error: "Dose not found to escalate." },
        { status: 404 }
      );
    }

    const recentEmails = getEmailAuditLog();
    return NextResponse.json({
      success: true,
      alert,
      recentEmails,
      message: "Caregiver alert and proactive email dispatched successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to trigger escalation." },
      { status: 500 }
    );
  }
}

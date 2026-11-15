import { NextRequest, NextResponse } from "next/server";
import { EscalationTriggerSchema } from "@/lib/validations";
import { container } from "@/core/infrastructure/container";

export async function GET() {
  const alerts = await container.alertRepo.findAll();
  const recentEmails = await container.notificationService.getAuditLogs();
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
    const alert = await container.triggerEscalationUseCase.execute({ doseId, reason });

    const recentEmails = await container.notificationService.getAuditLogs();
    return NextResponse.json({
      success: true,
      alert,
      recentEmails,
      message: "Caregiver alert and proactive email dispatched successfully via Clean Architecture UseCase.",
    });
  } catch (error: any) {
    if (error.message?.includes("not found")) {
      return NextResponse.json({ success: false, error: error.message }, { status: 404 });
    }
    return NextResponse.json(
      { success: false, error: "Failed to trigger escalation." },
      { status: 500 }
    );
  }
}

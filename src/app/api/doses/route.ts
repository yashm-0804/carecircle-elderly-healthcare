import { NextRequest, NextResponse } from "next/server";
import { DoseActionSchema } from "@/lib/validations";
import { sanitizeText } from "@/lib/sanitize";
import { container } from "@/core/infrastructure/container";

export async function GET() {
  const doses = await container.doseRepo.findTodayDoses();
  const metrics = await container.doseRepo.getMetrics();
  return NextResponse.json({ success: true, doses, metrics });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = DoseActionSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { doseId, action, verifiedVia, notes } = parseResult.data;
    const sanitizedNotes = notes ? sanitizeText(notes) : undefined;

    const result = await container.recordDoseUseCase.execute({
      doseId,
      action,
      verifiedVia,
      notes: sanitizedNotes,
    });

    return NextResponse.json({ success: true, dose: result.dose, metrics: result.metrics });
  } catch (error: any) {
    if (error.message?.includes("not found")) {
      return NextResponse.json({ success: false, error: error.message }, { status: 404 });
    }
    return NextResponse.json(
      { success: false, error: "Failed to record dose action." },
      { status: 500 }
    );
  }
}

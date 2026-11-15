import { NextRequest, NextResponse } from "next/server";
import { getTodayDoses, recordDoseAction, getAdherenceMetrics } from "@/lib/db";
import { DoseActionSchema } from "@/lib/validations";

export async function GET() {
  const doses = getTodayDoses();
  const metrics = getAdherenceMetrics();
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
    const updated = recordDoseAction(doseId, action, verifiedVia, notes);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Dose record not found." },
        { status: 404 }
      );
    }

    const metrics = getAdherenceMetrics();
    return NextResponse.json({ success: true, dose: updated, metrics });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to record dose action." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { MedicationSchema } from "@/lib/validations";
import { sanitizeObject } from "@/lib/sanitize";
import { container } from "@/core/infrastructure/container";

export async function GET() {
  const meds = await container.medicationRepo.findAll();
  return NextResponse.json({ success: true, medications: meds });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = MedicationSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const sanitizedData = sanitizeObject(parseResult.data);
    const created = await container.medicationRepo.save({
      ...sanitizedData,
      id: `med_${Date.now()}`,
      seniorId: "usr_senior_01",
    });

    return NextResponse.json({ success: true, medication: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create medication." },
      { status: 500 }
    );
  }
}

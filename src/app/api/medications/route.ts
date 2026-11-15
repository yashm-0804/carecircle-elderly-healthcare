import { NextRequest, NextResponse } from "next/server";
import { getMedications, addMedication } from "@/lib/db";
import { MedicationSchema } from "@/lib/validations";

export async function GET() {
  const meds = getMedications();
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

    const created = addMedication(parseResult.data);
    return NextResponse.json({ success: true, medication: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create medication." },
      { status: 500 }
    );
  }
}

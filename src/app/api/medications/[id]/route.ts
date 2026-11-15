import { NextRequest, NextResponse } from "next/server";
import { updateMedication, deleteMedication } from "@/lib/db";
import { MedicationSchema } from "@/lib/validations";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const parseResult = MedicationSchema.partial().safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const updated = updateMedication(params.id, parseResult.data);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Medication not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, medication: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update medication." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const success = deleteMedication(params.id);
  if (!success) {
    return NextResponse.json(
      { success: false, error: "Medication not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, message: "Medication removed." });
}

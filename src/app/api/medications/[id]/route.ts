import { NextRequest, NextResponse } from "next/server";
import { MedicationSchema } from "@/lib/validations";
import { sanitizeObject } from "@/lib/sanitize";
import { container } from "@/core/infrastructure/container";

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

    const sanitizedData = sanitizeObject(parseResult.data as Record<string, unknown>);
    const updated = await container.medicationRepo.update(params.id, sanitizedData);
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
  const success = await container.medicationRepo.delete(params.id);
  if (!success) {
    return NextResponse.json(
      { success: false, error: "Medication not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, message: "Medication removed." });
}

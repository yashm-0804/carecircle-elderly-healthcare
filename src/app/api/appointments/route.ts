import { NextRequest, NextResponse } from "next/server";
import { DoctorAppointmentSchema } from "@/lib/validations";
import { container } from "@/core/infrastructure/container";

export async function GET() {
  const appointments = await container.appointmentRepo.findAll();
  return NextResponse.json({ success: true, appointments });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = DoctorAppointmentSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const created = await container.scheduleAppointmentUseCase.execute(parseResult.data);
    return NextResponse.json({ success: true, appointment: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to schedule appointment." },
      { status: 500 }
    );
  }
}

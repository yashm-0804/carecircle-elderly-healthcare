import { NextRequest, NextResponse } from "next/server";
import { analyzePillImage } from "@/lib/gemini";
import { z } from "zod";

const VisionRequestSchema = z.object({
  base64Image: z.string().min(10, "Valid image data required"),
  targetMedicationName: z.string().min(2, "Target medication name is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = VisionRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { base64Image, targetMedicationName } = parseResult.data;
    const analysis = await analyzePillImage(base64Image, targetMedicationName);

    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Pill verification analysis failed." },
      { status: 500 }
    );
  }
}

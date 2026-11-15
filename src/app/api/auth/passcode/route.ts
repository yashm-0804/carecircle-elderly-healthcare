import { NextRequest, NextResponse } from "next/server";
import { PasscodeAuthSchema } from "@/lib/validations";
import { verifyPasscode } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = PasscodeAuthSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { passcode } = parseResult.data;
    const authResult = verifyPasscode(passcode);

    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      profile: authResult.profile,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Authentication service error." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.organisationName || !body.contactName || !body.workEmail || !body.consentToContact) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.workEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // MVP: In production, this would save to a database and send a confirmation email.
    // For the demo, we accept all valid submissions.
    // Simulate a small delay to show the pending state
    await new Promise((resolve) => setTimeout(resolve, 600));

    return NextResponse.json(
      { success: true, message: "Added to waitlist" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

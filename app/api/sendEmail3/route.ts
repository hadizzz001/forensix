// app/api/sendEmail2/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail2 } from '../sendEmail2/sendEmail2'; // adjust path if needed

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const formData = new FormData();
    formData.set("name", data.inputs.name);
    formData.set("email", data.inputs.email); 
    formData.set("phone", data.inputs.phone);
    formData.set("location", data.inputs.location);
    formData.set("subject", data.inputs.subject);
    formData.set("message", data.inputs.message);
    formData.set("occasion", data.inputs.occasion); 
    formData.set("meet", data.inputs.meet); 

    await sendEmail2(formData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

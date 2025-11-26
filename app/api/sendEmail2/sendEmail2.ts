"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail2 = async (formData: FormData) => {
  const email = formData.get("email");
  const name = formData.get("name");
  const phone = formData.get("phone");
  const location = formData.get("location");
  const subject = formData.get("subject");
  const messages = formData.get("message");
  const meet = formData.get("meet");
  const time = formData.get("time");
  const date = formData.get("date");



  const message = `
Hi ${name},

Thank you for booking through Foresix!
We truly appreciate your trust and we’re looking forward to meeting with you.

*Meeting details:* 
Time: ${time}
Date: ${date}
Meet link: ${meet}
Please make sure to join the meeting on time using the link above. If you need to reschedule or have any questions, feel free to contact us anytime.

Once again, thank you for choosing Foresix.
Looking forward to our meeting!

Best regards,
Forensix Team
 `;

  await resend.emails.send({
    from: "noreplyemail@popticalsunwear.com",
    to: email + "",
    // to: "alihadimedlej001@gmail.com",
    // to: "info@aquanotch.com",
    subject: "Your Appointment Confirmation – Thank You!",
    text: message,
  });

};

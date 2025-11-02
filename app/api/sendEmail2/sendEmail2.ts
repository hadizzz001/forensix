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
  const occasion = formData.get("occasion"); 

 

  const message = `
*Customer Information:*
Email: ${email}
Name: ${name} 
Phone: ${phone}
Location: ${location}
Subject: ${subject}
Occasion: ${occasion}
Message: ${messages}
 `;

  await resend.emails.send({
    from: "info@anazon.hadizproductions.com",
    // to: "alihadimedlej001@gmail.com",
    to: "info@aquanotch.com",
    subject: "New Booking from Website",
    text: message,
  });

};

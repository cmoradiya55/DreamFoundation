import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, company, email, phone, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "", 
      port: 587,
      secure: false,
      auth: {
        user: process.env.AWS_SES_USER, 
        pass: process.env.AWS_SES_PASS,
      },
    });

    const emailContent = `
      📩 New Contact Request

      Name: ${name}
      Company: ${company || "N/A"}
      Email: ${email}
      Phone: ${phone || "N/A"}

      Message:
      ${message}
    `;
 console.log("Sending mail...");
    const mailOptions = {
      from: "", 
      to: "",
      replyTo: email,
      subject: `New Contact Request from ${name}`,
      text: emailContent,
    };

    const result = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, messageId: result.messageId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
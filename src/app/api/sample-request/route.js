import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { 
    name, 
    businessName, 
    email, 
    mobile, 
    website, 
    address, 
    message, 
    selectedProducts 
  } = body;

  if (!name || !email || !businessName || !mobile || !address || !selectedProducts) {
    return NextResponse.json(
      { error: "Required fields are missing." },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "", // Replace with your SMTP host
      port: 587,
      secure: false,
      auth: {
        user: process.env.AWS_SES_USER, 
        pass: process.env.AWS_SES_PASS,
      },
    });

    // Format product list
    const productsList = selectedProducts.map(product => `- ${product}`).join('\n');

    const emailContent = `
      📦 New Sample Request

      Name: ${name}
      Business Name: ${businessName}
      Email: ${email}
      Mobile: ${mobile}
      Website: ${website || "N/A"}
      Address: ${address}

      Selected Products:
      ${productsList}

      Additional Information:
      ${message || "N/A"}
    `;
 
    const mailOptions = {
      from: "", // Replace with sender email
      to: "", // Replace with recipient email
      replyTo: email,
      subject: `Sample Request from ${businessName}`,
      text: emailContent,
    };

    await transporter.sendMail(mailOptions);
    
    return NextResponse.json(
      { success: true, message: "Sample request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

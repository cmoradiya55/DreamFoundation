// import nodemailer from "nodemailer";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//     // Enhanced logging
//     let body;
//     try {
//         body = await req.json();
//     } catch (err) {
//         return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
//     }

//     let emailContent;

//     if (body.formType === 'contactUS') {
//         const { name, businessName, email, mobile, message } = body;
//         if (!name || !email || !message) {
//             return NextResponse.json(
//                 { error: "Name, email, and message are required." },
//                 { status: 400 }
//             );
//         }

//         emailContent = `
//             📩 New Contact Request

//             Name: ${name}
//             Business Name: ${businessName || "-"}
//             Email: ${email}
//             Mobile: ${mobile || "-"}

//             Message:
//             ${message}
//         `;

//     } else if (body.formType === 'admissionRegistration') {
//         const {
//             fullName,
//             email,
//             phone,
//             dateOfBirth,
//             address,
//             course,
//             previousEducation,
//             emergencyContact,
//             emergencyPhone,
//             additionalInfo
//         } = body;

//         if (!fullName || !email || !phone || !dateOfBirth || !address || !course || !emergencyContact || !emergencyPhone) {
//             return NextResponse.json(
//                 { error: "Please fill in all required fields." },
//                 { status: 400 }
//             );
//         }

//         emailContent = `
//             🎓 New Admission Registration

//             Student Information:
//             Name: ${fullName}
//             Email: ${email}
//             Phone: ${phone}
//             Date of Birth: ${dateOfBirth}
//             Address: ${address}

//             Course Details:
//             Course of Interest: ${course}
//             Previous Education: ${previousEducation || "Not specified"}

//             Emergency Contact:
//             Name: ${emergencyContact}
//             Phone: ${emergencyPhone}

//             Additional Information:
//             ${additionalInfo || "None provided"}

//             Registration submitted on: ${new Date().toLocaleString()}
//         `;

//     } else if (body.formType === 'sampleRequest') {
//         const {
//             name,
//             businessName,
//             email,
//             mobile,
//             website,
//             address,
//             message,
//             selectedProducts
//         } = body;

//         if (!selectedProducts || !Array.isArray(selectedProducts) || selectedProducts.length === 0) {
//             return NextResponse.json(
//                 { error: "Please select at least one product." },
//                 { status: 400 }
//             );
//         }
//         const productsList = selectedProducts.map(product => `- ${product}`).join('\n');

//         emailContent = `
//             📦 New Sample Request

//             Name: ${name}
//             Business Name: ${businessName}
//             Email: ${email}
//             Mobile: ${mobile}
//             Website: ${website || "-"}
//             Address: ${address}

//             Selected Products:
//             ${productsList}

//             Additional Information:
//             ${message || ""}
//         `;
//     }


//     try {
//         // Check if email password is configured
//         if (!process.env.EMAIL_PASSWORD) {
//             console.error("EMAIL_PASSWORD environment variable is not set");
//             return NextResponse.json(
//                 { error: "Email configuration missing" },
//                 { status: 500 }
//             );
//         }

//         const transporter = nodemailer.createTransport({
//             service: "Gmail",
//             auth: {
//                 user: process.env.SEND_EMAIL,
//                 pass: process.env.EMAIL_PASSWORD,
//             },
//         });

//         const mailOptions = {
//             from: process.env.SEND_EMAIL, 
//             to: "mvinfinus@gmail.com", 
//             replyTo: body.email,
//             subject: body.formType === 'contactUS' ?  `Contact Request from ${body.name}` : 
//                      body.formType === 'admissionRegistration' ? `New Admission Registration - ${body.fullName}` :
//                      `Sample Request from ${body.businessName}`,
//             text: emailContent,
//         };

//         // Send email to admin
//         await transporter.sendMail(mailOptions);

//         // Send confirmation email to applicant (for admission registration only)
//         if (body.formType === 'admissionRegistration') {
//             const confirmationEmail = {
//                 from: process.env.SEND_EMAIL,
//                 to: body.email,
//                 subject: "Registration Confirmation - Dream Foundation",
//                 text: `
// Dear ${body.fullName},

// Thank you for your interest in Dream Foundation!

// We have successfully received your admission registration for the "${body.course}" program.

// Registration Details:
// - Name: ${body.fullName}
// - Email: ${body.email}
// - Phone: ${body.phone}
// - Course: ${body.course}
// - Registration Date: ${new Date().toLocaleDateString()}

// What happens next?
// 1. Our admissions team will review your application
// 2. We will contact you within 3-5 business days
// 3. If selected, we will schedule an interview/orientation session

// Important Information:
// - Please keep this email for your records
// - If you have any questions, reply to this email or call us
// - Make sure to check your email regularly for updates

// We appreciate your interest in joining our educational community and look forward to potentially welcoming you to Dream Foundation.

// Best regards,
// Dream Foundation Admissions Team

// Contact Information:
// Email: ${process.env.SEND_EMAIL}
// Website: www.dreamfoundation.org

// ---
// This is an automated confirmation email. Please do not reply directly to this message.
//                 `
//             };

//             await transporter.sendMail(confirmationEmail);
//         }

//         const successMessage = body.formType === 'admissionRegistration' 
//             ? "Registration submitted successfully! Check your email for confirmation." 
//             : body.formType === 'contactUS' 
//             ? "Contact request submitted successfully"
//             : "Sample request submitted successfully";

//         return NextResponse.json(
//             { success: true, message: successMessage },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error("Error sending email:", error);

//         return NextResponse.json(
//             { error: "Failed to send email" },
//             { status: 500 }
            
//         );
//     }
// }


import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import puppeteer from "puppeteer";

// Ensure this route runs on the Node.js runtime (required for nodemailer)
export const runtime = 'nodejs';

export async function POST(req) {
    // Enhanced logging
    let body;
    try {
        body = await req.json();
    } catch (err) {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    console.log("body", body);
    
    let emailContent;
    let htmlEmailContent;
    // holds generated PDF buffer when formType === 'eventRegistration'
    let pdfBuffer;

    // Dream Foundation details
    const foundationInfo = {
        name: "Dream Foundation",
        address: "TinyYatra, Panchayat Chowk",
        phone: "+91 6356179699",
        tagline: "A FOUNDATION FOR EVERY DREAM"
    };

    if (body.formType === 'admissionRegistration') {
        const {
            fullName,
            email,
            phone,
            dateOfBirth,
            address,
            course,
            previousEducation,
            emergencyContact,
            emergencyPhone,
            additionalInfo
        } = body;

        if (!fullName || !email || !phone || !dateOfBirth || !address || !course || !emergencyContact || !emergencyPhone) {
            return NextResponse.json(
                { error: "Please fill in all required fields." },
                { status: 400 }
            );
        }

        emailContent = `
            🎓 New Admission Registration - Dream Foundation

            STUDENT INFORMATION:
            • Full Name: ${fullName}
            • Email: ${email}
            • Phone: ${phone}
            • Date of Birth: ${dateOfBirth}
            • Address: ${address}

            COURSE DETAILS:
            • Course of Interest: ${course}
            • Previous Education: ${previousEducation || "Not specified"}

            EMERGENCY CONTACT:
            • Name: ${emergencyContact}
            • Phone: ${emergencyPhone}

            ADDITIONAL INFORMATION:
            ${additionalInfo || "None provided"}

            Registration submitted on: ${new Date().toLocaleString()}

            ---
            ${foundationInfo.tagline}
            ${foundationInfo.name}
            ${foundationInfo.address}
            ${foundationInfo.phone}
        `;

        htmlEmailContent = `
            <!DOCTYPE html>
            <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 20px; text-align: center; }
                        .content { padding: 20px; }
                        .info-section { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #28a745; }
                        .footer { background: #343a40; color: white; padding: 15px; text-align: center; font-size: 12px; }
                        .field { margin: 8px 0; }
                        .label { font-weight: bold; color: #495057; }
                        .section-title { color: #28a745; margin-bottom: 10px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>🎓 New Admission Registration</h1>
                        <h2>${foundationInfo.tagline}</h2>
                    </div>
                    
                    <div class="content">
                        <div class="info-section">
                            <h3 class="section-title">Student Information</h3>
                            <div class="field"><span class="label">Full Name:</span> ${fullName}</div>
                            <div class="field"><span class="label">Email:</span> ${email}</div>
                            <div class="field"><span class="label">Phone:</span> ${phone}</div>
                            <div class="field"><span class="label">Date of Birth:</span> ${dateOfBirth}</div>
                            <div class="field"><span class="label">Address:</span> ${address}</div>
                        </div>
                        
                        <div class="info-section">
                            <h3 class="section-title">Course Details</h3>
                            <div class="field"><span class="label">Course of Interest:</span> ${course}</div>
                            <div class="field"><span class="label">Previous Education:</span> ${previousEducation || "Not specified"}</div>
                        </div>
                        
                        <div class="info-section">
                            <h3 class="section-title">Emergency Contact</h3>
                            <div class="field"><span class="label">Name:</span> ${emergencyContact}</div>
                            <div class="field"><span class="label">Phone:</span> ${emergencyPhone}</div>
                        </div>
                        
                        <div class="info-section">
                            <h3 class="section-title">Additional Information</h3>
                            <p>${additionalInfo ? additionalInfo.replace(/\n/g, '<br>') : "None provided"}</p>
                        </div>
                        
                        <div style="background: #e7f3ff; padding: 10px; border-radius: 5px; margin-top: 20px;">
                            <strong>Registration submitted on:</strong> ${new Date().toLocaleString()}
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p><strong>${foundationInfo.name}</strong></p>
                        <p>${foundationInfo.address} | ${foundationInfo.phone}</p>
                        <p>${foundationInfo.tagline}</p>
                    </div>
                </body>
            </html>
        `;

    } else if (body.formType === 'eventRegistration') {
        const {
            registrationId,
            fullName,
            email,
            mobile,
            address,
            aadharNumber,
            children = [],
            formattedData,
            letterheadPath = '/images/letterPed.jpeg'
        } = body;

        if (!fullName || !email || !mobile) {
            return NextResponse.json(
                { error: "Full name, email and mobile are required" },
                { status: 400 }
            );
        }

        const childrenListText = children.length
            ? children.map((c, i) => `• Child ${i + 1}: ${c.childName || '-'} | Father: ${c.fatherName || '-'} | Mother: ${c.motherName || '-'} | Std: ${c.educationStandard || '-'}`).join("\n")
            : 'No children added';

        emailContent = `
            📅 New Event Registration - Dream Foundation

            REGISTRATION INFO
            • Registration ID: ${registrationId || '-'}
            • Name: ${fullName}
            • Email: ${email}
            • Mobile: ${mobile}
            • Aadhar: ${aadharNumber || '-'}
            • Address: ${address}

            CHILDREN
            ${childrenListText}

            Submitted on: ${new Date().toLocaleString()}

            ---
            ${foundationInfo.tagline}
            ${foundationInfo.name}
            ${foundationInfo.address}
            ${foundationInfo.phone}
        `;

        const childrenRows = children.length
            ? children.map((c, i) => `
                <tr>
                    <td style="padding:6px;border:1px solid #e5e7eb;">${i + 1}</td>
                    <td style="padding:6px;border:1px solid #e5e7eb;">${c.childName || '-'}</td>
                    <td style="padding:6px;border:1px solid #e5e7eb;">${c.fatherName || '-'}</td>
                    <td style="padding:6px;border:1px solid #e5e7eb;">${c.motherName || '-'}</td>
                    <td style="padding:6px;border:1px solid #e5e7eb;">${c.educationStandard || '-'}</td>
                </tr>
            `).join('')
            : '<tr><td colspan="5" style="padding:8px;border:1px solid #e5e7eb;text-align:center;color:#6b7280;">No children added</td></tr>';

        htmlEmailContent = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8" />
                    <style>
                        body{font-family:Arial,sans-serif;color:#111827;}
                        .header{background:linear-gradient(135deg,#2563eb,#7c3aed);color:#fff;padding:20px;text-align:center}
                        .section{padding:16px;background:#ffffff;margin:12px;border:1px solid #e5e7eb;border-radius:8px}
                        .muted{color:#6b7280}
                        table{border-collapse:collapse;width:100%;margin-top:8px}
                </style>
                </head>
                <body>
                    <div class="header">
                    <h1>📅 Event Registration</h1>
                    <h3>${foundationInfo.tagline}</h3>
                    </div>
                    <div class="section">
                    <h3>Registration Info</h3>
                    <p><strong>Registration ID:</strong> ${registrationId || '-'}</p>
                    <p><strong>Name:</strong> ${fullName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mobile:</strong> ${mobile}</p>
                    <p><strong>Aadhar:</strong> ${aadharNumber || '-'}</p>
                    <p><strong>Address:</strong> ${address}</p>
                    </div>
                    <div class="section">
                    <h3>Children</h3>
                    <table>
                        <thead>
                        <tr>
                            <th style="text-align:left;padding:6px;border:1px solid #e5e7eb;">#</th>
                            <th style="text-align:left;padding:6px;border:1px solid #e5e7eb;">Name</th>
                            <th style="text-align:left;padding:6px;border:1px solid #e5e7eb;">Father</th>
                            <th style="text-align:left;padding:6px;border:1px solid #e5e7eb;">Mother</th>
                            <th style="text-align:left;padding:6px;border:1px solid #e5e7eb;">Std</th>
                        </tr>
                        </thead>
                        <tbody>${childrenRows}</tbody>
                    </table>
                    <p class="muted">Submitted on ${new Date().toLocaleString()}</p>
                    </div>
                    <div class="section muted" style="text-align:center">
                    <div><strong>${foundationInfo.name}</strong></div>
                    <div>${foundationInfo.address} | ${foundationInfo.phone}</div>
                    <div>${foundationInfo.tagline}</div>
                    </div>
                </body>
            </html>
        `;

        // Build a letterhead-like HTML that we will render to PDF using Puppeteer
        const resolvedLetterheadPath = path.join(process.cwd(), 'public', letterheadPath.replace(/^\//, ''));
        let letterheadBase64 = '';
        try {
            const imgBuf = fs.readFileSync(resolvedLetterheadPath);
            const ext = path.extname(resolvedLetterheadPath).toLowerCase().replace('.', '') || 'jpeg';
            letterheadBase64 = `data:image/${ext};base64,${imgBuf.toString('base64')}`;
        } catch (e) {
            // If letterhead file is missing, continue without background
            letterheadBase64 = '';
        }

        const pdfHtml = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset='utf-8'>
                    <style>
                        body{font-family:Arial,sans-serif}
                         .sheet{position:relative;width:794px;height:1123px;background:#fff;}
                         .bg{position:absolute;inset:0;${letterheadBase64 ? `background:url('${letterheadBase64}') no-repeat center/cover;opacity:0.25;` : ''}}
                        .content{position:absolute;left:60px;right:60px;top:160px;color:#111827}
                        .row{margin:8px 0}
                        table{border-collapse:collapse;width:100%;margin-top:12px}
                        td,th{border:1px solid #e5e7eb;padding:6px;text-align:left}
                    </style>
                </head>
                <body>
                    <div class='sheet'>
                        <div class='bg'></div>
                        <div class='content'>
                        <h2>Event Registration Acknowledgement</h2>
                        <div class='row'><strong>Registration ID:</strong> ${registrationId || '-'}</div>
                        <div class='row'><strong>Name:</strong> ${fullName}</div>
                        <div class='row'><strong>Email:</strong> ${email}</div>
                        <div class='row'><strong>Mobile:</strong> ${mobile}</div>
                        <div class='row'><strong>Aadhar:</strong> ${aadharNumber || '-'}</div>
                        <div class='row'><strong>Address:</strong> ${address}</div>
                        <div class='row'><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
                        <h3 style='margin-top:16px'>Children</h3>
                        <table>
                            <thead><tr><th>#</th><th>Name</th><th>Father</th><th>Mother</th><th>Std</th></tr></thead>
                            <tbody>${childrenRows}</tbody>
                        </table>
                        <div style='margin-top:28px;text-align:right'>
                            <em>Authorised Signatory</em>
                        </div>
                        </div>
                    </div>
                </body>
            </html>`;
        
        // Render the HTML to PDF buffer using Puppeteer (disabled for now)
        // try {
        //     const browser = await puppeteer.launch({
        //         args: ["--no-sandbox", "--disable-setuid-sandbox"],
        //         headless: true
        //     });
        //     const page = await browser.newPage();
        //     await page.setContent(pdfHtml, { waitUntil: 'networkidle0' });
        //     pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
        //     await browser.close();
        // } catch (err) {
        //     console.error('PDF generation failed:', err);
        // }

    } 

    try {
        // Check if email password is configured
        if (!process.env.EMAIL_PASSWORD) {
            console.error("EMAIL_PASSWORD environment variable is not set");
            return NextResponse.json(
                { error: "Email configuration missing" },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.SEND_EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Resolve absolute path to the letterhead image in public/
        const mailOptions = {
            from: process.env.SEND_EMAIL, 
            to: "mvinfinus@gmail.com", 
            replyTo: body.email,
            subject: body.formType === 'contactUS' ?  `Contact Request from ${body.name} - Dream Foundation` : 
                     body.formType === 'admissionRegistration' ? `New Admission Registration - ${body.fullName} - Dream Foundation` :
                     body.formType === 'eventRegistration' ? `New Event Registration - ${body.fullName} - Dream Foundation` :
                     `Sample Request from ${body.businessName} - Dream Foundation`,
            text: emailContent,
            html: htmlEmailContent,
            // attachments disabled for now
            // attachments: body.formType === 'eventRegistration' && pdfBuffer ? [
            //     { filename: `EventRegistration_${Date.now()}.pdf`, content: pdfBuffer }
            // ] : undefined,
        };

        // Send email to admin
        await transporter.sendMail(mailOptions);

        // Send confirmation email to applicant (for admission or event registration)
        if (body.formType === 'admissionRegistration' || body.formType === 'eventRegistration') {
            const confirmationEmail = {
                from: process.env.SEND_EMAIL,
                to: body.email,
                subject: body.formType === 'eventRegistration' ? "Event Registration Confirmation - Dream Foundation" : "Registration Confirmation - Dream Foundation",
                html: body.formType === 'eventRegistration' ? htmlEmailContent : `
                    <!DOCTYPE html>
                    <html>
                     
                    </html>
                `,
                // attachments disabled for now
                // attachments: body.formType === 'eventRegistration' && pdfBuffer ? [
                //     { filename: `EventRegistration_${Date.now()}.pdf`, content: pdfBuffer }
                // ] : undefined
            };

            await transporter.sendMail(confirmationEmail);
        }

        const successMessage = body.formType === 'admissionRegistration' 
            ? "Registration submitted successfully! Check your email for confirmation." 
            : body.formType === 'contactUS' 
            ? "Contact request submitted successfully"
            : "Sample request submitted successfully";

        return NextResponse.json(
            { success: true, message: successMessage },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        const message = typeof error?.message === 'string' ? error.message : 'Failed to send email';
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}
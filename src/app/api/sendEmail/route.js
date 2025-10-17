import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

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
    // holds generated PDF buffer when formType === 'eventRegistration' (disabled for now)
    // let pdfBuffer;

    // Dream Foundation details
    const foundationInfo = {
        name: "Dream Foundation",
        address: "TinyYatra, Panchayat Chowk",
        phone: "+91 6356179699",
        tagline: "A FOUNDATION FOR EVERY DREAM"
    };

    if (body.formType === 'admissionRegistration') {
        const {
            registrationId,
            fullName,
            email,
            mobile,
            dateOfBirth,
            address,
            aadharNumber,
            children = []
        } = body;

        if (!fullName || !email || !mobile || !dateOfBirth || !address || !aadharNumber) {
            return NextResponse.json(
                { error: "Please fill in all required fields." },
                { status: 400 }
            );
        }

        const childrenListText = children.length
            ? children.map((c, i) => `• Child ${i + 1}: ${c.childName || '-'} | DOB: ${c.childDateOfBirth || '-'} | Father: ${c.fatherName || '-'} | Mother: ${c.motherName || '-'} | Std: ${c.educationStandard || '-'}`).join("\n")
            : 'No children added';

        emailContent = `
            🎓 New Admission Registration - Dream Foundation

            REGISTRATION INFO:
            • Registration ID: ${registrationId || '-'}
            • Full Name: ${fullName}
            • Email: ${email}
            • Mobile: ${mobile}
            • Date of Birth: ${dateOfBirth}
            • Aadhar: ${aadharNumber}
            • Address: ${address}

            CHILDREN INFORMATION:
            ${childrenListText}

            Registration submitted on: ${new Date().toLocaleString()}

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
                    <td style="padding:6px;border:1px solid #e5e7eb;">${c.childDateOfBirth || '-'}</td>
                    <td style="padding:6px;border:1px solid #e5e7eb;">${c.fatherName || '-'}</td>
                    <td style="padding:6px;border:1px solid #e5e7eb;">${c.motherName || '-'}</td>
                    <td style="padding:6px;border:1px solid #e5e7eb;">${c.educationStandard || '-'}</td>
                </tr>
            `).join('')
            : '<tr><td colspan="6" style="padding:8px;border:1px solid #e5e7eb;text-align:center;color:#6b7280;">No children added</td></tr>';

        htmlEmailContent = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8" />
                    <style>
                        body{font-family:Arial,sans-serif;color:#111827;}
                        .header{background:linear-gradient(135deg,#28a745,#20c997);color:#fff;padding:20px;text-align:center}
                        .section{padding:16px;background:#ffffff;margin:12px;border:1px solid #e5e7eb;border-radius:8px}
                        .muted{color:#6b7280}
                        table{border-collapse:collapse;width:100%;margin-top:8px}
                    </style>
                </head>
                <body>
                    <div class="header">
                    <h1>🎓 Admission Registration</h1>
                    <h3>${foundationInfo.tagline}</h3>
                    </div>
                    <div class="section">
                    <h3>Admission Registration Info</h3>
                    <p><strong>Registration ID:</strong> ${registrationId || '-'}</p>
                    <p><strong>Full Name:</strong> ${fullName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mobile:</strong> ${mobile}</p>
                    <p><strong>Date of Birth:</strong> ${dateOfBirth}</p>
                    <p><strong>Aadhar:</strong> ${aadharNumber}</p>
                    <p><strong>Address:</strong> ${address}</p>
                    </div>
                    <div class="section">
                    <h3>Children</h3>
                    <table>
                        <thead>
                        <tr>
                            <th style="text-align:left;padding:6px;border:1px solid #e5e7eb;">#</th>
                            <th style="text-align:left;padding:6px;border:1px solid #e5e7eb;">Name</th>
                            <th style="text-align:left;padding:6px;border:1px solid #e5e7eb;">DOB</th>
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

    } else if (body.formType === 'eventRegistration') {
        const {
            registrationId,
            fullName,
            dateOfBirth,
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
            ? children.map((c, i) => `• Child ${i + 1}: ${c.childName || '-'} | DOB: ${c.childDateOfBirth || '-'} | Father: ${c.fatherName || '-'} | Mother: ${c.motherName || '-'} | Std: ${c.educationStandard || '-'}`).join("\n")
            : 'No children added';

        emailContent = `
            📅 New Event Registration - Dream Foundation

            REGISTRATION INFO
            • Registration ID: ${registrationId || '-'}
            • Name: ${fullName}
            • Email: ${email}
            • Mobile: ${mobile}
            • DOB: ${dateOfBirth || '-'}
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
                    <td style="padding:6px;border:1px solid #e5e7eb;">${c.childDateOfBirth || '-'}</td>
                    <td style="padding:6px;border:1px solid #e5e7eb;">${c.fatherName || '-'}</td>
                    <td style="padding:6px;border:1px solid #e5e7eb;">${c.motherName || '-'}</td>
                    <td style="padding:6px;border:1px solid #e5e7eb;">${c.educationStandard || '-'}</td>
                </tr>
            `).join('')
            : '<tr><td colspan="6" style="padding:8px;border:1px solid #e5e7eb;text-align:center;color:#6b7280;">No children added</td></tr>';

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
                    <h3>Event Registration Info</h3>
                    <p><strong>Registration ID:</strong> ${registrationId || '-'}</p>
                    <p><strong>Name:</strong> ${fullName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mobile:</strong> ${mobile}</p>
                    <p><strong>DOB:</strong> ${dateOfBirth || '-'}</p>
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
                            <th style="text-align:left;padding:6px;border:1px solid #e5e7eb;">DOB</th>
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
       
        // Build a letterhead-like HTML that we will render to PDF using Puppeteer (disabled for now)
        // const resolvedLetterheadPath = path.join(process.cwd(), 'public', letterheadPath.replace(/^\//, ''));
        // let letterheadBase64 = '';
        // try {
        //     const imgBuf = fs.readFileSync(resolvedLetterheadPath);
        //     const ext = path.extname(resolvedLetterheadPath).toLowerCase().replace('.', '') || 'jpeg';
        //     letterheadBase64 = `data:image/${ext};base64,${imgBuf.toString('base64')}`;
        // } catch (e) {
        //     // If letterhead file is missing, continue without background
        //     letterheadBase64 = '';
        // }

        // const pdfHtml = '';
        
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

        // Store registration data in admin system
        if (body.formType === 'admissionRegistration' || body.formType === 'eventRegistration') {
            try {
                await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/registrations`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        type: body.formType === 'admissionRegistration' ? 'admission' : 'event',
                        fullName: body.fullName,
                        email: body.email,
                        mobile: body.mobile,
                        address: body.address,
                        aadharNumber: body.aadharNumber,
                        children: body.children || [],
                        registrationId: body.registrationId
                    }),
                });
            } catch (error) {
                console.error('Error storing registration data:', error);
            }
        }

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
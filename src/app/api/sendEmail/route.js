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

export async function POST(req) {
    // Enhanced logging
    let body;
    try {
        body = await req.json();
    } catch (err) {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    let emailContent;
    let htmlEmailContent;

    // Dream Foundation details
    const foundationInfo = {
        name: "Dream Foundation",
        address: "TinyYatra, Panchayat Chowk",
        phone: "+91 6356179699",
        tagline: "A FOUNDATION FOR EVERY DREAM"
    };

    if (body.formType === 'contactUS') {
        const { name, businessName, email, mobile, message } = body;
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        emailContent = `
📩 New Contact Request - Dream Foundation

Contact Information:
• Name: ${name}
• Business Name: ${businessName || "-"}
• Email: ${email}
• Mobile: ${mobile || "-"}

Message:
${message}

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
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .info-section { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .footer { background: #343a40; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .field { margin: 8px 0; }
        .label { font-weight: bold; color: #495057; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📩 New Contact Request</h1>
        <h2>${foundationInfo.tagline}</h2>
    </div>
    
    <div class="content">
        <div class="info-section">
            <h3>Contact Information</h3>
            <div class="field"><span class="label">Name:</span> ${name}</div>
            <div class="field"><span class="label">Business Name:</span> ${businessName || "-"}</div>
            <div class="field"><span class="label">Email:</span> ${email}</div>
            <div class="field"><span class="label">Mobile:</span> ${mobile || "-"}</div>
        </div>
        
        <div class="info-section">
            <h3>Message</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
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

    } else if (body.formType === 'admissionRegistration') {
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

    } else if (body.formType === 'sampleRequest') {
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

        if (!selectedProducts || !Array.isArray(selectedProducts) || selectedProducts.length === 0) {
            return NextResponse.json(
                { error: "Please select at least one product." },
                { status: 400 }
            );
        }
        const productsList = selectedProducts.map(product => `• ${product}`).join('\n');

        emailContent = `
📦 New Sample Request - Dream Foundation

CONTACT INFORMATION:
• Name: ${name}
• Business Name: ${businessName}
• Email: ${email}
• Mobile: ${mobile}
• Website: ${website || "-"}
• Address: ${address}

SELECTED PRODUCTS:
${productsList}

ADDITIONAL INFORMATION:
${message || "None provided"}

Request submitted on: ${new Date().toLocaleString()}

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
        .header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .info-section { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #ff6b6b; }
        .footer { background: #343a40; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .field { margin: 8px 0; }
        .label { font-weight: bold; color: #495057; }
        .product-list { background: white; padding: 10px; border-radius: 5px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📦 New Sample Request</h1>
        <h2>${foundationInfo.tagline}</h2>
    </div>
    
    <div class="content">
        <div class="info-section">
            <h3>Contact Information</h3>
            <div class="field"><span class="label">Name:</span> ${name}</div>
            <div class="field"><span class="label">Business Name:</span> ${businessName}</div>
            <div class="field"><span class="label">Email:</span> ${email}</div>
            <div class="field"><span class="label">Mobile:</span> ${mobile}</div>
            <div class="field"><span class="label">Website:</span> ${website || "-"}</div>
            <div class="field"><span class="label">Address:</span> ${address}</div>
        </div>
        
        <div class="info-section">
            <h3>Selected Products</h3>
            <div class="product-list">
                ${selectedProducts.map(product => `<div>• ${product}</div>`).join('')}
            </div>
        </div>
        
        <div class="info-section">
            <h3>Additional Information</h3>
            <p>${message ? message.replace(/\n/g, '<br>') : "None provided"}</p>
        </div>
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin-top: 20px;">
            <strong>Request submitted on:</strong> ${new Date().toLocaleString()}
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

        const mailOptions = {
            from: process.env.SEND_EMAIL, 
            to: "mvinfinus@gmail.com", 
            replyTo: body.email,
            subject: body.formType === 'contactUS' ?  `Contact Request from ${body.name} - Dream Foundation` : 
                     body.formType === 'admissionRegistration' ? `New Admission Registration - ${body.fullName} - Dream Foundation` :
                     `Sample Request from ${body.businessName} - Dream Foundation`,
            text: emailContent,
            html: htmlEmailContent,
        };

        // Send email to admin
        await transporter.sendMail(mailOptions);

        // Send confirmation email to applicant (for admission registration only)
        if (body.formType === 'admissionRegistration') {
            const confirmationEmail = {
                from: process.env.SEND_EMAIL,
                to: body.email,
                subject: "Registration Confirmation - Dream Foundation",
                html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: white; }
        .info-box { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
        .footer { background: #343a40; color: white; padding: 20px; text-align: center; font-size: 12px; }
        .steps { margin: 20px 0; }
        .step { margin: 10px 0; padding: 10px; background: #e7f3ff; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎓 Dream Foundation</h1>
        <h2>${foundationInfo.tagline}</h2>
    </div>
    
    <div class="content">
        <h2>Dear ${body.fullName},</h2>
        
        <p>Thank you for your interest in <strong>Dream Foundation</strong>!</p>
        
        <p>We have successfully received your admission registration for the <strong>"${body.course}"</strong> program.</p>
        
        <div class="info-box">
            <h3>📋 Registration Details</h3>
            <p><strong>Name:</strong> ${body.fullName}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Phone:</strong> ${body.phone}</p>
            <p><strong>Course:</strong> ${body.course}</p>
            <p><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="steps">
            <h3>📝 What happens next?</h3>
            <div class="step">1. Our admissions team will review your application</div>
            <div class="step">2. We will contact you within 3-5 business days</div>
            <div class="step">3. If selected, we will schedule an interview/orientation session</div>
        </div>
        
        <div class="info-box">
            <h3>💡 Important Information</h3>
            <p>• Please keep this email for your records</p>
            <p>• If you have any questions, reply to this email or call us</p>
            <p>• Make sure to check your email regularly for updates</p>
        </div>
        
        <p>We appreciate your interest in joining our educational community and look forward to potentially welcoming you to Dream Foundation.</p>
        
        <p>Best regards,<br>
        <strong>Dream Foundation Admissions Team</strong></p>
    </div>
    
    <div class="footer">
        <p><strong>Contact Information</strong></p>
        <p>Email: ${process.env.SEND_EMAIL}</p>
        <p>Address: ${foundationInfo.address}</p>
        <p>Phone: ${foundationInfo.phone}</p>
        <p>Website: www.dreamfoundation.org</p>
        <br>
        <p><em>This is an automated confirmation email. Please do not reply directly to this message.</em></p>
    </div>
</body>
</html>
                `
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

        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
            
        );
    }
}
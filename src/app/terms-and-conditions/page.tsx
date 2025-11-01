import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-teal-600 to-emerald-600 mb-8"></div>

        <div className="space-y-6 text-gray-700">
          <section className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Entity Information</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>Entity Name:</strong> Dream Foundation (Owned by Grow Like Gujarati)</li>
              <li><strong>Registered Address:</strong> Panchayat Chowk, University Road, Rajkot – 360005</li>
              <li><strong>Contact Information:</strong> +91 63561 79699 | tinyyatra99@gmail.com</li>
              <li><strong>Website:</strong> www.dreamfoundation.in</li>
            </ul>
          </section>

          <section>
            <p className="mb-6">
              The Platform is owned and operated by <strong>Dream Foundation</strong>, an educational initiative owned by <strong>Grow Like Gujarati</strong>
              (&quot;Platform Owner&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By using our website, services, or making payments, you agree to the following Terms & Conditions.
            </p>

            <ol className="list-decimal list-inside space-y-5 ml-2">
              <li>
                You agree to provide accurate, current, and complete information when registering or using our services.
              </li>
              <li>
                You shall not use the Platform for unlawful or prohibited purposes.
              </li>
              <li>
                Dream Foundation reserves the right to modify these Terms at any time. Continued use of the Platform constitutes acceptance of those changes.
              </li>
              <li>
                <strong>Payments made for any event, workshop, or educational activity through our online payment gateway are final. No refund requests will be entertained.</strong>
              </li>
              <li>
                The Platform and all associated intellectual property are owned by Dream Foundation (a Grow Like Gujarati initiative). Users may not copy, modify, or distribute materials without permission.
              </li>
              <li>
                The Platform may contain third-party links. Dream Foundation is not responsible for their content or policies.
              </li>
              <li>
                Dream Foundation shall not be liable for any indirect, incidental, or consequential damages arising out of the use of its services.
              </li>
              <li>
                These Terms shall be governed by the laws of India. All disputes shall be subject to the exclusive jurisdiction of Rajkot, Gujarat courts.
              </li>
            </ol>
          </section>

          {/* <section className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Grievance Officer</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>Name:</strong> [To be inserted by organization]</li>
              <li><strong>Designation:</strong> Grievance Officer</li>
              <li><strong>Address:</strong> Panchayat Chowk, University Road, Rajkot – 360005</li>
              <li><strong>Email:</strong> tinyyatra99@gmail.com</li>
              <li><strong>Phone:</strong> +91 63561 79699</li>
              <li><strong>Timings:</strong> Monday to Friday, 9:00 AM – 6:00 PM</li>
            </ul>
          </section> */}

          <section className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

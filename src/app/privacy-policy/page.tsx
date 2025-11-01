import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
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
              <strong>Dream Foundation</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) values the privacy of its users. This Privacy Policy explains how we collect,
              use, disclose, and protect your personal data through our Platform www.dreamfoundation.in. The Platform is legally
              operated under the ownership of <strong>Grow Like Gujarati</strong>, which manages all data and payment gateway operations.
            </p>

            <ol className="list-decimal list-inside space-y-5 ml-2">
              <li>
                <strong>Information Collection:</strong> We collect personal information such as name, contact details, and email when you register
                or interact with our Platform. Payment-related details (e.g., debit/credit card, UPI) are processed securely via our
                authorized payment gateway partners. We do not store any sensitive payment information.
              </li>
              <li>
                <strong>Usage:</strong> Your data is used to provide services, process ticket bookings, communicate updates, and ensure platform security.
              </li>
              <li>
                <strong>Sharing:</strong> We may share data with trusted partners, payment processors, or legal authorities as required by law. We do not sell user data.
              </li>
              <li>
                <strong>Security:</strong> Reasonable technical and organizational measures are implemented to protect your data against unauthorized access.
              </li>
              <li>
                <strong>Data Retention:</strong> We retain user data only for as long as necessary for educational or legal purposes.
              </li>
              <li>
                <strong>User Rights:</strong> You may contact us to access or delete your personal information by emailing tinyyatra99@gmail.com.
              </li>
              <li>
                <strong>Consent:</strong> By using our website and services, you consent to this Privacy Policy.
              </li>
              <li>
                <strong>Updates:</strong> Dream Foundation reserves the right to modify this Privacy Policy as needed. Users are encouraged to review it periodically.
              </li>
            </ol>
          </section>

          <section className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Grievance Officer</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>Name:</strong> [To be inserted by organization]</li>
              <li><strong>Designation:</strong> Grievance Officer</li>
              <li><strong>Address:</strong> Panchayat Chowk, University Road, Rajkot – 360005</li>
              <li><strong>Email:</strong> tinyyatra99@gmail.com</li>
              <li><strong>Phone:</strong> +91 63561 79699</li>
              <li><strong>Timings:</strong> Monday to Friday, 9:00 AM – 6:00 PM</li>
            </ul>
          </section>

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

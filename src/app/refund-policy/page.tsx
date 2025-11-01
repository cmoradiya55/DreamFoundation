import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Refund & Cancellation Policy</h1>
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
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h2 className="text-xl font-bold text-red-800 mb-3">Important Notice</h2>
              <p className="text-red-900 leading-relaxed">
                All payments made through the Dream Foundation website, including ticket bookings for events or educational programs,
                are <strong>non-refundable</strong>. Once a payment is confirmed, no refund, cancellation, or transfer requests will be accepted under any circumstances.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Policy Details</h3>
              
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <p className="mb-4">
                  All transactions are legally processed under the ownership of <strong>Grow Like Gujarati</strong>. By making a payment through our Platform,
                  you acknowledge and agree to the following:
                </p>
                
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>All payments are final and non-refundable</li>
                  <li>No cancellation requests will be entertained after payment confirmation</li>
                  <li>Ticket transfers to another person are not permitted</li>
                  <li>Refund requests due to personal circumstances, scheduling conflicts, or inability to attend will not be considered</li>
                  <li>In case of event cancellation by Dream Foundation, alternative arrangements or rescheduling will be communicated</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-blue-50 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Us</h3>
            <p className="text-gray-700 mb-4">
              If you have any questions regarding this Refund & Cancellation Policy, please contact us:
            </p>
            <ul className="space-y-2 text-sm">
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


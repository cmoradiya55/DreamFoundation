'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Search, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
              <AlertCircle className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <span className="text-white font-bold text-xl">!</span>
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-emerald-700 mb-4">
            404
          </h1>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Decorative Element */}
        <div className="mb-10 flex justify-center gap-2">
          <div className="w-3 h-3 bg-teal-600 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-emerald-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-teal-700 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="bg-white text-teal-700 border-2 border-teal-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg hover:bg-teal-50 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4 flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/" className="text-teal-700 hover:text-teal-800 hover:underline font-medium transition-colors">
              Home
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/admissionRegistration" className="text-teal-700 hover:text-teal-800 hover:underline font-medium transition-colors">
              Admission Registration
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/terms-and-conditions" className="text-teal-700 hover:text-teal-800 hover:underline font-medium transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/privacy-policy" className="text-teal-700 hover:text-teal-800 hover:underline font-medium transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <p className="text-gray-700 mb-2">
            Need help? Contact us:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center text-sm">
            <a href="mailto:tinyyatra99@gmail.com" className="text-teal-700 hover:text-teal-800 font-medium">
              tinyyatra99@gmail.com
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a href="tel:+916356179699" className="text-teal-700 hover:text-teal-800 font-medium">
              +91 63561 79699
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }
      `}</style>
    </div>
  );
}


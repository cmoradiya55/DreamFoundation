import React from 'react'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center px-4">
                <h1 className="text-9xl font-bold text-slate-900 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-slate-700 mb-4">
                    Page Not Found
                </h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}


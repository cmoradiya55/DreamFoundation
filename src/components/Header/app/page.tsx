import React from 'react'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-blue-50 py-20 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                            Welcome to LinkDrive
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                            The best solution for managing your links and driving traffic to your content.
                            Simplify your workflow and boost your productivity.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link
                                href="/signup"
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                            >
                                Get Started
                            </Link>
                            <Link
                                href="/features"
                                className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow duration-200">
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Fast & Reliable</h3>
                            <p className="text-slate-600">
                                Lightning-fast performance with 99.9% uptime guarantee. Your links are always accessible.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow duration-200">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Secure & Private</h3>
                            <p className="text-slate-600">
                                Enterprise-grade security to protect your data and ensure your privacy.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow duration-200">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Analytics & Insights</h3>
                            <p className="text-slate-600">
                                Track your link performance with detailed analytics and actionable insights.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-slate-300 mb-8">
                            Join thousands of users who are already using LinkDrive to manage their links efficiently.
                        </p>
                        <Link
                            href="/signup"
                            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                        >
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

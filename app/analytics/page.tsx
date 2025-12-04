"use client";
import React from 'react';
import Image from 'next/image';

export default function AnalyticsPage() {

  // Simulated analytics data (replace with real API integration)
  const stats = [
    { label: 'Total Members', value: 1245 },
    { label: 'Active Projects', value: 32 },
    { label: 'Service Requests', value: 210 },
    { label: 'Events Hosted', value: 18 },
    { label: 'Documents Shared', value: 76 },
    { label: 'Forum Posts', value: 340 },
  ];

  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Image src="/images/inara-logo.png" alt="INARA Logo" width={64} height={64} className="mr-4" />
        <h1 className="text-3xl font-bold">Reporting & Analytics</h1>
      </div>
      <p className="mb-6 text-lg">View network statistics, member activity, service utilization, and impact metrics.</p>

      {/* Network Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-blue-50 border border-blue-200 rounded p-6 text-center">
            <div className="text-2xl font-bold text-primary-700">{stat.value}</div>
            <div className="text-sm text-gray-600 mt-2">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Simulated chart (replace with real chart library) */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Impact Metrics (Simulated)</h2>
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
      </div>
    </main>
  );
}

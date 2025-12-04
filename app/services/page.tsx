"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Service = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  deliveryMode: string;
  duration?: string;
  objectives: string[];
  active?: boolean;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load services');
        setLoading(false);
      });
  }, []);

  // Simulated requested services for tracking (replace with real data integration)
  const [requestedServices, setRequestedServices] = useState<Service[]>([]);

  const handleRequestService = (service: Service) => {
    // Simulate request (replace with API call)
    setRequestedServices((prev) => [...prev, service]);
  };

  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Image src="/images/inara-logo.png" alt="INARA Logo" width={64} height={64} className="mr-4" />
        <h1 className="text-3xl font-bold">Services</h1>
      </div>
      <p className="mb-6 text-lg">Browse and request humanitarian services available through INARA Network.</p>

      {/* Requested Services Tracking Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Your Requested Services</h2>
        {requestedServices.length === 0 ? (
          <div className="text-gray-500">You have not requested any services yet.</div>
        ) : (
          <ul className="space-y-2">
            {requestedServices.map((service) => (
              <li key={service.id} className="bg-blue-50 border border-blue-200 rounded p-3 flex justify-between items-center">
                <span>{service.name}</span>
                <span className="text-xs text-gray-600">Status: Pending</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading ? (
        <div>Loading services...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No services available.</div>
          ) : (
            services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow p-6 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                <p className="mb-2 text-sm text-gray-600">Category: {service.category.replace(/_/g, ' ')}</p>
                <p className="mb-4">{service.description}</p>
                <ul className="mb-4 text-sm list-disc pl-5">
                  {service.objectives.map((obj, idx) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ul>
                <button
                  className="mt-auto px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
                  onClick={() => handleRequestService(service)}
                  disabled={requestedServices.some((s) => s.id === service.id)}
                >
                  {requestedServices.some((s) => s.id === service.id) ? 'Requested' : 'Request Service'}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}

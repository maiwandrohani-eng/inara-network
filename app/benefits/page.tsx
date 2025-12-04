"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Benefit = {
  id: string;
  title: string;
  slug: string;
  description: string;
  eligibility: string;
  redemptionUrl?: string;
  active?: boolean;
};

export default function BenefitsPage() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/benefits')
      .then((res) => res.json())
      .then((data) => {
        setBenefits(data.benefits || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load benefits');
        setLoading(false);
      });
  }, []);


  // Simulated eligibility checker and redemption (replace with real API integration)
  const [checked, setChecked] = useState<{[id: string]: boolean}>({});

  const handleCheckEligibility = (benefit: Benefit) => {
    setChecked((prev) => ({ ...prev, [benefit.id]: true }));
  };

  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Image src="/images/inara-logo.png" alt="INARA Logo" width={64} height={64} className="mr-4" />
        <h1 className="text-3xl font-bold">Member Benefits</h1>
      </div>
      <p className="mb-6 text-lg">Discover benefits, check eligibility, and redeem offers.</p>

      {loading ? (
        <div>Loading benefits...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No benefits available.</div>
          ) : (
            benefits.map((benefit) => (
              <div key={benefit.id} className="bg-white rounded-lg shadow p-6 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{benefit.title}</h2>
                <p className="mb-2 text-sm text-gray-600">Eligibility: {benefit.eligibility}</p>
                <p className="mb-4">{benefit.description}</p>
                <button
                  className="mb-2 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
                  onClick={() => handleCheckEligibility(benefit)}
                  disabled={checked[benefit.id]}
                >
                  {checked[benefit.id] ? 'Eligible' : 'Check Eligibility'}
                </button>
                {checked[benefit.id] && benefit.redemptionUrl ? (
                  <a href={benefit.redemptionUrl} className="mt-auto text-blue-600 hover:underline">Redeem</a>
                ) : checked[benefit.id] ? (
                  <span className="mt-auto text-gray-400">No redemption link</span>
                ) : null}
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}

"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Region = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  country: string;
  active?: boolean;
};

export default function RegionsPage() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/regions')
      .then((res) => res.json())
      .then((data) => {
        setRegions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load regions');
        setLoading(false);
      });
  }, []);

  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Image src="/images/inara-logo.png" alt="INARA Logo" width={64} height={64} className="mr-4" />
        <h1 className="text-3xl font-bold">Regions</h1>
      </div>
      <p className="mb-6 text-lg">Explore INARA's operational regions and local resources.</p>
      {loading ? (
        <div>Loading regions...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No regions available.</div>
          ) : (
            regions.map((region) => (
              <div key={region.id} className="bg-white rounded-lg shadow p-6 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{region.name}</h2>
                <p className="mb-2 text-sm text-gray-600">Country: {region.country}</p>
                <p className="mb-4">{region.description}</p>
                <Link href={`/regions/view/${region.id}`} className="mt-auto text-blue-600 hover:underline">View Region</Link>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}

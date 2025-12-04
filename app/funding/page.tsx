"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type FundingOpportunity = {
  id: string;
  title: string;
  slug: string;
  description: string;
  funderName: string;
  funderType: string;
  fundingType: string;
  amount?: number;
  eligibleRegions: string[];
  eligibleSectors: string[];
  openDate: string;
  deadline: string;
  applicationUrl?: string;
  requirements: string[];
};

export default function FundingPage() {
  const [opportunities, setOpportunities] = useState<FundingOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Simulated proposal requests and success tracking (replace with real data integration)
  const [proposals, setProposals] = useState<{id: string; title: string; status: string}[]>([]);

  const handleRequestProposal = (op: FundingOpportunity) => {
    setProposals((prev) => [...prev, { id: op.id, title: op.title, status: 'Submitted' }]);
  };


  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Image src="/images/inara-logo.png" alt="INARA Logo" width={64} height={64} className="mr-4" />
        <h1 className="text-3xl font-bold">Funding Opportunities</h1>
      </div>
      <p className="mb-6 text-lg">Browse available funding, submit proposals, and track success.</p>

      {/* Proposal Support Tracking Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Your Proposals</h2>
        {proposals.length === 0 ? (
          <div className="text-gray-500">You have not submitted any proposals yet.</div>
        ) : (
          <ul className="space-y-2">
            {proposals.map((proposal) => (
              <li key={proposal.id} className="bg-yellow-50 border border-yellow-200 rounded p-3 flex justify-between items-center">
                <span>{proposal.title}</span>
                <span className="text-xs text-gray-600">Status: {proposal.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading ? (
        <div>Loading funding opportunities...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No funding opportunities available.</div>
          ) : (
            opportunities.map((op) => (
              <div key={op.id} className="bg-white rounded-lg shadow p-6 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{op.title}</h2>
                <p className="mb-2 text-sm text-gray-600">Funder: {op.funderName} ({op.funderType.replace(/_/g, ' ')})</p>
                <p className="mb-2 text-sm text-gray-600">Type: {op.fundingType.replace(/_/g, ' ')}</p>
                <p className="mb-2 text-sm text-gray-600">Amount: {op.amount ? `$${op.amount.toLocaleString()}` : 'N/A'}</p>
                <p className="mb-2 text-sm text-gray-600">Open: {new Date(op.openDate).toLocaleDateString()} | Deadline: {new Date(op.deadline).toLocaleDateString()}</p>
                <p className="mb-4">{op.description}</p>
                <ul className="mb-4 text-sm list-disc pl-5">
                  {op.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
                <button
                  className="mt-auto px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
                  onClick={() => handleRequestProposal(op)}
                  disabled={proposals.some((p) => p.id === op.id)}
                >
                  {proposals.some((p) => p.id === op.id) ? 'Proposal Submitted' : 'Request Proposal Support'}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}

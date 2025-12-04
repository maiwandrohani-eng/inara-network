"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Assessment = {
  id: string;
  title: string;
  slug: string;
  description: string;
  score?: number;
  improvementPlan?: string;
  milestone?: string;
  active?: boolean;
};

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/assessments')
      .then((res) => res.json())
      .then((data) => {
        setAssessments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load assessments');
        setLoading(false);
      });
  }, []);


  // Simulated assessment request and milestone tracking (replace with real API integration)
  const [requested, setRequested] = useState<{[id: string]: boolean}>({});
  const [milestones, setMilestones] = useState<{[id: string]: string}>({});

  const handleRequestAssessment = (assessment: Assessment) => {
    setRequested((prev) => ({ ...prev, [assessment.id]: true }));
    setMilestones((prev) => ({ ...prev, [assessment.id]: 'Milestone 1 started' }));
  };

  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Image src="/images/inara-logo.png" alt="INARA Logo" width={64} height={64} className="mr-4" />
        <h1 className="text-3xl font-bold">Assessments</h1>
      </div>
      <p className="mb-6 text-lg">Request assessments, view scores, and track improvement plans.</p>

      {/* Assessment Request and Milestone Tracking Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Your Assessment Requests</h2>
        {Object.keys(requested).length === 0 ? (
          <div className="text-gray-500">You have not requested any assessments yet.</div>
        ) : (
          <ul className="space-y-2">
            {Object.keys(requested).map((id) => (
              <li key={id} className="bg-green-50 border border-green-200 rounded p-3 flex justify-between items-center">
                <span>Assessment ID: {id}</span>
                <span className="text-xs text-gray-600">{milestones[id]}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading ? (
        <div>Loading assessments...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(assessments) && assessments.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No assessments available.</div>
          ) : (
            (Array.isArray(assessments) ? assessments : []).map((assessment) => (
              <div key={assessment.id} className="bg-white rounded-lg shadow p-6 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{assessment.title}</h2>
                <p className="mb-2 text-sm text-gray-600">Score: {assessment.score !== undefined ? assessment.score : 'N/A'}</p>
                <p className="mb-2 text-sm text-gray-600">Milestone: {assessment.milestone || 'N/A'}</p>
                <p className="mb-4">{assessment.description}</p>
                {assessment.improvementPlan && (
                  <div className="mb-2 text-xs text-green-600">Improvement Plan: {assessment.improvementPlan}</div>
                )}
                <button
                  className="mt-auto px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
                  onClick={() => handleRequestAssessment(assessment)}
                  disabled={requested[assessment.id]}
                >
                  {requested[assessment.id] ? 'Requested' : 'Request Assessment'}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}

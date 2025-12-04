"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Training = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  location?: string;
  onlineUrl?: string;
  certificate?: boolean;
  active?: boolean;
};

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/trainings')
      .then((res) => res.json())
      .then((data) => {
        setTrainings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load trainings');
        setLoading(false);
      });
  }, []);


  // Simulated enrolled trainings and attendance (replace with real data integration)
  const [enrolledTrainings, setEnrolledTrainings] = useState<Training[]>([]);
  const [attendance, setAttendance] = useState<{[id: string]: boolean}>({});

  const handleEnroll = (training: Training) => {
    setEnrolledTrainings((prev) => [...prev, training]);
  };

  const handleMarkAttendance = (id: string) => {
    setAttendance((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Image src="/images/inara-logo.png" alt="INARA Logo" width={64} height={64} className="mr-4" />
        <h1 className="text-3xl font-bold">Trainings</h1>
      </div>
      <p className="mb-6 text-lg">Explore training programs, enroll, and track your progress.</p>

      {/* Enrolled Trainings Tracking Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Your Enrolled Trainings</h2>
        {enrolledTrainings.length === 0 ? (
          <div className="text-gray-500">You have not enrolled in any trainings yet.</div>
        ) : (
          <ul className="space-y-2">
            {enrolledTrainings.map((training) => (
              <li key={training.id} className="bg-green-50 border border-green-200 rounded p-3 flex flex-col gap-1">
                <span className="font-semibold">{training.title}</span>
                <span className="text-xs text-gray-600">Dates: {new Date(training.startDate).toLocaleDateString()} - {new Date(training.endDate).toLocaleDateString()}</span>
                <span className="text-xs text-gray-600">Category: {training.category.replace(/_/g, ' ')}</span>
                <span className="text-xs text-gray-600">Attendance: {attendance[training.id] ? 'Marked' : 'Not Marked'}</span>
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 text-xs"
                    onClick={() => handleMarkAttendance(training.id)}
                    disabled={attendance[training.id]}
                  >
                    {attendance[training.id] ? 'Attendance Marked' : 'Mark Attendance'}
                  </button>
                  {training.certificate && attendance[training.id] && (
                    <span className="px-3 py-1 bg-green-600 text-white rounded text-xs">Certificate Ready</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading ? (
        <div>Loading trainings...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainings.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No trainings available.</div>
          ) : (
            trainings.map((training) => (
              <div key={training.id} className="bg-white rounded-lg shadow p-6 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{training.title}</h2>
                <p className="mb-2 text-sm text-gray-600">Category: {training.category.replace(/_/g, ' ')}</p>
                <p className="mb-2 text-sm text-gray-600">Dates: {new Date(training.startDate).toLocaleDateString()} - {new Date(training.endDate).toLocaleDateString()}</p>
                <p className="mb-4">{training.description}</p>
                {training.certificate && <span className="text-green-600 text-xs mb-2">Certificate Provided</span>}
                <button
                  className="mt-auto px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
                  onClick={() => handleEnroll(training)}
                  disabled={enrolledTrainings.some((t) => t.id === training.id)}
                >
                  {enrolledTrainings.some((t) => t.id === training.id) ? 'Enrolled' : 'Enroll'}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}

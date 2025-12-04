"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Forum = {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  createdAt: string;
  active?: boolean;
};

export default function ForumsPage() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/forums')
      .then((res) => res.json())
      .then((data) => {
        setForums(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load forums');
        setLoading(false);
      });
  }, []);


  // Simulated announcements and working groups (replace with real API integration)
  const [announcements] = useState([
    { id: '1', title: 'Welcome to INARA Forums!', date: '2025-12-01', content: 'Connect, share, and collaborate.' },
    { id: '2', title: 'Working Groups Launched', date: '2025-12-03', content: 'Join a group to work on key topics.' },
  ]);
  const [groups] = useState([
    { id: 'g1', name: 'Humanitarian Response', members: 24 },
    { id: 'g2', name: 'Youth Engagement', members: 12 },
  ]);

  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Image src="/images/inara-logo.png" alt="INARA Logo" width={64} height={64} className="mr-4" />
        <h1 className="text-3xl font-bold">Forums & Communication</h1>
      </div>
      <p className="mb-6 text-lg">Join discussions, working groups, and stay updated with announcements.</p>

      {/* Announcements Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Announcements</h2>
        <ul className="space-y-2">
          {announcements.map((a) => (
            <li key={a.id} className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <div className="font-semibold">{a.title}</div>
              <div className="text-xs text-gray-600">{a.date}</div>
              <div>{a.content}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Working Groups Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Working Groups</h2>
        <ul className="space-y-2">
          {groups.map((g) => (
            <li key={g.id} className="bg-blue-50 border border-blue-200 rounded p-3 flex justify-between items-center">
              <span>{g.name}</span>
              <span className="text-xs text-gray-600">Members: {g.members}</span>
              <Link href={`/forums/groups/${g.id}`} className="ml-4 text-blue-600 hover:underline">View Group</Link>
            </li>
          ))}
        </ul>
      </div>

      {loading ? (
        <div>Loading forums...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forums.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No forums available.</div>
          ) : (
            forums.map((forum) => (
              <div key={forum.id} className="bg-white rounded-lg shadow p-6 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{forum.title}</h2>
                <p className="mb-2 text-sm text-gray-600">Type: {forum.type.replace(/_/g, ' ')}</p>
                <p className="mb-2 text-sm text-gray-600">Created: {new Date(forum.createdAt).toLocaleDateString()}</p>
                <p className="mb-4">{forum.description}</p>
                <Link href={`/forums/discussion/${forum.id}`} className="mt-auto text-blue-600 hover:underline">View Discussion</Link>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}

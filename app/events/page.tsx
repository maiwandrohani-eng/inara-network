"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Event = {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  format: string;
  startDate: string;
  endDate?: string;
  venue?: string;
  country?: string;
  onlineUrl?: string;
  topics?: string[];
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<{id: string; title: string; attended: boolean}[]>([]);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load events');
        setLoading(false);
      });
  }, []);

  const handleRegister = (event: Event) => {
    setRegistrations((prev) => [...prev, { id: event.id, title: event.title, attended: false }]);
  };

  const handleMarkAttended = (eventId: string) => {
    setRegistrations((prev) => prev.map((reg) => reg.id === eventId ? { ...reg, attended: true } : reg));
  };

  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Image src="/images/inara-logo.png" alt="INARA Logo" width={64} height={64} className="mr-4" />
        <h1 className="text-3xl font-bold">Events</h1>
      </div>
      <p className="mb-6 text-lg">View upcoming events, register, and download materials.</p>

      {/* Registration and Attendance Tracking Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Your Event Registrations</h2>
        {registrations.length === 0 ? (
          <div className="text-gray-500">You have not registered for any events yet.</div>
        ) : (
          <ul className="space-y-2">
            {registrations.map((reg) => (
              <li key={reg.id} className="bg-blue-50 border border-blue-200 rounded p-3 flex justify-between items-center">
                <span>{reg.title}</span>
                <span className="text-xs text-gray-600">{reg.attended ? 'Attended' : 'Registered'}</span>
                {!reg.attended && (
                  <button
                    className="ml-4 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    onClick={() => handleMarkAttended(reg.id)}
                  >Mark Attended</button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading ? (
        <div>Loading events...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No events available.</div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow p-6 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="mb-2 text-sm text-gray-600">Type: {event.type.replace(/_/g, ' ')}</p>
                <p className="mb-2 text-sm text-gray-600">Dates: {new Date(event.startDate).toLocaleDateString()} - {event.endDate ? new Date(event.endDate).toLocaleDateString() : ''}</p>
                <p className="mb-2 text-sm text-gray-600">Format: {event.format.replace(/_/g, ' ')}</p>
                {event.venue && <p className="mb-2 text-sm text-gray-600">Venue: {event.venue}</p>}
                {event.country && <p className="mb-2 text-sm text-gray-600">Country: {event.country}</p>}
                {event.onlineUrl && <p className="mb-2 text-sm text-blue-600"><a href={event.onlineUrl} target="_blank" rel="noopener noreferrer">Join Online</a></p>}
                <p className="mb-4">{event.description}</p>
                <ul className="mb-4 text-sm list-disc pl-5">
                  {event.topics?.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
                <button
                  className="mt-auto px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
                  onClick={() => handleRegister(event)}
                  disabled={registrations.some((r) => r.id === event.id)}
                >
                  {registrations.some((r) => r.id === event.id) ? 'Registered' : 'Register'}
                </button>
                {/* Materials download simulation */}
                <div className="mt-2">
                  <Link href={`/events/materials/${event.id}`} className="text-blue-600 hover:underline">Download Materials</Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}
// ...existing code...

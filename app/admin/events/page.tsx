"use client";
import { useEffect, useState } from 'react';

type Event = {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  description?: string;
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [form, setForm] = useState<Partial<Event>>({});

  useEffect(() => {
    // TODO: Replace with real API call
    setTimeout(() => {
      setEvents([
        { id: '1', title: 'Capacity Building Workshop', type: 'WORKSHOP', date: '2025-12-10', location: 'Amman', description: 'A workshop for capacity building.' },
        { id: '2', title: 'Annual Conference', type: 'CONFERENCE', date: '2026-01-15', location: 'Beirut', description: 'Annual humanitarian conference.' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleAdd = () => {
    setEditEvent(null);
    setForm({});
    setShowForm(true);
  };
  const handleEdit = (event: Event) => {
    setEditEvent(event);
    setForm(event);
    setShowForm(true);
  };
  const handleDelete = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };
  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (editEvent) {
      setEvents(events.map(e => e.id === editEvent.id ? { ...e, ...form, id: editEvent.id } as Event : e));
    } else {
      setEvents([...events, { ...form, id: Date.now().toString() } as Event]);
    }
    setShowForm(false);
    setEditEvent(null);
    setForm({});
  };
  const handleCancel = () => {
    setShowForm(false);
    setEditEvent(null);
    setForm({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Events</h1>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">Organize and manage events here.</p>
        <button className="btn btn-primary" onClick={handleAdd}>Add Event</button>
      </div>
      {loading ? (
        <div>Loading events...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Type</th>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Location</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td className="px-4 py-2 border-b font-semibold">{event.title}</td>
                <td className="px-4 py-2 border-b">{event.type}</td>
                <td className="px-4 py-2 border-b">{event.date}</td>
                <td className="px-4 py-2 border-b">{event.location}</td>
                <td className="px-4 py-2 border-b">{event.description}</td>
                <td className="px-4 py-2 border-b flex gap-2">
                  <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(event)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(event.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md" onSubmit={handleFormSubmit}>
            <h2 className="text-xl font-bold mb-4">{editEvent ? 'Edit Event' : 'Add Event'}</h2>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Title</label>
              <input name="title" className="input w-full" required value={form.title || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Type</label>
              <input name="type" className="input w-full" required value={form.type || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Date</label>
              <input name="date" type="date" className="input w-full" required value={form.date || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Location</label>
              <input name="location" className="input w-full" required value={form.location || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Description</label>
              <textarea name="description" className="input w-full" value={form.description || ''} onChange={handleFormChange} />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary">{editEvent ? 'Update' : 'Create'}</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

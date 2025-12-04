"use client";
import { useEffect, useState } from 'react';

type Training = {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  description?: string;
};

export default function AdminTrainingPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editTraining, setEditTraining] = useState<Training | null>(null);
  const [form, setForm] = useState<Partial<Training>>({});

  useEffect(() => {
    // TODO: Replace with real API call
    setTimeout(() => {
      setTrainings([
        { id: '1', title: 'Child Protection Training', type: 'WORKSHOP', date: '2025-12-15', location: 'Amman', description: 'Training for child protection best practices.' },
        { id: '2', title: 'Leadership Seminar', type: 'SEMINAR', date: '2026-01-20', location: 'Beirut', description: 'Seminar for leadership development.' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleAdd = () => {
    setEditTraining(null);
    setForm({});
    setShowForm(true);
  };
  const handleEdit = (training: Training) => {
    setEditTraining(training);
    setForm(training);
    setShowForm(true);
  };
  const handleDelete = (id: string) => {
    setTrainings(trainings.filter(t => t.id !== id));
  };
  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (editTraining) {
      setTrainings(trainings.map(t => t.id === editTraining.id ? { ...t, ...form, id: editTraining.id } as Training : t));
    } else {
      setTrainings([...trainings, { ...form, id: Date.now().toString() } as Training]);
    }
    setShowForm(false);
    setEditTraining(null);
    setForm({});
  };
  const handleCancel = () => {
    setShowForm(false);
    setEditTraining(null);
    setForm({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Training Programs</h1>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">Create and manage capacity building programs here.</p>
        <button className="btn btn-primary" onClick={handleAdd}>Add Training</button>
      </div>
      {loading ? (
        <div>Loading trainings...</div>
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
            {trainings.map(training => (
              <tr key={training.id}>
                <td className="px-4 py-2 border-b font-semibold">{training.title}</td>
                <td className="px-4 py-2 border-b">{training.type}</td>
                <td className="px-4 py-2 border-b">{training.date}</td>
                <td className="px-4 py-2 border-b">{training.location}</td>
                <td className="px-4 py-2 border-b">{training.description}</td>
                <td className="px-4 py-2 border-b flex gap-2">
                  <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(training)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(training.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md" onSubmit={handleFormSubmit}>
            <h2 className="text-xl font-bold mb-4">{editTraining ? 'Edit Training' : 'Add Training'}</h2>
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
              <button type="submit" className="btn btn-primary">{editTraining ? 'Update' : 'Create'}</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

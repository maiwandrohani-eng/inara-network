"use client";
import { useEffect, useState } from 'react';

type Funding = {
  id: string;
  title: string;
  donor: string;
  deadline: string;
  amount: string;
  description?: string;
};

export default function AdminFundingPage() {
  const [funding, setFunding] = useState<Funding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editFunding, setEditFunding] = useState<Funding | null>(null);
  const [form, setForm] = useState<Partial<Funding>>({});

  useEffect(() => {
    // TODO: Replace with real API call
    setTimeout(() => {
      setFunding([
        { id: '1', title: 'USAID Emergency Response Grant', donor: 'USAID', deadline: '2025-12-20', amount: '100,000 USD', description: 'Emergency response funding.' },
        { id: '2', title: 'UNICEF Child Protection Fund', donor: 'UNICEF', deadline: '2026-01-10', amount: '50,000 USD', description: 'Funding for child protection projects.' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleAdd = () => {
    setEditFunding(null);
    setForm({});
    setShowForm(true);
  };
  const handleEdit = (item: Funding) => {
    setEditFunding(item);
    setForm(item);
    setShowForm(true);
  };
  const handleDelete = (id: string) => {
    setFunding(funding.filter(f => f.id !== id));
  };
  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (editFunding) {
      setFunding(funding.map(f => f.id === editFunding.id ? { ...f, ...form, id: editFunding.id } as Funding : f));
    } else {
      setFunding([...funding, { ...form, id: Date.now().toString() } as Funding]);
    }
    setShowForm(false);
    setEditFunding(null);
    setForm({});
  };
  const handleCancel = () => {
    setShowForm(false);
    setEditFunding(null);
    setForm({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Funding Opportunities</h1>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">Post and manage funding opportunities here.</p>
        <button className="btn btn-primary" onClick={handleAdd}>Add Funding</button>
      </div>
      {loading ? (
        <div>Loading funding opportunities...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Donor</th>
              <th className="px-4 py-2 border-b">Deadline</th>
              <th className="px-4 py-2 border-b">Amount</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {funding.map(item => (
              <tr key={item.id}>
                <td className="px-4 py-2 border-b font-semibold">{item.title}</td>
                <td className="px-4 py-2 border-b">{item.donor}</td>
                <td className="px-4 py-2 border-b">{item.deadline}</td>
                <td className="px-4 py-2 border-b">{item.amount}</td>
                <td className="px-4 py-2 border-b">{item.description}</td>
                <td className="px-4 py-2 border-b flex gap-2">
                  <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md" onSubmit={handleFormSubmit}>
            <h2 className="text-xl font-bold mb-4">{editFunding ? 'Edit Funding' : 'Add Funding'}</h2>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Title</label>
              <input name="title" className="input w-full" required value={form.title || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Donor</label>
              <input name="donor" className="input w-full" required value={form.donor || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Deadline</label>
              <input name="deadline" type="date" className="input w-full" required value={form.deadline || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Amount</label>
              <input name="amount" className="input w-full" required value={form.amount || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Description</label>
              <textarea name="description" className="input w-full" value={form.description || ''} onChange={handleFormChange} />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary">{editFunding ? 'Update' : 'Create'}</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

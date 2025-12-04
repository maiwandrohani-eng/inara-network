"use client";
import { useEffect, useState } from 'react';

type Benefit = {
  id: string;
  title: string;
  eligibility: string;
  description?: string;
  active?: boolean;
};

export default function AdminBenefitsPage() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editBenefit, setEditBenefit] = useState<Benefit | null>(null);
  const [form, setForm] = useState<Partial<Benefit>>({});

  useEffect(() => {
    // TODO: Replace with real API call
    setTimeout(() => {
      setBenefits([
        { id: '1', title: 'Free Training Access', eligibility: 'All Members', description: 'Access to all INARA training programs.', active: true },
        { id: '2', title: 'Funding Opportunities', eligibility: 'Full Members', description: 'Exclusive access to funding calls.', active: true },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleAdd = () => {
    setEditBenefit(null);
    setForm({});
    setShowForm(true);
  };
  const handleEdit = (benefit: Benefit) => {
    setEditBenefit(benefit);
    setForm(benefit);
    setShowForm(true);
  };
  const handleDelete = (id: string) => {
    setBenefits(benefits.filter(b => b.id !== id));
  };
  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (editBenefit) {
      setBenefits(benefits.map(b => b.id === editBenefit.id ? { ...b, ...form, id: editBenefit.id } as Benefit : b));
    } else {
      setBenefits([...benefits, { ...form, id: Date.now().toString() } as Benefit]);
    }
    setShowForm(false);
    setEditBenefit(null);
    setForm({});
  };
  const handleCancel = () => {
    setShowForm(false);
    setEditBenefit(null);
    setForm({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Benefits & Rewards</h1>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">Manage member benefits and certificates here.</p>
        <button className="btn btn-primary" onClick={handleAdd}>Add Benefit</button>
      </div>
      {loading ? (
        <div>Loading benefits...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Eligibility</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Active</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {benefits.map(benefit => (
              <tr key={benefit.id}>
                <td className="px-4 py-2 border-b font-semibold">{benefit.title}</td>
                <td className="px-4 py-2 border-b">{benefit.eligibility}</td>
                <td className="px-4 py-2 border-b">{benefit.description}</td>
                <td className="px-4 py-2 border-b">{benefit.active ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 border-b flex gap-2">
                  <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(benefit)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(benefit.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md" onSubmit={handleFormSubmit}>
            <h2 className="text-xl font-bold mb-4">{editBenefit ? 'Edit Benefit' : 'Add Benefit'}</h2>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Title</label>
              <input name="title" className="input w-full" required value={form.title || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Eligibility</label>
              <input name="eligibility" className="input w-full" required value={form.eligibility || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Description</label>
              <textarea name="description" className="input w-full" value={form.description || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Active</label>
              <select name="active" className="input w-full" value={form.active ? 'true' : 'false'} onChange={e => setForm({ ...form, active: e.target.value === 'true' })}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary">{editBenefit ? 'Update' : 'Create'}</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

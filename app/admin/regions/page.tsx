"use client";
import { useEffect, useState } from 'react';

type Region = {
  id: string;
  name: string;
  country: string;
  description?: string;
  active?: boolean;
};

export default function AdminRegionsPage() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editRegion, setEditRegion] = useState<Region | null>(null);
  const [form, setForm] = useState<Partial<Region>>({});

  useEffect(() => {
    // TODO: Replace with real API call
    setTimeout(() => {
      setRegions([
        { id: '1', name: 'Middle East', country: 'Jordan', description: 'Coordination for Middle East region.', active: true },
        { id: '2', name: 'North Africa', country: 'Egypt', description: 'Coordination for North Africa region.', active: true },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleAdd = () => {
    setEditRegion(null);
    setForm({});
    setShowForm(true);
  };
  const handleEdit = (region: Region) => {
    setEditRegion(region);
    setForm(region);
    setShowForm(true);
  };
  const handleDelete = (id: string) => {
    setRegions(regions.filter(r => r.id !== id));
  };
  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (editRegion) {
      setRegions(regions.map(r => r.id === editRegion.id ? { ...r, ...form, id: editRegion.id } as Region : r));
    } else {
      setRegions([...regions, { ...form, id: Date.now().toString() } as Region]);
    }
    setShowForm(false);
    setEditRegion(null);
    setForm({});
  };
  const handleCancel = () => {
    setShowForm(false);
    setEditRegion(null);
    setForm({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Regional Coordination</h1>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">Manage regions and coordination meetings here.</p>
        <button className="btn btn-primary" onClick={handleAdd}>Add Region</button>
      </div>
      {loading ? (
        <div>Loading regions...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Country</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Active</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {regions.map(region => (
              <tr key={region.id}>
                <td className="px-4 py-2 border-b font-semibold">{region.name}</td>
                <td className="px-4 py-2 border-b">{region.country}</td>
                <td className="px-4 py-2 border-b">{region.description}</td>
                <td className="px-4 py-2 border-b">{region.active ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 border-b flex gap-2">
                  <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(region)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(region.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md" onSubmit={handleFormSubmit}>
            <h2 className="text-xl font-bold mb-4">{editRegion ? 'Edit Region' : 'Add Region'}</h2>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Name</label>
              <input name="name" className="input w-full" required value={form.name || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Country</label>
              <input name="country" className="input w-full" required value={form.country || ''} onChange={handleFormChange} />
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
              <button type="submit" className="btn btn-primary">{editRegion ? 'Update' : 'Create'}</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

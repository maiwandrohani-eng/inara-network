"use client";
import { useEffect, useState } from 'react';

type Forum = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category: string;
  visibility: string;
};

export default function AdminForumsPage() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editForum, setEditForum] = useState<Forum | null>(null);
  const [form, setForm] = useState<Partial<Forum>>({});

  useEffect(() => {
    // TODO: Replace with real API call
    setTimeout(() => {
      setForums([
        { id: '1', name: 'General Discussion', slug: 'general', category: 'General', visibility: 'PUBLIC', description: 'Open topics for all members.' },
        { id: '2', name: 'Announcements', slug: 'announcements', category: 'Updates', visibility: 'MEMBERS', description: 'Official network announcements.' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleAdd = () => {
    setEditForum(null);
    setForm({});
    setShowForm(true);
  };
  const handleEdit = (forum: Forum) => {
    setEditForum(forum);
    setForm(forum);
    setShowForm(true);
  };
  const handleDelete = (id: string) => {
    setForums(forums.filter(f => f.id !== id));
  };
  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (editForum) {
      setForums(forums.map(f => f.id === editForum.id ? { ...f, ...form, id: editForum.id } as Forum : f));
    } else {
      setForums([...forums, { ...form, id: Date.now().toString() } as Forum]);
    }
    setShowForm(false);
    setEditForum(null);
    setForm({});
  };
  const handleCancel = () => {
    setShowForm(false);
    setEditForum(null);
    setForm({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Forums & Communication</h1>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">Manage forums, announcements, and mailing lists here.</p>
        <button className="btn btn-primary" onClick={handleAdd}>Add Forum</button>
      </div>
      {loading ? (
        <div>Loading forums...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Visibility</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {forums.map(forum => (
              <tr key={forum.id}>
                <td className="px-4 py-2 border-b font-semibold">{forum.name}</td>
                <td className="px-4 py-2 border-b">{forum.category}</td>
                <td className="px-4 py-2 border-b">{forum.visibility}</td>
                <td className="px-4 py-2 border-b">{forum.description}</td>
                <td className="px-4 py-2 border-b flex gap-2">
                  <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(forum)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(forum.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md" onSubmit={handleFormSubmit}>
            <h2 className="text-xl font-bold mb-4">{editForum ? 'Edit Forum' : 'Add Forum'}</h2>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Name</label>
              <input name="name" className="input w-full" required value={form.name || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Category</label>
              <input name="category" className="input w-full" required value={form.category || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Visibility</label>
              <select name="visibility" className="input w-full" required value={form.visibility || 'MEMBERS'} onChange={handleFormChange}>
                <option value="PUBLIC">Public</option>
                <option value="MEMBERS">Members</option>
                <option value="RESTRICTED">Restricted</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Description</label>
              <textarea name="description" className="input w-full" value={form.description || ''} onChange={handleFormChange} />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary">{editForum ? 'Update' : 'Create'}</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

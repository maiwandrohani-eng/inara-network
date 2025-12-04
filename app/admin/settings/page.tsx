"use client";
import { useEffect, useState } from 'react';

type Setting = {
  id: string;
  key: string;
  value: string;
  description?: string;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editSetting, setEditSetting] = useState<Setting | null>(null);
  const [form, setForm] = useState<Partial<Setting>>({});

  useEffect(() => {
    // TODO: Replace with real API call
    setTimeout(() => {
      setSettings([
        { id: '1', key: 'platformName', value: 'INARA Network', description: 'The name of the platform.' },
        { id: '2', key: 'supportEmail', value: 'support@inara.org', description: 'Support contact email.' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleAdd = () => {
    setEditSetting(null);
    setForm({});
    setShowForm(true);
  };
  const handleEdit = (setting: Setting) => {
    setEditSetting(setting);
    setForm(setting);
    setShowForm(true);
  };
  const handleDelete = (id: string) => {
    setSettings(settings.filter(s => s.id !== id));
  };
  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (editSetting) {
      setSettings(settings.map(s => s.id === editSetting.id ? { ...s, ...form, id: editSetting.id } as Setting : s));
    } else {
      setSettings([...settings, { ...form, id: Date.now().toString() } as Setting]);
    }
    setShowForm(false);
    setEditSetting(null);
    setForm({});
  };
  const handleCancel = () => {
    setShowForm(false);
    setEditSetting(null);
    setForm({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Settings</h1>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">Platform settings and configuration will appear here.</p>
        <button className="btn btn-primary" onClick={handleAdd}>Add Setting</button>
      </div>
      {loading ? (
        <div>Loading settings...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Key</th>
              <th className="px-4 py-2 border-b">Value</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {settings.map(setting => (
              <tr key={setting.id}>
                <td className="px-4 py-2 border-b font-semibold">{setting.key}</td>
                <td className="px-4 py-2 border-b">{setting.value}</td>
                <td className="px-4 py-2 border-b">{setting.description}</td>
                <td className="px-4 py-2 border-b flex gap-2">
                  <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(setting)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(setting.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md" onSubmit={handleFormSubmit}>
            <h2 className="text-xl font-bold mb-4">{editSetting ? 'Edit Setting' : 'Add Setting'}</h2>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Key</label>
              <input name="key" className="input w-full" required value={form.key || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Value</label>
              <input name="value" className="input w-full" required value={form.value || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Description</label>
              <textarea name="description" className="input w-full" value={form.description || ''} onChange={handleFormChange} />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary">{editSetting ? 'Update' : 'Create'}</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from 'react';

type Report = {
  id: string;
  title: string;
  type: string;
  date: string;
  description?: string;
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editReport, setEditReport] = useState<Report | null>(null);
  const [form, setForm] = useState<Partial<Report>>({});

  useEffect(() => {
    // TODO: Replace with real API call
    setTimeout(() => {
      setReports([
        { id: '1', title: 'Annual Impact Report', type: 'IMPACT', date: '2025-12-01', description: 'Annual report on network impact.' },
        { id: '2', title: 'Training Completion Stats', type: 'STATISTICS', date: '2025-11-15', description: 'Statistics on training completion.' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleAdd = () => {
    setEditReport(null);
    setForm({});
    setShowForm(true);
  };
  const handleEdit = (report: Report) => {
    setEditReport(report);
    setForm(report);
    setShowForm(true);
  };
  const handleDelete = (id: string) => {
    setReports(reports.filter(r => r.id !== id));
  };
  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (editReport) {
      setReports(reports.map(r => r.id === editReport.id ? { ...r, ...form, id: editReport.id } as Report : r));
    } else {
      setReports([...reports, { ...form, id: Date.now().toString() } as Report]);
    }
    setShowForm(false);
    setEditReport(null);
    setForm({});
  };
  const handleCancel = () => {
    setShowForm(false);
    setEditReport(null);
    setForm({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Reports & Analytics</h1>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">Network statistics and impact reports will appear here.</p>
        <button className="btn btn-primary" onClick={handleAdd}>Add Report</button>
      </div>
      {loading ? (
        <div>Loading reports...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Type</th>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td className="px-4 py-2 border-b font-semibold">{report.title}</td>
                <td className="px-4 py-2 border-b">{report.type}</td>
                <td className="px-4 py-2 border-b">{report.date}</td>
                <td className="px-4 py-2 border-b">{report.description}</td>
                <td className="px-4 py-2 border-b flex gap-2">
                  <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(report)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(report.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md" onSubmit={handleFormSubmit}>
            <h2 className="text-xl font-bold mb-4">{editReport ? 'Edit Report' : 'Add Report'}</h2>
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
              <label className="block font-semibold mb-1">Description</label>
              <textarea name="description" className="input w-full" value={form.description || ''} onChange={handleFormChange} />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary">{editReport ? 'Update' : 'Create'}</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

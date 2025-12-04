"use client";
import { useEffect, useState } from 'react';

type Document = {
  id: string;
  title: string;
  category: string;
  type: string;
  visibility: string;
  description?: string;
};

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editDoc, setEditDoc] = useState<Document | null>(null);
  const [form, setForm] = useState<Partial<Document>>({});

  useEffect(() => {
    // TODO: Replace with real API call
    setTimeout(() => {
      setDocuments([
        { id: '1', title: 'Child Protection Guidelines', category: 'GUIDELINE', type: 'PDF', visibility: 'PUBLIC', description: 'Best practices for child protection.' },
        { id: '2', title: 'Annual Report 2025', category: 'REPORT', type: 'PDF', visibility: 'MEMBERS_ONLY', description: 'Annual impact report.' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleAdd = () => {
    setEditDoc(null);
    setForm({});
    setShowForm(true);
  };
  const handleEdit = (doc: Document) => {
    setEditDoc(doc);
    setForm(doc);
    setShowForm(true);
  };
  const handleDelete = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
  };
  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (editDoc) {
      setDocuments(documents.map(d => d.id === editDoc.id ? { ...d, ...form, id: editDoc.id } as Document : d));
    } else {
      setDocuments([...documents, { ...form, id: Date.now().toString() } as Document]);
    }
    setShowForm(false);
    setEditDoc(null);
    setForm({});
  };
  const handleCancel = () => {
    setShowForm(false);
    setEditDoc(null);
    setForm({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Document Library</h1>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">Manage templates, guidelines, and resources here.</p>
        <button className="btn btn-primary" onClick={handleAdd}>Add Document</button>
      </div>
      {loading ? (
        <div>Loading documents...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Type</th>
              <th className="px-4 py-2 border-b">Visibility</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <tr key={doc.id}>
                <td className="px-4 py-2 border-b font-semibold">{doc.title}</td>
                <td className="px-4 py-2 border-b">{doc.category}</td>
                <td className="px-4 py-2 border-b">{doc.type}</td>
                <td className="px-4 py-2 border-b">{doc.visibility}</td>
                <td className="px-4 py-2 border-b">{doc.description}</td>
                <td className="px-4 py-2 border-b flex gap-2">
                  <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(doc)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(doc.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md" onSubmit={handleFormSubmit}>
            <h2 className="text-xl font-bold mb-4">{editDoc ? 'Edit Document' : 'Add Document'}</h2>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Title</label>
              <input name="title" className="input w-full" required value={form.title || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Category</label>
              <input name="category" className="input w-full" required value={form.category || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Type</label>
              <input name="type" className="input w-full" required value={form.type || ''} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Visibility</label>
              <select name="visibility" className="input w-full" required value={form.visibility || 'MEMBERS_ONLY'} onChange={handleFormChange}>
                <option value="PUBLIC">Public</option>
                <option value="MEMBERS_ONLY">Members Only</option>
                <option value="ADMIN_ONLY">Admin Only</option>
                <option value="RESTRICTED">Restricted</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Description</label>
              <textarea name="description" className="input w-full" value={form.description || ''} onChange={handleFormChange} />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary">{editDoc ? 'Update' : 'Create'}</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Document = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category: string;
  type: string;
  fileUrl: string;
  fileName: string;
  tags: string[];
  visibility: string;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [search, setSearch] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/documents')
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data.documents);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load documents');
        setLoading(false);
      });
  }, []);


  // Filter documents by search
  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase()) ||
    doc.description?.toLowerCase().includes(search.toLowerCase()) ||
    doc.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  // Simulated templates section (replace with real API integration)
  const templates = documents.filter((doc) => doc.category === 'template');

  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Image src="/images/inara-logo.png" alt="INARA Logo" width={64} height={64} className="mr-4" />
        <h1 className="text-3xl font-bold">Document Library</h1>
      </div>
      <p className="mb-6 text-lg">Browse, search, and download important documents and templates.</p>

      <div className="mb-6 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-64"
        />
        <button
          className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
          onClick={() => setShowTemplates((v) => !v)}
        >
          {showTemplates ? 'Show All Documents' : 'Show Templates'}
        </button>
      </div>

      {showTemplates ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500">No templates available.</div>
            ) : (
              templates.map((doc) => (
                <div key={doc.id} className="bg-white rounded-lg shadow p-6 flex flex-col">
                  <h2 className="text-xl font-semibold mb-2">{doc.title}</h2>
                  <p className="mb-2 text-sm text-gray-600">Type: {doc.type.replace(/_/g, ' ')}</p>
                  <p className="mb-2 text-sm text-gray-600">Visibility: {doc.visibility.replace(/_/g, ' ')}</p>
                  <p className="mb-4">{doc.description}</p>
                  <ul className="mb-4 text-sm list-disc pl-5">
                    {doc.tags.map((tag, idx) => (
                      <li key={idx}>{tag}</li>
                    ))}
                  </ul>
                  <a href={doc.fileUrl} download={doc.fileName} className="mt-auto text-blue-600 hover:underline">Download</a>
                </div>
              ))
            )}
          </div>
        </div>
      ) : loading ? (
        <div>Loading documents...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No documents available.</div>
          ) : (
            filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-white rounded-lg shadow p-6 flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{doc.title}</h2>
                <p className="mb-2 text-sm text-gray-600">Category: {doc.category.replace(/_/g, ' ')}</p>
                <p className="mb-2 text-sm text-gray-600">Type: {doc.type.replace(/_/g, ' ')}</p>
                <p className="mb-2 text-sm text-gray-600">Visibility: {doc.visibility.replace(/_/g, ' ')}</p>
                <p className="mb-4">{doc.description}</p>
                <ul className="mb-4 text-sm list-disc pl-5">
                  {doc.tags.map((tag, idx) => (
                    <li key={idx}>{tag}</li>
                  ))}
                </ul>
                <a href={doc.fileUrl} download={doc.fileName} className="mt-auto text-blue-600 hover:underline">Download</a>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}

"use client";

import { useState } from "react";

export default function AdminFileUploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    setUploadStatus("");
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    try {
      const res = await fetch("/api/admin/file-upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setUploadStatus("Upload successful!");
        setSelectedFiles([]);
      } else {
        setUploadStatus("Upload failed.");
      }
    } catch (err) {
      setUploadStatus("Error uploading files.");
    }
    setUploading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin File Upload</h1>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        className="btn btn-primary"
        onClick={handleUpload}
        disabled={uploading || selectedFiles.length === 0}
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </button>
      {uploadStatus && <div className="mt-4 text-lg">{uploadStatus}</div>}
      {selectedFiles.length > 0 && (
        <ul className="mt-4">
          {selectedFiles.map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

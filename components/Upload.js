'use client';

import { useState } from "react";

const Upload = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]); // Array of uploaded file URLs
  const [loading, setLoading] = useState(false);

  const handleFilesChange = async (event) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setLoading(true);
    const uploadedFiles = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Replace with your preset

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dn23oe6gg/raw/upload", // Use raw/upload for all file types
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) {
          console.error(`Upload failed for ${file.name}`);
          continue;
        }

        const data = await res.json();
        uploadedFiles.push(data.secure_url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setFiles((prev) => [...prev, ...uploadedFiles]);
    if (onFileUpload) onFileUpload(uploadedFiles);
    setLoading(false);
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-bold">Upload Files</label>
      <input
        type="file"
        onChange={handleFilesChange}
        className="border p-2 w-full"
        multiple // allow multiple files
      />
      {loading && <p>Uploading...</p>}
      <div className="mt-2 space-y-2">
        {files.map((fileUrl, index) => (
          <div key={index}>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View File {index + 1}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upload;

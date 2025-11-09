"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Upload from "../../components/Upload"; // ✅ Same upload component used in WorkWithUs

export default function Profile() {
  const [user, setUser] = useState(null);
  const [cvUrl, setCvUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // ✅ When CV is uploaded → send name, email, PDF URL to /api/work
  const sendCvToBackend = async (uploadedUrl) => {
    if (!user) return;

    const payload = {
      fullName: user.name,
      email: user.email,
      cvUrl: uploadedUrl,
    };

    try {
      const res = await fetch("/api/work", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      setStatusMessage(result.message || "Uploaded successfully ✅");
    } catch (error) {
      console.error(error);
      setStatusMessage("Something went wrong ❌");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#0b2556] text-white flex flex-col items-center p-6">
      <div className="bg-[#2c9fd5] rounded-xl shadow-xl p-8 w-full max-w-md flex flex-col items-center mt-[11em]">
        <FaUserCircle size={80} className="mb-4" />
        <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
        <p className="text-sm mb-6">{user.email}</p>

        {/* ✅ Upload CV */}
        <Upload
          onFileUpload={(urls) => {
            const uploadedUrl = urls[0];

            setCvUrl(uploadedUrl);
            sendCvToBackend(uploadedUrl); // ✅ Send to backend
          }}
        />

        <button
          onClick={handleLogout}
          className="mt-6 bg-[#0b2556] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#172f68] transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {cvUrl && (
        <div className="mt-6 text-center">
          <p className="text-green-300">✅ CV Uploaded Successfully</p>
          <a href={cvUrl} target="_blank" className="underline">
            View CV
          </a>
        </div>
      )}

      {statusMessage && (
        <p className="mt-4 text-sm font-semibold">{statusMessage}</p>
      )}
    </div>
  );
}

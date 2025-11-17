"use client";
import React, { useEffect, useState } from "react"; // ✅ import React here
import { FaUserCircle, FaSignOutAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Upload from "../../components/Upload";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [cvUrl, setCvUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [applications, setApplications] = useState([]);
  const [note, setNote] = useState("");
  const [expandedRows, setExpandedRows] = useState({}); // track expanded rows

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      fetchUserDocs(parsed.email);
    } else {
      window.location.href = "/login";
    }
  }, []);

  const fetchUserDocs = async (email) => {
    try {
      const res = await fetch("/api/work");
      const data = await res.json();
      const filtered = data.filter((item) => item.data.email === email);
      setApplications(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const sendCvToBackend = async (uploadedUrl) => {
    if (!user) return;

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const currentDate = formatDate(new Date());

    const payload = {
      fullName: user.name,
      email: user.email,
      cvUrl: uploadedUrl,
      date: currentDate,
      note: note || "",
    };

    try {
      const res = await fetch("/api/work", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setStatusMessage(result.message || "Uploaded successfully ✅");
      fetchUserDocs(user.email);
      setNote("");
    } catch (error) {
      console.error(error);
      setStatusMessage("Something went wrong ❌");
    }
  };

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#0b2556] text-white flex flex-col items-center p-6">
      <div className="bg-[#2c9fd5] rounded-xl shadow-xl p-8 w-full max-w-md flex flex-col items-center mt-[11em]">
        <FaUserCircle size={80} className="mb-4" />
        <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
        <p className="text-sm mb-6">{user.email}</p>

        <textarea
          placeholder="Write a note for HR (optional)"
          className="w-full p-3 rounded-md text-black mb-4"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <Upload
          onFileUpload={(urls) => {
            const uploadedUrl = urls[0];
            setCvUrl(uploadedUrl);
            sendCvToBackend(uploadedUrl);
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

      <div className="w-full max-w-4xl mt-10">
        <h2 className="text-xl font-bold mb-4 text-center text-white">Your Applications</h2>

        <div className="overflow-x-auto">
          <table className="w-full bg-white text-black rounded-xl shadow-lg border border-gray-200">
            <thead className="bg-[#0b2556] text-white">
              <tr>
                <th className="p-3 text-left">Document</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-center">Expand</th>
              </tr>
            </thead>

            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-700">
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app, index) => {
                  const isExpanded = expandedRows[app._id];
                  return (
                    <React.Fragment key={app._id}>
                      <tr
                        className={`cursor-pointer transition-all ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-gray-200`}
                        onClick={() => toggleRow(app._id)}
                      >
                        <td className="p-3 break-words whitespace-normal">
                          <a
                            href={app.data.cvUrl}
                            target="_blank"
                            className="text-blue-600 underline break-all"
                          >
                            View Document
                          </a>
                        </td>

                        <td className="p-3 break-words whitespace-normal">
                          {app.data.date}
                        </td>

                        <td className="p-3 text-center">
                          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr className="bg-gray-100 border-t border-gray-300">
                          <td colSpan="3" className="p-4">
                            <p className="mb-2 max-w-[80ch] break-words whitespace-pre-line">
                              <strong>Note:</strong> {app.data.note || "-"}
                            </p>

                            <p className="max-w-[80ch] break-words whitespace-pre-line">
                              <strong>Feedback:</strong> {app.data.feedback || "Pending"}
                            </p>
                          </td>
                        </tr>

                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

const escapeHtml = (value = "") =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatAboutDescription = (description = "") => {
  if (/<\/?[a-z][\s\S]*>/i.test(description)) {
    return description;
  }

  const renderLines = (lines) => {
    const parts = [];
    let paragraphLines = [];
    let bulletLines = [];

    const flushParagraph = () => {
      if (!paragraphLines.length) return;
      parts.push(`<p>${paragraphLines.map(escapeHtml).join("<br />")}</p>`);
      paragraphLines = [];
    };

    const flushBullets = () => {
      if (!bulletLines.length) return;
      parts.push(`<ul>${bulletLines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`);
      bulletLines = [];
    };

    lines.forEach((line) => {
      const bulletMatch = line.match(/^[•*-]\s*(.+)$/);

      if (bulletMatch) {
        flushParagraph();
        bulletLines.push(bulletMatch[1]);
        return;
      }

      flushBullets();
      paragraphLines.push(line);
    });

    flushParagraph();
    flushBullets();

    return parts.join("");
  };

  return description
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      return renderLines(lines);
    })
    .join("");
};

export default function Home() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/about');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || 'Failed to fetch about data');
        }

        setAboutData(Array.isArray(data) ? data[0] : data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section style={{ textAlign: "center", padding: "100px 20px" }}>
        <p>Loading...</p>
      </section>
    );
  }

  if (!aboutData) {
    return (
      <section style={{ textAlign: "center", padding: "100px 20px" }}>
        <p>No data found.</p>
      </section>
    );
  }

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "1000px",
        margin: "6em auto 4em",
        padding: "40px 20px",
        gap: "40px",
      }}
    >
      {/* Image Section */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "720px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {aboutData.img?.[0] && (
          <img
            src={aboutData.img[0]}
            alt={aboutData.title || "About"}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "14px",
              objectFit: "cover",
              boxShadow: "0 10px 30px rgba(11, 37, 86, 0.15)",
            }}
          />
        )}
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "900px",
          textAlign: "left",
          opacity: 1,
          visibility: "visible",
        }}
      >
        <h1
          className="mb-6 mttit1232"
          style={{
            color: "#0b2556",
            display: "block",
            opacity: 1,
            visibility: "visible",
            marginBottom: "1rem",
            textAlign: "left",
          }}
        >
          {aboutData.title}
        </h1>

        <div
          className="forensix-about-description"
          style={{
            color: "#555",
            display: "block",
            opacity: 1,
            visibility: "visible",
            fontSize: "16px",
            lineHeight: 1.75,
            textAlign: "left",
          }}
          dangerouslySetInnerHTML={{
            __html: formatAboutDescription(aboutData.description || ""),
          }}
        />
      </motion.div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';

export default function Home() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/about');
        const data = await res.json();
        setAboutData(data[0]);
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
        padding: "40px 20px",
        marginTop: "6em",
      }}
    >
      {/* Text Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
        style={{
          textAlign: "center",
          maxWidth: "900px",
        }}
      >
        <h1 className="mb-6 mttit1232">{aboutData.title}</h1>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#555",
            marginBottom: "20px",
          }}
        >
          {aboutData.description}
        </p>

        <Link href="/about">
          <button
            className="text-xl md:text-2xl bg-transparent text-black mybbborder border-black px-7 py-3 uppercase transition-colors duration-200"
          >
            View More
          </button>
        </Link>
      </motion.div>
    </section>
  );
}

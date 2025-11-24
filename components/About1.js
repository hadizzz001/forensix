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
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      padding: "40px 20px",
      marginTop: "6em",
      gap: "40px",
      flexWrap: "wrap",
    }}
  >

    {/* Image Section */}
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
      style={{
        flex: "1",
        minWidth: "280px",
        maxWidth: "450px",
      }}
    >
      <img
        src={aboutData.img?.[0]}
        alt={aboutData.title}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "12px",
          objectFit: "cover",
        }}
      />
    </motion.div>

    {/* Text Section */}
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
      style={{
        flex: "1",
        minWidth: "300px",
        maxWidth: "600px",
        textAlign: "left",
      }}
    >
      <h1 className="mb-6 mttit1232">{aboutData.title}</h1>

      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.6",
          color: "#555",
          marginBottom: "20px",
          display: "-webkit-box",
          overflow: "hidden", 
        }}
      >
        {aboutData.description}
      </p>
    </motion.div>

  </section>
);

}

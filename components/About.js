'use client';

import { motion } from "framer-motion";
import Link from 'next/link';

export default function Home() {
  return (
    <>
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
          <h1 className="mb-6 mttit1232"  >
            Leveraging AI in Financial Crime Investigations
          </h1>
          <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#555", marginBottom: "20px" }}>
            Discover how artificial intelligence is transforming the detection and prevention of financial crimes. From analyzing massive datasets to identifying suspicious patterns, AI empowers investigators to act faster, reduce fraud, and enhance compliance.
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
    </>
  );
}

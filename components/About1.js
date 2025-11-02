"use client";

import { motion } from "framer-motion";
import { myFont } from '../app/fonts'
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section
        data-image-width={1980}
        data-image-height={1214}
        style={{
          display: "flex",
          width: "100%",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          padding: "40px 20px",
          marginTop: "6em",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: "1200px",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap", // important for wrapping
          }}
        >
          {/* Left Side - Text */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
            style={{
              width: "50%",
              paddingRight: "20px",
            }}
            className="content-text"
          >
            <h1 className={`${myFont.className} myparhal2 mb-10`}>Our Story</h1>
            <p className="myGray mb-10" style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify" }}>
              Founded by Maria & Andrew, Forensix was born from a shared passion for transforming ordinary moments into unforgettable celebrations. From birthdays and engagements to weddings, baptisms, corporate events, and romantic dinners — every setup is crafted with emotion, elegance, and meaning. We don’t just decorate; we tell your story through colors, lights, and thoughtful details. Our mission is simple: to turn every occasion into a memory that lives forever.

            </p>

 
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.4 }}
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="content-image"
          >
            <img
              src="https://res.cloudinary.com/duln5xyix/image/upload/v1760966754/04_07_21_editotorial_119_4x_hkqofr.webp"
              alt="Company"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .content-text, .content-image {
            width: 100% !important;
            padding-right: 0 !important;
          }
          .content-text {
            order: 2; /* text goes under image */
            margin-top: 20px;
          }
          .content-image {
            order: 1; /* image stays first */
          }
        }
      `}</style>
    </>
  );
}
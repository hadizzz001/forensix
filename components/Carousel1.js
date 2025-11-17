'use client';

import { useState, useEffect } from 'react';

export default function HeroImage() {
  const [img, setImg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/look');
        const data = await res.json();

        if (data && data.length > 0 && data[0].img) {
          setImg(data[0].img[0]); // take the first image from data[0].img array
        }
      } catch (error) {
        console.error('Failed to fetch hero image:', error);
      }
    };

    fetchData();
  }, []);

  // Optional: fallback if image is not loaded yet
  if (!img) {
    return (
      <div className="relative w-full h-[300px] bg-gray-300 animate-pulse" />
    );
  }

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      {/* Image */}
      <img
        src={img}
        alt="Hero Background"
        className="w-full h-full object-cover object-bottom"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="mttit123 mb-2 uppercase">
          Looking for finance crimes?
        </h1>
        <p className="mttit1231 mb-3">
          Detect fraud, anomalies, and suspicious activity using AI-powered investigation tools.
        </p>

        <button
          className="text-lg md:text-xl bg-transparent text-white px-7 py-3 border border-white uppercase transition-colors duration-200 hover:bg-white hover:text-black"
          onClick={() => { window.location.href = `/contact`; }}
        >
          Book a Call
        </button>
      </div>
    </div>
  );
}

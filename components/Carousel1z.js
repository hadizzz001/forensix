'use client';

import { useState, useEffect } from 'react';

export default function HeroImage() {
  const [img, setImg] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/look1');
        const data = await res.json();

        if (data && data.length > 0) {
          const item = data[0];

          if (item.img?.length > 0) setImg(item.img[0]);
          if (item.title) setTitle(item.title);
          if (item.description) setDesc(item.description);
        }
      } catch (error) {
        console.error('Failed to fetch hero info:', error);
      }
    };

    fetchData();
  }, []);

  // Loading state
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
          {title  }
        </h1>
        <p className="mttit1231 mb-3">
          {desc  }
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

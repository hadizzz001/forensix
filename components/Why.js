'use client';
import { useEffect, useState } from 'react';

export default function WhyChooseUs() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/why');
        const json = await res.json();
        setData(json[0]); // use the first item
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) return null; // or a loader

  return (
    <div className="flex flex-col items-center my-20 gap-7 md:gap-7 bg-[#e8eff3] py-16">
      <div className="max-w-[900px] text-center">
        <h1 className="mb-6 mttit1232">{data.title}</h1>
        <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#555", marginBottom: "20px" }}>
          {data.description}
        </p>
      </div>

      <div className="flex flex-wrap md:flex-nowrap justify-center gap-7 md:gap-7">
        {data.data.map((item, index) => (
          <div
            key={index}
            className="w-1/2 md:w-[200px] flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center bg-white rounded-full w-28 h-28 md:w-28 md:h-28 mb-6 shadow-md">
              <img
                src={item.img[0]}
                alt={item.title}
                className="w-12 h-12 md:w-16 md:h-16"
              />
            </div>
            <p className="text-lg md:text-2xl font-medium">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

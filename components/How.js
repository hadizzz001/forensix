'use client';
import { useState, useEffect } from 'react';

export default function HowItWorks() {
  const [steps, setSteps] = useState([]);
  const [section, setSection] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await fetch('/api/hwork');
        const data = await res.json();
        if (data.length > 0) {
          setSection({
            title: data[0].title,
            description: data[0].description,
          });
          setSteps(data[0].data);
        }
      } catch (err) {
        console.error('Failed to fetch steps:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center my-20 gap-10 py-16">
      <div className="max-w-[900px] text-center">
        <h1 className="mb-6 mttit1232">{section.title}</h1>
        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#555',
            marginBottom: '20px',
          }}
        >
          {section.description}
        </p>
      </div>

      <div className="flex flex-wrap md:flex-nowrap justify-center gap-7">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white w-[280px] md:w-[300px] p-8 flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center rounded-full w-24 h-24 mb-6 bg-[#e8eff3] shadow-md relative">
              <img
                src={step.img[0]}
                alt={step.title}
                className="w-12 h-12 md:w-16 md:h-16"
              />
              <span className="absolute -top-3 -right-3 bg-[#2c9fd5] text-white rounded-full text-sm font-semibold py-1 px-2 shadow-lg">
                {`0${index + 1}`}
              </span>
            </div>
            <h3 className="mttit12322 mb-3">{step.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

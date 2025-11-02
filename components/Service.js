'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'AI Fraud Detection',
    desc: 'Detect hidden patterns and automatically flag suspicious activity.',
  },
  {
    title: 'Transaction Monitoring',
    desc: 'Monitor multiple data sources in real-time using intelligent automation.',
  },
  {
    title: 'Digital Document Forensics',
    desc: 'Analyze PDFs, contracts, and documents with metadata extraction.',
  },
  {
    title: 'Identity Risk Analysis',
    desc: 'Verify identities and score risk levels with AI models.',
  },
  {
    title: 'Investigation Reports',
    desc: 'Generate audit-ready reports with visual evidence and insights.',
  },
  {
    title: 'Compliance & AML Screening',
    desc: 'Cross-check profiles against sanctions and watchlists.',
  },
];

export default function OurServices() {
  return (
    <section className="flex flex-col items-center my-20 gap-10 py-16">
      <div className="max-w-[900px] text-center">
        <h1 className="mb-6 mttit1232">Our Services</h1>
        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#555',
            marginBottom: '20px',
          }}
        >
          We empower financial crime investigators with advanced AI tools to detect,
          analyze, and prevent fraudulent activities.
        </p>
      </div>

      {/* 2 per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex w-[550px] md:w-[620px] bg-[#e8eff3] h-[250px]  "
          >
            {/* Left line */}
         <div className="w-[4px] bg-[#0b2556] shrink-0"></div>


            {/* Content */}
            <div className="p-8 flex flex-col justify-between text-left">
              <h3 className="mttit12322 mb-3  ">{service.title}</h3>
              <p className="mttit123223 mb-6">{service.desc}</p>

              <button className="flex items-center gap-2 text-[#2c9fd5] hover:opacity-70 transition">
                Learn more
                <ArrowRight className="w-4 h-4 text-[#2c9fd5]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

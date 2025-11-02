'use client';
import { Cpu, Search, FileCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Upload / Connect Data',
    desc: 'Securely upload financial documents, bank statements, or transaction data.',
    icon: <Cpu className="w-12 h-12 md:w-16 md:h-16 text-[#2c9fd5]" />,
  },
  {
    number: '02',
    title: 'AI Investigation',
    desc: 'Our system analyzes patterns, detects anomalies, and flags suspicious activities.',
    icon: <Search className="w-12 h-12 md:w-16 md:h-16 text-[#2c9fd5]" />,
  },
  {
    number: '03',
    title: 'Receive Final Report',
    desc: 'Download a full report with insights, evidence, and recommended actions.',
    icon: <FileCheck className="w-12 h-12 md:w-16 md:h-16 text-[#2c9fd5]" />,
  },
];

export default function HowItWorks() {
  return (
    <div className="flex flex-col items-center my-20 gap-10  py-16">
      <div className="max-w-[900px] text-center">
        <h1 className="mb-6 mttit1232">How it works</h1>
        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#555',
            marginBottom: '20px',
          }}
        >
          Our AI-powered platform makes financial crime investigation faster, smarter, and more accurate—from data upload to actionable reports.
        </p>
      </div>

      <div className="flex flex-wrap md:flex-nowrap justify-center gap-7">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white w-[280px] md:w-[300px] p-8  flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center rounded-full w-24 h-24 mb-6 bg-[#e8eff3] shadow-md relative">
              {step.icon}

              <span className="absolute -top-3 -right-3 bg-[#2c9fd5] text-white rounded-full text-sm font-semibold py-1 px-2 shadow-lg">
                {step.number}
              </span>
            </div>

            <h3 className="mttit12322 mb-3">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

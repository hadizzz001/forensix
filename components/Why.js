'use client';
import { Cpu, Activity, FileText, Lock, Users } from 'lucide-react';

const features = [
  {
    title: 'Advanced AI Detection',
    icon: <Cpu className="w-12 h-12 md:w-16 md:h-16 text-[#2c9fd5]" />,
  },
  {
    title: 'Real-time Fraud Analysis',
    icon: <Activity className="w-12 h-12 md:w-16 md:h-16 text-[#2c9fd5]" />,
  },
  {
    title: 'Comprehensive Reporting',
    icon: <FileText className="w-12 h-12 md:w-16 md:h-16 text-[#2c9fd5]" />,
  },
  {
    title: 'Secure & Confidential',
    icon: <Lock className="w-12 h-12 md:w-16 md:h-16 text-[#2c9fd5]" />,
  },
  {
    title: 'Expert Team Support',
    icon: <Users className="w-12 h-12 md:w-16 md:h-16 text-[#2c9fd5]" />,
  },
];

export default function WhyChooseUs() {
  return (
    <div className="flex flex-col items-center my-20 gap-7 md:gap-7 bg-[#e8eff3] py-16"> 
      <div className="max-w-[900px] text-center">
        <h1 className="mb-6 mttit1232">
          Why choose us?
        </h1>
        <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#555", marginBottom: "20px" }}>
          Discover how artificial intelligence is transforming the detection and prevention of financial crimes. From analyzing massive datasets to identifying suspicious patterns, AI empowers investigators to act faster, reduce fraud, and enhance compliance.
        </p>
      </div>

      <div className="flex flex-wrap md:flex-nowrap justify-center gap-7 md:gap-7">
        {features.map((item, index) => (
          <div
            key={index}
            className="w-1/2 md:w-[200px] flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center bg-white rounded-full w-28 h-28 md:w-28 md:h-28 mb-6 shadow-md">
              {item.icon}
            </div>

            <p className="text-lg md:text-2xl font-medium">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

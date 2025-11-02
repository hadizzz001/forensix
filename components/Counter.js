'use client';

import { useEffect, useState, useRef } from 'react';

const counterData = [
  {
    title: 'Weddings & Bridal Events',
    img: 'https://res.cloudinary.com/duln5xyix/image/upload/v1760552480/wedding_el75rf.webp',
    count: 150,
  },
  {
    title: 'Birthdays & Family Events',
    img: 'https://res.cloudinary.com/duln5xyix/image/upload/v1760552480/red-carpet_fif6od.webp',
    count: 120,
  },
  {
    title: 'Themed Events',
    img: 'https://res.cloudinary.com/duln5xyix/image/upload/v1760552480/confetti_mpjrgy.webp',
    count: 110,
  },
  {
    title: 'Cakes',
    img: 'https://res.cloudinary.com/duln5xyix/image/upload/v1760552480/cake_vnkjzk.webp',
    count: 150,
  },
];

export default function EventCounter() {
  const [counts, setCounts] = useState(counterData.map(() => 0));
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasStarted) {
          startCounting();
          setHasStarted(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  const startCounting = () => {
    const duration = 1000; // 2 seconds
    const frameRate = 30;
    const totalFrames = Math.round((duration / 1000) * frameRate);

    counterData.forEach((item, index) => {
      let frame = 0;
      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const value = Math.floor(item.count * progress);
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = value;
          return newCounts;
        });

        if (frame >= totalFrames) clearInterval(interval);
      }, duration / totalFrames);
    });
  };

  return (
<div
  ref={sectionRef}
  className="flex flex-wrap md:flex-nowrap justify-center my-20 gap-7 md:gap-7"
>
  {counterData.map((item, index) => (
    <div
      key={index}
      className="w-1/2 md:w-[200px] flex flex-col items-center text-center"
    >
      <div className="flex items-center justify-center bg-[#f6e8ff] rounded-full w-48 h-48 md:w-48 md:h-48 mb-6">
        <img src={item.img} alt={item.title} className="w-20 h-20 md:w-32 md:h-32 object-contain" />
      </div>

      <h3 className="text-4xl md:text-6xl font-bold leading-none">{counts[index]}+</h3>

      <p className="text-lg md:text-2xl font-medium   flex items-center justify-center">
        {item.title}
      </p>
    </div>
  ))}
</div>




  );
}

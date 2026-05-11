'use client';

import { useEffect, useState } from 'react';

const fallbackImg =
  'https://res.cloudinary.com/dn23oe6gg/image/upload/v1762098937/6729c105bce0b1362a7da126_fintech-bg-p-1600_y2a2lq.webp';

export default function HeroImage({ apiEndpoint }) {
  const [img, setImg] = useState(fallbackImg);

  useEffect(() => {
    if (!apiEndpoint) return;

    const fetchBanner = async () => {
      try {
        const res = await fetch(apiEndpoint);
        const data = await res.json();
        const banner = Array.isArray(data) ? data[0] : data;
        const bannerImg = Array.isArray(banner?.img) ? banner.img[0] : banner?.img;

        if (bannerImg) {
          setImg(bannerImg);
        }
      } catch (error) {
        console.error('Error fetching hero banner:', error);
      }
    };

    fetchBanner();
  }, [apiEndpoint]);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px]">
      {/* Image */}
      <img
        src={img}
        alt="Hero"
        className="w-full h-full object-cover"
      />

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

     
    </div>
  );
}
